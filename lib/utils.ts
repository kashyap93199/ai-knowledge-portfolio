import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names with conditional support. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Convert a string into a URL-friendly slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/** Parse a newline-delimited list from a DB text column into an array. */
export function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Parse a pipe-delimited tags column into an array. */
export function parseTags(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split("|")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/** Format a datetime string from SQLite into a readable date. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value.replace(" ", "T") + "Z");
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Strip markdown-ish emphasis and return a plain text excerpt. */
export function plainText(value: string, maxLength = 180): string {
  const text = value
    .replace(/[*_`#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}