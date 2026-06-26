import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
page.on('console', m => console.log('[browser]', m.type(), m.text()));
page.on('pageerror', e => console.log('[pageerror]', e.message));

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 60000 });

const labels = await page.evaluate(() => {
  return [...document.querySelectorAll('[aria-label]')].map(el => {
    const r = el.getBoundingClientRect();
    return {
      label: el.getAttribute('aria-label').slice(0, 80),
      tag: el.tagName,
      offsetTop: el.offsetTop,
      vr_x: Math.round(r.left),
      vr_y: Math.round(r.top),
      vr_w: Math.round(r.width),
      vr_h: Math.round(r.height),
    };
  });
});
console.log('elements with aria-label:');
labels.forEach(l => console.log(' ', JSON.stringify(l)));

const wayElem = await page.$('[aria-label="Wayfarer interactive globe on an iPad Pro"]');
if (!wayElem) { console.log('not found!'); process.exit(1); }
const r1 = await wayElem.boundingBox();
console.log('\nbefore scrollIntoView:', r1);

await page.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }), wayElem);
await new Promise(r => setTimeout(r, 1500));

const r2 = await wayElem.boundingBox();
console.log('after scrollIntoView:', r2);
console.log('window.scrollY after:', await page.evaluate(() => window.scrollY));

// Take a full page screenshot to see what's actually visible
await page.screenshot({ path: '/tmp/debug-wayfarer-full.png', fullPage: false });
console.log('saved /tmp/debug-wayfarer-full.png');

// Also screenshot using the clip we'd use
await page.screenshot({ path: '/tmp/debug-wayfarer-clip.png', clip: { x: r2.x, y: r2.y, width: r2.width, height: r2.height } });
console.log('saved /tmp/debug-wayfarer-clip.png');

await browser.close();
