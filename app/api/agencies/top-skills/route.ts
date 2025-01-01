import { NextResponse } from "next/server";
//import { supabase } from "@/lib/supabase";
import { categories } from "@/lib/categories";

export async function GET() {
  try {
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching top skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch top skills" },
      { status: 500 }
    );
  }
}
