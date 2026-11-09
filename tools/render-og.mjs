#!/usr/bin/env node
/**
 * Renders tools/og-card.html to og.png (1200x630), the link-preview image,
 * with the Chrome already on this machine. No install needed.
 *   node tools/render-og.mjs            (set CHROME_PATH if Chrome lives elsewhere)
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find((p) => p && existsSync(p));
if (!chrome) throw new Error("Chrome not found; set CHROME_PATH");

execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars",
  "--allow-file-access-from-files", "--virtual-time-budget=3000",
  "--window-size=1200,630", "--force-device-scale-factor=1",
  `--screenshot=${join(here, "..", "og.png")}`,
  pathToFileURL(join(here, "og-card.html")).href,
], { stdio: "ignore" });
console.log("wrote og.png");
