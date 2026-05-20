#!/usr/bin/env node
/**
 * snap-msr.mjs
 *
 * Captures the Men's Sole Revival homepage from the local MSR dev server
 * (localhost:3001) and saves a tall JPEG to /public/cs-msr-homepage.jpg.
 *
 * That JPEG is the static backdrop for the MSR card peek on the portfolio
 * homepage. Re-run this whenever you push meaningful design changes to MSR
 * and want the portfolio peek to reflect them.
 *
 * Usage:   npm run snap:msr
 * Prereq:  MSR dev server running at http://localhost:3001
 */

import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH  = resolve(__dirname, "..", "public", "cs-msr-homepage.jpg");
const MSR_URL   = process.env.MSR_URL || "http://localhost:3001/";

// Match the values used by MSRPagePeek.tsx
const CAPTURE_WIDTH  = 1280;
const CAPTURE_HEIGHT = 4000;

(async () => {
  console.log(`→ Capturing ${MSR_URL}`);
  console.log(`  size  ${CAPTURE_WIDTH} × ${CAPTURE_HEIGHT} @ 2x DPR`);
  console.log(`  out   ${OUT_PATH}`);

  const browser = await puppeteer.launch({
    headless:        true,
    defaultViewport: { width: CAPTURE_WIDTH, height: 800, deviceScaleFactor: 2 },
  });

  try {
    const page = await browser.newPage();
    try {
      await page.goto(MSR_URL, { waitUntil: "networkidle2", timeout: 30_000 });
    } catch (err) {
      console.error(`✗ Could not load ${MSR_URL}`);
      console.error(`  Is MSR running?  cd ../mens-sole-revival && npm run dev`);
      throw err;
    }

    // Let custom fonts + lazy images settle
    await new Promise((r) => setTimeout(r, 4_000));

    const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const clipHeight = Math.min(docHeight, CAPTURE_HEIGHT);

    await page.screenshot({
      path:    OUT_PATH,
      type:    "jpeg",
      quality: 88,
      clip:    { x: 0, y: 0, width: CAPTURE_WIDTH, height: clipHeight },
    });

    if (!existsSync(OUT_PATH)) throw new Error("screenshot did not write to disk");
    console.log(`✓ Saved (${clipHeight}px tall)`);
    console.log(`  Reload the portfolio to see the new screenshot.`);
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error("✗ Failed:", err.message || err);
  process.exit(1);
});
