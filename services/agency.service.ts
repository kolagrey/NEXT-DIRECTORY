"use server";

import { supabase } from "@/lib/supabase";

const getRelatedDocuments = async (collection: string, id: string) => {
  const { data, error } = await supabase
    .from(collection)
    .select("*")
    .eq("agency_id", id);

  if (error) return [];
  return data;
};

export const getAgency = async (slug: string) => {
  const { data, error } = await supabase
    .from("agencies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;

  // Transform the data to match our Agency type
  const agency = {
    ...data,
    team: await getRelatedDocuments("team_members", data.id),
    portfolio: await getRelatedDocuments("portfolio_items", data.id),
  };

  return agency;
};

export const getAgencyById = async (agencyId: string) => {
  const { data, error } = await supabase
    .from("agencies")
    .select("*")
    .eq("id", agencyId)
    .single();

  if (error) return null;

  // Transform the data to match our Agency type
  const agency = {
    ...data,
    team: await getRelatedDocuments("team_members", data.id),
    portfolio: await getRelatedDocuments("portfolio_items", data.id),
  };

  return agency;
};

export const getCheckoutReference = async (reference: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/checkout/reference?reference=${reference}`
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch checkout reference:",
        res.status,
        res.statusText
      );
      return null;
    }

    const result = await res.json();
    return result.checkoutReference;
  } catch (error) {
    console.error("Error fetching checkout reference:", error);
    return null;
  }
};
