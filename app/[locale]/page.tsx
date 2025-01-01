import { Hero } from "@/components/hero";
import Listing from "@/components/listing";

export default function Home() {
  return (
    <main className="flex-1 mx-auto max-w-7xl">
      <Hero />
      <Listing />
    </main>
  );
}
