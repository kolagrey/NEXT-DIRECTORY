import AgencyForm from "@/components/agency-form";
import { getSEOTags } from "@/lib/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `List your Agency | ${config.appName}`,
  canonicalUrlRelative: "/create",
});

const CreatePage = () => {

  return (
    <main className="flex-1 container max-w-7xl py-12 mx-auto">
      <AgencyForm/> 
    </main>
  );
};

export default CreatePage;
