import { type SiteConfig } from "./config";
import { edConfig } from "./seeds/ed";

// ─────────────────────────────────────────────────────────────────────────────
// Single-vertical config store.
//
// The original TreatmentsHub platform loaded per-vertical config from Vercel
// Blob (a CMS). This site is a single, standalone ED vertical whose content is
// code-authoritative (src/lib/seeds/ed.ts), so config-store collapses to a thin
// accessor: every page calls getConfig() and gets the ED config. The `vertical`
// argument is accepted (so existing call sites keep compiling) but ignored -
// there is only one vertical here.
// ─────────────────────────────────────────────────────────────────────────────

export async function getConfig(_vertical?: string): Promise<SiteConfig> {
  return edConfig;
}

// No-op: content is code-authoritative on this site (no blob CMS). Kept so the
// admin/api routes that import it continue to type-check.
export async function saveConfig(_config: SiteConfig, _vertical?: string): Promise<void> {
  return;
}
