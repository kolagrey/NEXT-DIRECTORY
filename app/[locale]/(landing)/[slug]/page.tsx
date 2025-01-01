import { notFound } from "next/navigation";
import AgencyView from "@/components/agency-view";
import { getAgency } from "@/services/agency.service";
import { Metadata } from "next";
import { Agency } from "@/lib/types";
import config from "@/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = decodeURIComponent((await params).slug);
  const agency = (await getAgency(slug)) as Agency;
  const description = agency.short_description || agency.full_description;

  return {
    title: `${agency.title} | ${config.appName}`,
    description,
    openGraph: {
      title: agency.title,
      description,
      images: [
        {
          url: agency.logo_url || "",
          width: 800,
          height: 600,
          alt: agency.title,
        },
      ],
      siteName: config.appName,
    },
  };
}

export default async function AgencyPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  if (!slug) {
    console.error("No slug provided in params:", params);
    notFound();
  }

  const agency = await getAgency(slug);

  if (!agency) {
    console.error("Agency not found for slug:", slug);
    notFound();
  }

  return (
    <main className="flex-1 pb-12">
      <AgencyView agency={agency} />
    </main>
  );
}
