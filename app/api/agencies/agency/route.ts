import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug") || "";

    const { data: agency, error } = await supabase
      .from("agencies")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch agency" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!agency) {
      return NextResponse.json({ error: "Agency not found!" }, { status: 400 });
    }

    // Transform the data to match our Agency type
    const transformedAgency = {
      ...agency,
      team: await getRelatedDocuments("team_members", agency.id),
      portfolio: await getRelatedDocuments("portfolio_items", agency.id),
    };

    return NextResponse.json({ agency: transformedAgency });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to fetch agency" },
      { status: 500 }
    );
  }
}

const getRelatedDocuments = async (collection: string, id: string) => {
  const { data, error } = await supabase
    .from(collection)
    .select("*")
    .eq("agency_id", id);

  if (error) return [];
  return data;
};
