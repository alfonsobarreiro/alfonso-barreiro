// Generate favicon set (icon.png, apple-icon.png, favicon.ico) from the
// portfolio logo. Mirrors the ABD script: extract the mark by alpha-channel
// column density, pad to square, then emit three Next.js-detected sizes.
// Difference: no retinting — public/logo-transparent.png is already the
// correct dark cognac-on-transparent ("blue/dark") color the portfolio uses.

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PROJECT = '/Users/alfonsobarreiro/Projects/alfonso-barreiro';
const SRC = path.join(PROJECT, 'public/logo-transparent.png');

async function main() {
  const meta = await sharp(SRC).metadata();
  console.log('SRC:', meta.width, 'x', meta.height);

  // 1. Read raw alpha channel — one byte per pixel
  const { data, info } = await sharp(SRC)
    .extractChannel('alpha')
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;

  // 2. Per-column alpha density
  const colDensity = new Array(W).fill(0);
  for (let y = 0; y < H; y++) {
    const rowBase = y * W;
    for (let x = 0; x < W; x++) {
      colDensity[x] += data[rowBase + x];
    }
  }
  const maxDensity = Math.max(...colDensity);
  const norm = colDensity.map((d) => d / maxDensity);

  // 3. Detect symbol/wordmark gap (none in this logo since it's mark-only, but
  //    keep the same logic for parity with ABD script)
  const LOW = 0.02;
  const GAP_MIN_PX = Math.round(W * 0.015);
  let firstContent = norm.findIndex((d) => d > LOW);
  let inGap = false;
  let gapStart = -1;
  let gap = null;
  for (let x = firstContent; x < W; x++) {
    if (norm[x] < LOW) {
      if (!inGap) { gapStart = x; inGap = true; }
      if (x - gapStart >= GAP_MIN_PX) {
        gap = { start: gapStart, end: x };
        break;
      }
    } else {
      inGap = false;
      gapStart = -1;
    }
  }
  console.log('firstContent:', firstContent, 'gap:', gap);

  // 4. Mark horizontal bounds
  let markLeft, markRight;
  if (gap) {
    markLeft = Math.max(0, firstContent - 10);
    markRight = gap.start + 10;
  } else {
    // No gap → use full alpha extent
    markLeft = Math.max(0, firstContent);
    let lastContent = W;
    for (let x = W - 1; x >= 0; x--) { if (norm[x] > LOW) { lastContent = x + 1; break; } }
    markRight = lastContent;
  }
  const markWidth = markRight - markLeft;
  console.log('Mark crop: left=' + markLeft + ' width=' + markWidth + ' (of ' + W + ')');

  // 5. Mark vertical bounds within the mark region
  const rowDensity = new Array(H).fill(0);
  for (let y = 0; y < H; y++) {
    const rowBase = y * W;
    for (let x = markLeft; x < markRight; x++) {
      rowDensity[y] += data[rowBase + x];
    }
  }
  const maxRow = Math.max(...rowDensity);
  const normRow = rowDensity.map((d) => d / maxRow);
  let markTop = normRow.findIndex((d) => d > LOW);
  let markBottom = H;
  for (let y = H - 1; y >= 0; y--) { if (normRow[y] > LOW) { markBottom = y + 1; break; } }
  const markHeight = markBottom - markTop;
  console.log('Mark vertical: top=' + markTop + ' height=' + markHeight);

  // 6. Extract the mark (no retinting — keep source color)
  const markBuf = await sharp(SRC)
    .extract({ left: markLeft, top: markTop, width: markWidth, height: markHeight })
    .png()
    .toBuffer();

  // 7. Pad to square (transparent)
  const markMeta = await sharp(markBuf).metadata();
  const isWide = markMeta.width > markMeta.height;
  const squareSize = Math.max(markMeta.width, markMeta.height);
  const padTop = isWide ? Math.floor((squareSize - markMeta.height) / 2) : 0;
  const padLeft = isWide ? 0 : Math.floor((squareSize - markMeta.width) / 2);

  const squaredTransparent = await sharp(markBuf)
    .extend({
      top: padTop,
      bottom: squareSize - markMeta.height - padTop,
      left: padLeft,
      right: squareSize - markMeta.width - padLeft,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // 8. src/app/icon.png — 512×512 transparent
  await sharp(squaredTransparent)
    .resize(512, 512)
    .png()
    .toFile(path.join(PROJECT, 'src/app/icon.png'));

  // 9. src/app/apple-icon.png — 180×180 with off-white bg + 10px inset for iOS
  await sharp(squaredTransparent)
    .resize(160, 160)
    .extend({
      top: 10, bottom: 10, left: 10, right: 10,
      background: { r: 250, g: 250, b: 250, alpha: 1 },
    })
    .flatten({ background: { r: 250, g: 250, b: 250 } })
    .png()
    .toFile(path.join(PROJECT, 'src/app/apple-icon.png'));

  // 10. src/app/favicon.ico — 32×32 PNG wrapped in an ICO header
  //     Next.js 16's ICO decoder requires RGBA, hence ensureAlpha().
  const icoPng = await sharp(squaredTransparent)
    .resize(32, 32)
    .ensureAlpha()
    .png()
    .toBuffer();

  const ico = Buffer.alloc(6 + 16 + icoPng.length);
  ico.writeUInt16LE(0, 0);                  // reserved
  ico.writeUInt16LE(1, 2);                  // type (1 = ICO)
  ico.writeUInt16LE(1, 4);                  // image count
  ico.writeUInt8(32, 6);                    // width
  ico.writeUInt8(32, 7);                    // height
  ico.writeUInt8(0, 8);                     // colors (0 = no palette)
  ico.writeUInt8(0, 9);                     // reserved
  ico.writeUInt16LE(1, 10);                 // color planes
  ico.writeUInt16LE(32, 12);                // bits per pixel
  ico.writeUInt32LE(icoPng.length, 14);     // image data size
  ico.writeUInt32LE(22, 18);                // offset to image data
  icoPng.copy(ico, 22);
  fs.writeFileSync(path.join(PROJECT, 'src/app/favicon.ico'), ico);

  console.log('Saved src/app/icon.png + src/app/apple-icon.png + src/app/favicon.ico');
}

main().catch((e) => { console.error(e); process.exit(1); });
