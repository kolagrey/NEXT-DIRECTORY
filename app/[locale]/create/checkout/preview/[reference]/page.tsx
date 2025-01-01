import AgencyView from "@/components/agency-view";
import { getAgencyById, getCheckoutReference } from "@/services/agency.service";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Agency } from "@/lib/types";
import config from "@/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reference: string }>;
}): Promise<Metadata> {
  const reference = decodeURIComponent((await params).reference);
  const checkoutReference = await getCheckoutReference(reference);
  if (!checkoutReference) {
    return {
      title: `Preview | ${config.appName}`,
      description: "Find Agencies and Teams in the Ai Space",
      openGraph: {
        title: config.appName,
        description: "Find Agencies and Teams in the Ai Space",
        images: [
          {
            url: config.appLogo || "",
            width: 800,
            height: 600,
            alt: config.appName,
          },
        ],
        siteName: config.domainName,
      },
    };
  }
  const agency = (await getAgencyById(checkoutReference.agency)) as Agency;
  const description = agency.short_description || agency.full_description;

  return {
    title: `Preview | ${agency.title}`,
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
      siteName: config.domainName,
    },
  };
}

export default async function AgencyPreviewPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  if (!reference) {
    console.error("No reference found!");
    notFound();
  }

  const checkoutReference = await getCheckoutReference(reference);
  if (!checkoutReference) {
    console.error("No checkout reference found!");
    notFound();
  }

  const agency = await getAgencyById(checkoutReference.agency);

  if (!agency) {
    console.error("Agency not found for reference:", reference);
    notFound();
  }

  return (
    <main className="flex-1 pb-12">
      <AgencyView agency={agency} />
    </main>
  );
}
