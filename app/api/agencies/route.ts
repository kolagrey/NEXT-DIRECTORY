import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { Agency, TeamMember, PortfolioItem } from "@/lib/types";
import { agencyFormSchema } from "@/lib/schemas";
import { ZodError } from "zod";
import { generateUniqueSlug } from "@/lib/utils";
import { sendWelcomeEmail } from "@/services/email.service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: Record<string, any> = {};

    // Extract and parse form data
    for (const [key, value] of formData.entries()) {
      try {
        // Try to parse JSON strings for arrays and objects
        if (
          typeof value === "string" &&
          (value.startsWith("[") || value.startsWith("{"))
        ) {
          data[key] = JSON.parse(value);
        } else {
          data[key] = value;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // If parsing fails, use the raw value
        data[key] = value;
      }
    }

    // Validate the parsed data
    try {
      const validatedData = agencyFormSchema.parse({
        title: data.title,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        email: data.email,
        telephone: data.telephone,
        location: data.location,
        twitter: data.twitter,
        linkedin: data.linkedin,
        founded: data.founded,
        projects_completed: data.projects_completed,
        website: data.website,
        pitch_video_url: data.pitch_video_url,
        logo: data.logo,
        team: data.team,
        team_size: data.team_size,
        starting_budget: data.starting_budget,
        portfolio: data.portfolio,
        categories: data.categories,
        skills: data.skills,
      });

      data = validatedData;
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            error: "Validation failed",
            details: error.errors.map((e) => ({
              path: e.path.join("."),
              message: e.message,
            })),
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Handle logo upload if present
    let logoUrl = null;
    if (data.logo && data.logo instanceof File) {
      const fileExt = data.logo.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("logos")
        .upload(fileName, data.logo);

      if (uploadError) throw uploadError;

      const { data: media } = supabase.storage
        .from("logos")
        .getPublicUrl(uploadData.path);

      logoUrl = media.publicUrl;
    }

    // Ensure arrays are properly initialized
    const categories = Array.isArray(data.categories) ? data.categories : [];
    const skills = Array.isArray(data.skills) ? data.skills : [];
    const team = Array.isArray(data.team) ? data.team : [];
    const portfolio = Array.isArray(data.portfolio) ? data.portfolio : [];
    const slug = await generateUniqueSlug(data.title, {
      maxLength: 100,
      table: "agencies",
      field: "slug",
    });

    // Start a Supabase transaction
    const { data: agency, error: agencyError } = await supabase
      .from("agencies")
      .insert({
        slug,
        skills,
        categories,
        title: data.title,
        short_description: data.shortDescription,
        full_description: data.fullDescription,
        email: data.email,
        location: data.location,
        twitter: data.twitter,
        linkedin: data.linkedin,
        projects_completed: data.projects_completed,
        founded: data.founded,
        telephone: data.telephone,
        website: data.website,
        logo_url: logoUrl,
        pitch_video_url: data.pitch_video_url,
        team_size: data.team_size,
        starting_budget: data.starting_budget,
        status: "pending",
      } as Partial<Agency>)
      .select()
      .single();

    if (agencyError) {
      console.error("Error creating agency:", agencyError);
      return NextResponse.json({ error: agencyError }, { status: 500 });
    }

    // create checkout refrence
    const reference: string = uuidv4();
    await supabase.from("checkout_references").insert({
      reference,
      agency: agency.id,
    });

    // Insert team members
    if (team.length > 0) {
      const { error: teamError } = await supabase.from("team_members").insert(
        team.map((member: Partial<TeamMember>) => ({
          agency_id: agency.id,
          fullname: member.fullname,
          job_role: member.job_role,
          twitter: member.twitter,
        }))
      );

      if (teamError) {
        console.error("Error creating team members:", teamError);
        return NextResponse.json({ error: teamError }, { status: 500 });
      }
    }

    // Insert portfolio items
    if (portfolio.length > 0) {
      const { error: portfolioError } = await supabase
        .from("portfolio_items")
        .insert(
          portfolio.map((item: Partial<PortfolioItem>) => ({
            agency_id: agency.id,
            title: item.title,
            url: item.url,
          }))
        );

      if (portfolioError) {
        console.error("Error creating portfolio items:", portfolioError);
        return NextResponse.json({ error: portfolioError }, { status: 500 });
      }
    }

    await sendWelcomeEmail({
      agencyName: agency.title,
      previewLink: `${process.env.NEXT_PUBLIC_API_URL}/create/checkout/preview/${reference}`,
      email: agency.email,
    });

    return NextResponse.json({
      agency,
      reference,
      message: "Agency created successfully",
      team: team.length,
      portfolio: portfolio.length,
    });
  } catch (error) {
    console.error("Error creating agency:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create agency",
      },
      { status: 500 }
    );
  }
}
