import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PATCH(request: NextRequest) {
  try {
    const { session_id, status, reference } = await request.json();

    const { data: checkoutReference, error } = await supabase
      .from("checkout_references")
      .update({ session_id, status, ended: new Date().toISOString() })
      .match({ reference });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to store checkout reference" },
        { status: 500 }
      );
    }

    return NextResponse.json({ checkoutReference });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to store checkout reference" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reference = searchParams.get("reference") || "";

    const { data: checkoutReference, error } = await supabase
      .from("checkout_references")
      .select("*")
      .eq("reference", reference)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch checkout reference" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!checkoutReference) {
      return NextResponse.json(
        { error: "Checkout Reference not found!" },
        { status: 400 }
      );
    }

    return NextResponse.json({ checkoutReference });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to fetch checkout reference" },
      { status: 500 }
    );
  }
}
