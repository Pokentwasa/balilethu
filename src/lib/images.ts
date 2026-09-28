/**
 * Picks up photos in /public/images by file-name convention, so adding a
 * photo needs no code change. Slot names are listed in docs/IMAGES.md.
 *
 * Server-only (uses the filesystem at build/render time).
 */
import fs from "node:fs";
import path from "node:path";
import type { StockImage } from "./types";
import { photoAlts } from "@/data/photos";

const ROOT = path.join(process.cwd(), "public", "images");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

// Placeholder dimensions: images render with `fill`, so the real size isn't needed.
const W = 1600;
const H = 1200;

function toImage(relative: string, fallbackAlt: string): StockImage {
  const posix = relative.split(path.sep).join("/");
  const key = posix.replace(/\.[^.]+$/, "");
  return { src: `/images/${posix}`, alt: photoAlts[key] ?? fallbackAlt, width: W, height: H };
}

/** Finds `public/images/<slot>.<ext>`, e.g. slot "categories/calves". */
export function findImage(slot: string, alt: string): StockImage | null {
  for (const ext of EXTENSIONS) {
    const file = path.join(ROOT, `${slot}${ext}`);
    if (fs.existsSync(file)) return toImage(`${slot}${ext}`, alt);
  }
  return null;
}

/** All images in `public/images/<dir>/`, sorted by file name (1.jpg, 2.jpg…). */
export function findImages(dir: string, alt: string): StockImage[] {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f, i, all) => toImage(path.join(dir, f), all.length > 1 ? `${alt} — photo ${i + 1}` : alt));
}
