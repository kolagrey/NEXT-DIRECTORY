import DOMPurify from "isomorphic-dompurify";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabase";
interface SlugOptions {
  maxLength?: number;
  table?: string;
  field?: string;
}

type VideoType = "youtube" | "loom" | "unknown";
interface VideoInfo {
  type: VideoType;
  embedUrl: string | null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getVideoEmbedUrl = (url: string): VideoInfo => {
  // Clean the URL by trimming whitespace
  const cleanUrl = url.trim();

  // YouTube URL patterns
  const youtubePatterns = {
    standard: /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    shorts: /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  };

  // Loom URL pattern
  const loomPattern = /loom\.com\/(share|embed)\/([a-zA-Z0-9-]+)/;

  // Check for YouTube URLs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, pattern] of Object.entries(youtubePatterns)) {
    const match = cleanUrl.match(pattern);
    if (match) {
      const videoId = match[1];
      return {
        type: "youtube",
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      };
    }
  }

  // Check for Loom URLs
  const loomMatch = cleanUrl.match(loomPattern);
  if (loomMatch) {
    const videoId = loomMatch[2];
    return {
      type: "loom",
      embedUrl: `https://www.loom.com/embed/${videoId}`,
    };
  }

  // Return null if no valid video URL is found
  return {
    type: "unknown",
    embedUrl: null,
  };
};

export async function generateUniqueSlug(
  text: string,
  options: SlugOptions = {}
): Promise<string> {
  const { maxLength = 200, table = "agencies", field = "slug" } = options;

  if (!text) throw new Error("Text is required to generate slug");

  // Generate base slug with maximum length consideration
  let baseSlug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // Trim to max length while avoiding cutting in middle of word
  if (baseSlug.length > maxLength) {
    baseSlug = baseSlug.substring(0, maxLength).replace(/-[^-]*$/, "");
  }

  let slug = baseSlug;
  let counter = 0;

  // Batch check for existing slugs with similar pattern
  const { data: existingSlugs, error } = await supabase
    .from(table)
    .select(field)
    .like(field, `${baseSlug}%`);

  if (error) {
    throw new Error(`Error checking slug uniqueness: ${error.message}`);
  }

  // If there are existing slugs, find the highest number used
  if (existingSlugs && existingSlugs.length > 0) {
    const existingNumbers = existingSlugs
      .map((row) => {
        const match = (row as unknown as Record<string, string>)[field].match(
          new RegExp(`^${baseSlug}(?:-(\d+))?$`)
        );
        return match ? parseInt(match[1] || "0") : 0;
      })
      .filter((num) => !isNaN(num));

    if (existingNumbers.length > 0) {
      counter = Math.max(...existingNumbers) + 1;
      slug = `${baseSlug}-${counter}`;
    }
  }

  return slug;
}


export const sanitizeQueryParam = (value: unknown): string => {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return "";
  }

  // Convert to string if it isn't already
  const stringValue = String(value);

  // Use DOMPurify to remove any HTML/scripts
  const sanitized = DOMPurify.sanitize(stringValue, {
    ALLOWED_TAGS: [], // Don't allow any HTML tags
    ALLOWED_ATTR: [], // Don't allow any attributes
  });

  // Additional cleaning
  return sanitized
    .replace(/[<>]/g, "") // Remove any remaining brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocols
    .replace(/data:/gi, "") // Remove data: URIs
    .trim(); // Remove whitespace
}