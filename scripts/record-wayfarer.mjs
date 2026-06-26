/* Record the live WayfarerGlobePeek component playing one full
   Bhutan → Lisbon → Cape Town demo cycle, frame by frame.

   Runs visible (headless: false) because Mapbox needs real WebGL,
   which headless Chromium can't provide on macOS. The window pops up
   briefly, captures frames, and closes. */

import puppeteer from 'puppeteer';
import fs from 'fs';

const URL = 'http://localhost:3000/';
const OUT_DIR = '/tmp/wayfarer-frames';
const FPS = 24;
const DURATION_S = 42;
const TOTAL_FRAMES = FPS * DURATION_S;

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: false,   // need real WebGL for Mapbox
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

const page = await browser.newPage();
page.on('pageerror', e => console.log('[pageerror]', e.message));
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warn') console.log('[browser]', m.type(), m.text()); });

console.log('navigating to', URL);
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

const handle = await page.waitForSelector('[aria-label="Wayfarer interactive globe on an iPad Pro"]', { timeout: 30000 });
if (!handle) throw new Error('Wayfarer globe element not found');

await page.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }), handle);
// Mapbox needs a beat to finish loading tiles + IntersectionObserver triggers
// the demo ~2.5 s after coming into view, so wait long enough that capture
// starts right as the first fly-to begins.
await new Promise(r => setTimeout(r, 5000));

const interval = 1000 / FPS;
const start = Date.now();
console.log(`capturing ${TOTAL_FRAMES} frames at ${FPS}fps`);

for (let i = 0; i < TOTAL_FRAMES; i++) {
  const target = start + i * interval;
  const now = Date.now();
  if (target > now) await new Promise(r => setTimeout(r, target - now));

  // elementHandle.screenshot auto-handles page-vs-viewport coords and
  // captures just the element's bounding box.
  await handle.screenshot({
    path: `${OUT_DIR}/frame_${String(i).padStart(4, '0')}.png`,
    omitBackground: false,
  });

  if (i % 60 === 0) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`  frame ${i}/${TOTAL_FRAMES}  ${elapsed}s real`);
  }
}

console.log(`done — ${TOTAL_FRAMES} frames captured in ${((Date.now() - start) / 1000).toFixed(1)}s`);
await browser.close();
