// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createClient } = require("@supabase/supabase-js");
const NEXT_PUBLIC_SUPABASE_URL = "https://pdamjftrwejhaneejnqo.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkYW1qZnRyd2VqaGFuZWVqbnFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzM5MTQyMywiZXhwIjoyMDQ4OTY3NDIzfQ.nBKBIyrykbCX2KbG0dzrtrL-ZJy-3kkc1-VWDvPkIJM";

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

async function generateUniqueSlug(text, existingSlugs) {
  if (!text) throw new Error("Text is required to generate slug");

  let baseSlug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let slug = baseSlug;
  let counter = 0;

  // Keep incrementing counter until we find a unique slug
  while (existingSlugs.has(slug)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  existingSlugs.add(slug); // Add new slug to our set
  return slug;
}

async function updateMissingSlugs() {
  try {
    // First, get all existing slugs to maintain uniqueness
    const { data: existingData, error: existingError } = await supabase
      .from("agencies")
      .select("slug")
      .not("slug", "is", null);

    console.log(`Found ${existingData?.length} existing slugs`, existingData);

    if (existingError) throw existingError;

    // Create a Set of existing slugs for efficient lookup
    const existingSlugs = new Set(existingData?.map((row) => row.slug));

    // Get all records with missing slugs
    const { data: agenciesWithoutSlugs, error: fetchError } = await supabase
      .from("agencies")
      .select("id, title")
      .is("slug", null);

    if (fetchError) throw fetchError;

    if (!agenciesWithoutSlugs || agenciesWithoutSlugs.length === 0) {
      console.log("No agencies found without slugs");
      return;
    }

    console.log(`Found ${agenciesWithoutSlugs.length} agencies without slugs`);

    // Process in batches to avoid overwhelming the database
    const batchSize = 50;
    const batches = Math.ceil(agenciesWithoutSlugs.length / batchSize);

    for (let i = 0; i < batches; i++) {
      const start = i * batchSize;
      const end = start + batchSize;
      const batch = agenciesWithoutSlugs.slice(start, end);

      // Generate slugs for the batch
      const updates = await Promise.all(
        batch.map(async (agency) => {
          const slug = await generateUniqueSlug(agency.title, existingSlugs);
          console.log(`Generated slug '${slug}' for agency '${agency.title}'`);
          return {
            id: agency.id,
            slug: slug,
          };
        })
      );

      // Update the batch in the database
      const updatePromises = updates.map((update) =>
        supabase
          .from("agencies")
          .update({ slug: update.slug })
          .eq("id", update.id)
      );

      const updateResult = await Promise.all(updatePromises);

      console.log({ updateResult });

      console.log(
        `Updated batch ${i + 1} of ${batches} (${updates.length} records)`
      );
    }

    console.log("Finished updating slugs");
  } catch (error) {
    console.error("Error in updateMissingSlugs:", error);
    throw error;
  }
}

// Function to run the script
async function main() {
  console.log("Starting slug update process...");

  try {
    await updateMissingSlugs();
    console.log("Successfully completed slug updates");
  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  }
}

// Run the script
main();
