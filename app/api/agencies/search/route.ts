import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const PAGE_SIZE = 40;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let dbQuery = supabase
      .from("agencies")
      .select("*", { count: "exact" })
      .eq("status", "approved")
      .range(from, to);

    if (query) {
      dbQuery = dbQuery.or(
        `title.ilike.%${query}%,short_description.ilike.%${query}%`
      );
    }

    if (category) {
      dbQuery = dbQuery.contains("categories", [category]);
    }

    const { data, error, count } = await dbQuery;

    if (error) {
      console.error("Error fetching agencies:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      agencies: data || [],
      totalCount: count || 0,
      hasMore: count ? from + PAGE_SIZE < count : false,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch agencies" },
      { status: 500 }
    );
  }
}
