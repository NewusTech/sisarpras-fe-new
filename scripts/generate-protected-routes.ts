// scripts/generateProtectedRoutes.ts
import fg from "fast-glob";
import path from "path";
import fs from "fs";

/**
 * Base folder: hanya mengambil dari group (protected)
 * -> segmen "(protected)" TIDAK ikut ke URL
 */
const BASE = path.join(process.cwd(), "src/app/(protected)");

/** Cari semua file page|route (tsx|ts) */
const files = fg.sync("**/(page|route).ts*", { cwd: BASE, dot: false });

/** Cek apakah segmen adalah route group: /(something) atau /(.)intercept */
const isRouteGroup = (seg: string) => /^\(.*\)$/.test(seg);

/** Cek apakah segmen adalah parallel route slot: /@slot */
const isParallelSlot = (seg: string) => seg.startsWith("@");

/** Konversi segmen Next App Router → pattern path-to-regexp friendly */
function mapSegmentToToken(segment: string): string | null {
  if (!segment || segment === "page" || segment === "route") return null;

  // buang route groups & parallel slots
  if (isRouteGroup(segment) || isParallelSlot(segment)) return null;

  // Optional catch-all: [[...slug]] -> :slug* (cover root + multi segments)
  const optionalCatch = /^\[\[\.\.\.(.+)\]\]$/.exec(segment);
  if (optionalCatch) return `:${optionalCatch[1]}*`;

  // Catch-all: [...slug] -> :slug*
  const catchAll = /^\[\.\.\.(.+)\]$/.exec(segment);
  if (catchAll) return `:${catchAll[1]}*`;

  // Dinamis: [id] -> :id
  const dyn = /^\[(.+)\]$/.exec(segment);
  if (dyn) return `:${dyn[1]}`;

  // Static biasa
  return segment;
}

/** Convert relative file path (dari BASE) ke route pattern */
function fileToRoutePattern(file: string): string {
  // hapus suffix /page.tsx atau /route.ts
  const withoutFile = file.replace(/\/(page|route)\.tsx?$/, "");
  const parts = withoutFile.split("/");

  const mapped = parts.map(mapSegmentToToken).filter(Boolean) as string[];

  let route = "/" + mapped.join("/");

  // rapikan: ganti multi-slash & buang trailing slash (kecuali root)
  route = route.replace(/\/{2,}/g, "/");
  if (route.length > 1) route = route.replace(/\/+$/, "");

  return route || "/";
}

/** Generate list patterns */
const routePatterns = files.map(fileToRoutePattern);

/** Unik + sort (pendek → panjang) biar stabil */
const uniqueSorted = Array.from(new Set(routePatterns)).sort((a, b) => {
  if (a.length !== b.length) return a.length - b.length;
  return a.localeCompare(b);
});

/** Output ke file consumed oleh middleware */
const outputPath = path.join(
  process.cwd(),
  "middleware",
  "generatedProtectedRoutes.ts"
);

const content =
  `// 🚨 GENERATED FILE. DO NOT EDIT MANUALLY\n` +
  `// Dibuat otomatis oleh scripts/generateProtectedRoutes.ts\n` +
  `export const protectedRoutes = ${JSON.stringify(uniqueSorted, null, 2)} as const;\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, content);
console.log("✅ Generated protectedRoutes:", outputPath);
