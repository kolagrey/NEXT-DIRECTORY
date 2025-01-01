"use client";

import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Loader2,
  ChevronUp,
  ChevronDown,
  Plus,
  RefreshCw,
  AlertCircle,
  PlusIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCallback, useEffect, useState, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Agency } from "@/lib/types";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Sharer from "./sharer";

interface FetchResponse {
  agencies: Agency[];
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
}

export default function Listing() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState<
    Array<{ name: string; slug: string; featured?: boolean; count?: number }>
  >([]);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const resultsRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("listing");
  const c = useTranslations("common");

  const fetchAgencies = useCallback(
    async (pageNum: number, isNewSearch = false) => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: pageNum.toString(),
          ...(debouncedSearch && { query: debouncedSearch }),
          ...(selectedCategory && { category: selectedCategory }),
        });

        const response = await fetch(`/api/agencies/search?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch agencies");
        }

        const data: FetchResponse = await response.json();

        setAgencies((prev) =>
          isNewSearch ? data.agencies : [...prev, ...data.agencies]
        );
        setHasMore(data.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching agencies:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearch, selectedCategory]
  );

  useEffect(() => {
    const fetchTopSkills = async () => {
      try {
        const response = await fetch("/api/agencies/top-skills");
        if (!response.ok) {
          throw new Error("Failed to fetch top skills");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching top skills:", err);
      }
    };

    fetchTopSkills();
  }, []);

  // Reset and fetch when search or category changes
  useEffect(() => {
    setPage(1);
    setAgencies([]);
    fetchAgencies(1, true);
  }, [debouncedSearch, selectedCategory, fetchAgencies]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAgencies(nextPage);
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(selectedCategory === slug ? null : slug);

    // Scroll to results with a slight delay to allow for data loading
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 10);

  return (
    <section
      className="container max-w-6xl space-y-8 py-12 mx-auto"
      id="listings"
    >
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            className="pl-10 py-6 text-lg rounded-full bg-muted/50 text-black"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {displayedCategories.map((category) => (
              <Badge
                key={category.slug}
                variant={category.featured ? "default" : "secondary"}
                className={`group px-4 py-2 text-sm cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category.slug
                    ? "bg-pink-500 hover:bg-pink-600 shadow-lg"
                    : "hover:bg-muted-foreground/10"
                }`}
                onClick={() => handleCategorySelect(category.slug)}
              >
                <span className="flex items-center gap-2">
                  {category.name}
                  {category.count && (
                    <span
                      className={`text-xs opacity-60 transition-opacity group-hover:opacity-100 ${
                        selectedCategory === category.slug
                          ? "text-white"
                          : "text-muted-foreground"
                      }`}
                    >
                      ({category.count})
                    </span>
                  )}
                </span>
              </Badge>
            ))}
          </div>
          {categories.length > 10 && (
            <Button
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-primary"
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? (
                <span className="flex items-center gap-1">
                  Show Less <ChevronUp className="h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  Show More Categories <ChevronDown className="h-4 w-4" />
                </span>
              )}
            </Button>
          )}
        </div>
      </div>

      <div
        ref={resultsRef}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 scroll-mt-8"
      >
        {agencies.map((agency, index) => (
          <Link
            key={`${agency.id}-${index}`}
            href={`/${locale}/${agency.slug}`}
            target="_blank"
            className="block w-full"
          >
            <Card className="relative h-[120px] bg-black overflow-hidden hover:shadow-md transition-shadow hover:shadow-gray-50">
              <div className="absolute inset-0 p-4">
                <div className="flex h-full gap-3">
                  <div className="shrink-0">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                      {agency.logo_url ? (
                        <Image
                          src={agency.logo_url}
                          alt={agency.title}
                          height={400}
                          width={400}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700 flex items-center justify-center text-sm">
                          {agency.title.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 w-full">
                      <h3 className="font-semibold truncate text-sm sm:text-base">
                        {agency.title}
                      </h3>
                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 break-words">
                      {agency.short_description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Loading and error states */}
      {isLoading && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center pb-12 px-4">
          <div className="rounded-full bg-red-100/10 p-4 mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-red-500">
            {t("errorTitle")}
          </h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            {t("errorDescription")}
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              setError(null);
              fetchAgencies(page, true);
            }}
            className="gap-2 hover:bg-white hover:text-black transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            {c("tryAgain")}
          </Button>
        </div>
      )}

      {!isLoading && agencies.length === 0 && (
        <div className="container mx-auto px-4 py-6 bg-black rounded-lg">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative max-w-full overflow-hidden">
              <Image
                src="/launch.svg"
                alt="Agency collaboration illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>

            <div className="max-w-xl">
              <h1 className="uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700 ">
                <span className="text-white">{t("emptyStateTitle")}</span>
                <br />
                {t("emptyStateSubtitle")}
              </h1>
              <p className="mt-4 text-xl">{t("emptyStateDescription")}</p>
              <div className="mt-8">
                <Link href={`/${locale}/create`}>
                  <Button
                    size="lg"
                    className="flex items-center bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>{c("listAgency")}</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && hasMore && agencies.length > 0 && (
        <div className="flex justify-center py-4">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            {t("loadMoreAgencies")}
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </Button>
        </div>
      )}

      {!isLoading && !hasMore && agencies.length > 0 && (
        <div className="space-y-6 py-8">
          <div className="text-center space-y-4">
            <p className="text-gray-500">{t("endOfListMessage")}</p>
            <div className="flex flex-col items-center gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
                onClick={() => router.push(`/${locale}/create`)}
              >
                <Plus className="h-4 w-4" />
                {t("addYourAgency")}
              </Button>

              <Sharer />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
