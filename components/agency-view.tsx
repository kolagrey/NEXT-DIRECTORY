"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Globe,
 // Mail,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  ArrowUpRight,
  CheckCircle2,
  ArrowLeftIcon,
  BanknoteIcon,
} from "lucide-react";
import { Agency, PortfolioItem } from "@/types";
import Link from "next/link";
import { getVideoEmbedUrl } from "@/lib/utils";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export default function AgencyView({ agency }: { agency: Agency }) {
  const videoURL = useMemo(() => {
    return getVideoEmbedUrl(agency.pitch_video_url || "").embedUrl;
  }, [agency.pitch_video_url]);

  const c = useTranslations("common");
  const t = useTranslations("landing");

  return (
    <>
      <Link href="/#listings">
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeftIcon className="h-4 w-4 dark:text-white light:text-black" />
          <span>{c("backToListing")}</span>
        </div>
      </Link>
      {/* Hero Section */}
      <div className="relative mx-auto max-w-7xl">
        <div className="container mx-auto py-12 md:py-20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Agency Info */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                  {agency.logo_url ? (
                    <Image
                      src={agency.logo_url}
                      alt={agency.title}
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-r from-pink-700 to-purple-700 flex items-center justify-center text-2xl font-bold text-white">
                      {agency.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {agency.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="secondary"
                      className="text-pink-500 flex gap-2 items-center bg-black "
                    >
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      <span>{t("verifiedAgency")}</span>
                    </Badge>
                    {agency.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {agency.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Video Section */}
              {videoURL && (
                <section className="container max-w-7xl mx-auto py-4">
                  <div className="w-full aspect-video">
                    <iframe
                      src={videoURL}
                      title={agency.title}
                      className="w-full h-full rounded-lg shadow-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </section>
              )}

              <p className="text-lg text-muted-foreground leading-relaxed">
                {agency.full_description}
              </p>

              <div className="flex flex-wrap gap-3">
                {agency.skills?.map((skills: string) => (
                  <Badge key={skills} variant="outline" className="px-3 py-1">
                    {skills}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {/* <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700 gap-2"
                  onClick={() =>
                    (window.location.href = `mailto:${agency.email}`)
                  }
                >
                  <Mail className="h-4 w-4" />
                  {c("contactAgency")}
                </Button> */}
                {agency.website && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700 gap-2"
                    onClick={() => window.open(agency.website, "_blank")}
                  >
                    <Globe className="h-4 w-4" />
                    {c("visitWebsite")}
                  </Button>
                )}
                {agency.linkedin && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 hover:bg-black hover:text-white bg-white text-black"
                    onClick={() =>
                      window.open(agency.linkedin as string, "_blank")
                    }
                  >
                    <svg
                      className="h-4 w-4 bg-white text-black"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>LinkedIn</title>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    {c("visitLinkedIn")}
                  </Button>
                )}
                {agency.twitter && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 hover:bg-black hover:text-white bg-white text-black"
                    onClick={() =>
                      window.open(agency.twitter as string, "_blank")
                    }
                  >
                    <svg
                      className="h-4 w-4"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>X</title>
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                    {c("visitTwitter")}
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Info Card */}
            <Card className="w-full md:w-80 bg-black/50 backdrop-blur-sm p-6 space-y-4">
              <h3 className="font-semibold text-lg text-white">
                {t("quickInfo")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <BanknoteIcon className="h-4 w-4 text-pink-500" />
                  <span className="text-muted-foreground">
                    {t("budgetFrom")}{" "}
                    {agency.starting_budget
                      ? `$${agency.starting_budget}`
                      : t("unspecified")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-pink-500" />
                  <span className="text-muted-foreground">
                    {t("teamSize")} {agency.team_size || t("unspecified")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-pink-500" />
                  <span className="text-muted-foreground">
                    {t("founded")} {agency.founded}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-pink-500" />
                  <span className="text-muted-foreground">
                    {agency.projects_completed || 0} {t("projectsCompleted")}
                  </span>
                </div>
                {/* <div className="pt-4 flex gap-2">
                  {agency.twitter && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-white hover:bg-pink-700"
                      onClick={() =>
                        window.open(
                          `https://x.com/${agency.twitter}` ||
                            "https://nowly.africa",
                          "_blank"
                        )
                      }
                    >
                      <svg
                        className="h-4 w-4 text-white"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>X</title>
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                      </svg>
                    </Button>
                  )}
                  {agency.linkedin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-white hover:bg-pink-700"
                      onClick={() =>
                        window.open(
                          agency.linkedin || "https://nowly.africa",
                          "_blank"
                        )
                      }
                    >
                      <svg
                        className="h-4 w-4"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>LinkedIn</title>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </Button>
                  )}
                </div> */}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      {agency.portfolio && agency.portfolio.length > 0 && (
        <section className="container max-w-7xl mx-auto py-2">
          <h2 className="text-2xl font-bold mb-6 text-white">
            {t("featuredProjects")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agency.portfolio.map((project: PortfolioItem) => (
              <Card
                key={project.id}
                className="bg-black overflow-hidden hover:shadow-lg transition-shadow"
              >
                {project.image && (
                  <div className="aspect-video relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                  )}
                  {project.url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:bg-white hover:text-black"
                      onClick={() => window.open(project.url, "_blank")}
                    >
                      <span>{t("viewProject")}</span>{" "}
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
