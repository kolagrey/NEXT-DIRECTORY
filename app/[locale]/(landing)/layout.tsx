import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAATLIST Agencies Directory",
  description: "Find agencies to build your MVP or SaaS projects",
};

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>{children}</div>
  );
}
