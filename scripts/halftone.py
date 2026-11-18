"""Two-ink halftone for the hero portrait (Alf 05).

Bakes, from public/images/portrait/alfonso-office-plaid.jpg:
  alf05-photo.jpg     576x768 plain crop (2x of the 288x384 CSS box)
  alf05-halftone.png  576x768 two-ink print: navy #0F283D and terracotta-500
                      #CF5B48 on paper white, 24px pitch at 2x (a 12px CSS
                      screen). Terracotta sits at 0 degrees, in register with
                      the hero's 24px lattice; navy sits at 45 degrees.

Separation, tuned by eye for this one photo:
  navy        = shadows and features: inverted luminance through a levels
                curve, after local contrast so brows, eyes and beard edge
                survive a 24x32-cell screen.
  terracotta  = warmth (red minus blue), so skin prints light and the plaid
                prints strong.
  background  = the photo's background is already a soft blur; a subject
                mask (sharp edges, holes filled) swaps it for a flat light
                navy tint, so the head's outline reads.
  inks        = opaque, navy printed last (knockout), so the file holds
                exactly the two ink colors on paper.

Usage: python3 halftone.py [out_dir] ['{"json": "overrides"}']
Default out_dir is the site's public/images/home/portrait/. The defaults
below are the shipped settings (chosen by eye from about 20 variants).
"""
import sys, json
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

SRC = "/Users/alfonsobarreiro/Projects/alfonso-barreiro/public/images/portrait/alfonso-office-plaid.jpg"
OUT = sys.argv[1] if len(sys.argv) > 1 else "/Users/alfonsobarreiro/Projects/alfonso-barreiro/public/images/home/portrait"
OPT = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}
def opt(k, d): return OPT.get(k, d)

W, H  = 576, 768
PITCH = float(opt("pitch", 24.0))   # 2x px; 24 = a 12px CSS screen
SS    = 4                          # supersamples per axis
CROP  = opt("crop", [210, 100, 990, 1140])   # 3:4, x0 y0 x1 y1 in source px

NAVY  = np.array([0x0F, 0x28, 0x3D]) / 255.0
TERRA = np.array([0xCF, 0x5B, 0x48]) / 255.0

src = Image.open(SRC).convert("RGB")

# --- subject mask (source resolution) -------------------------------------
def subject_mask(img):
    g = img.convert("L")
    a = np.asarray(g).astype(float)
    b = np.asarray(g.filter(ImageFilter.GaussianBlur(2))).astype(float)
    hf = Image.fromarray(np.clip(np.abs(a - b) * 12, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(10))
    sw, sh = img.width // 4, img.height // 4
    m = hf.resize((sw, sh), Image.BILINEAR).point(lambda v: 255 if v > 30 else 0).filter(ImageFilter.MaxFilter(9))
    for seed in [(0, 0), (sw - 1, 0), (sw // 2, 0), (0, sh // 2), (sw - 1, sh // 2)]:
        if m.getpixel(seed) == 0:
            ImageDraw.floodfill(m, seed, 128)
    arr = np.asarray(m)
    s = Image.fromarray(np.where(arr == 128, 0, 255).astype(np.uint8)).filter(ImageFilter.MinFilter(9))
    return s.resize(img.size, Image.BILINEAR).filter(ImageFilter.GaussianBlur(opt("feather", 14)))

mask_full = subject_mask(src)
box   = tuple(CROP)
photo = src.crop(box).resize((W, H), Image.LANCZOS)
mask  = np.asarray(mask_full.crop(box).resize((W, H), Image.BILINEAR)).astype(float) / 255.0
photo.save(f"{OUT}/alf05-photo.jpg", quality=82, optimize=True, progressive=True)

# --- tone prep -------------------------------------------------------------
rgb = np.asarray(photo).astype(float) / 255.0
L   = 0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]
# local contrast: subtract a wide blur, add back scaled
Li  = Image.fromarray((L * 255).astype(np.uint8))
Lb  = np.asarray(Li.filter(ImageFilter.GaussianBlur(opt("lc_radius", 28)))).astype(float) / 255.0
L   = np.clip(L + (L - Lb) * opt("lc_amount", 0.9), 0, 1)

def levels(x, lo, hi, gamma):
    return np.clip((x - lo) / (hi - lo), 0, 1) ** gamma

# terracotta first: warmth (red minus blue). Skin prints light, plaid strong.
# Relative warmth, so the plaid's darker reds count as much as the skin.
warm  = np.clip((rgb[..., 0] - rgb[..., 2]) / (rgb[..., 0] + opt("t_soft", 0.08)), 0, 1)
warm  = np.asarray(Image.fromarray((warm * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(opt("t_blur", 1.5)))).astype(float) / 255.0
terra = levels(warm, opt("t_lo", 0.17), opt("t_hi", 0.55), opt("t_gam", 1.4))
# a midtone floor of terracotta under everything darker than skin
terra = np.maximum(terra, opt("t_mid", 0.4) * levels(1 - L, 0.25, 0.8, 1.0))
# navy second: whatever darkness the terracotta does not already print.
# L_paper * (1 - t (1 - L_terra)) * (1 - n (1 - L_navy)) = L
L_T, L_N = 0.448, 0.142
after_t = 1 - terra * (1 - L_T) * opt("t_credit", 1.6)
navy  = np.clip((1 - L / np.maximum(after_t, 1e-3)) / (1 - L_N), 0, 1)
navy  = levels(navy, opt("n_lo", 0.12), opt("n_hi", 0.95), opt("n_gam", 1.2))

# background: replace with a flat tint (or paper)
navy  = navy * mask + opt("bg_n", 0.1) * (1 - mask)
terra = terra * mask + opt("bg_t", 0.0) * (1 - mask)

navy  = np.clip(navy * opt("n_gain", 0.85), 0, opt("n_max", 0.9))
terra = np.clip(terra * opt("t_gain", 0.8), 0, opt("t_max", 0.85))

FLOOR = opt("floor", 0.05)

def cell_tone(cov):
    im = Image.fromarray((cov * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(PITCH * opt("cell_blur", 0.3)))
    return np.asarray(im).astype(float) / 255.0

def screen(cov, angle):
    c  = cell_tone(cov)
    th = np.deg2rad(angle)
    cs, sn = np.cos(th), np.sin(th)
    ys, xs = np.mgrid[0:H * SS, 0:W * SS].astype(float)
    x = (xs + 0.5) / SS
    y = (ys + 0.5) / SS
    u = x * cs + y * sn
    v = -x * sn + y * cs
    i0 = np.floor(u / PITCH + 0.5)
    j0 = np.floor(v / PITCH + 0.5)
    hit = np.zeros_like(x, dtype=bool)
    for di in (-1, 0, 1):
        for dj in (-1, 0, 1):
            cu, cv = (i0 + di) * PITCH, (j0 + dj) * PITCH
            cx, cy = cu * cs - cv * sn, cu * sn + cv * cs
            sx = np.clip(np.round(cx).astype(int), 0, W - 1)
            sy = np.clip(np.round(cy).astype(int), 0, H - 1)
            a  = c[sy, sx]
            a  = np.where(a < FLOOR, 0, a)
            r  = PITCH * np.sqrt(a / np.pi)
            hit |= (x - cx) ** 2 + (y - cy) ** 2 < r * r
    return hit.reshape(H, SS, W, SS).mean(axis=(1, 3))

m_t = screen(terra, opt("ang_t", 0.0))
m_n = screen(navy,  opt("ang_n", 45.0))

# Opaque inks, navy printed last (a knockout, not an overprint), so the
# file holds exactly two ink colors on paper plus anti-aliased edges.
out = np.ones((H, W, 3))
if opt("overprint", False):
    out *= 1 - m_t[..., None] * (1 - TERRA)
    out *= 1 - m_n[..., None] * (1 - NAVY)
else:
    out = out * (1 - m_t[..., None]) + TERRA * m_t[..., None]
    out = out * (1 - m_n[..., None]) + NAVY * m_n[..., None]
im = Image.fromarray(np.clip(out * 255 + 0.5, 0, 255).astype(np.uint8))
# Two inks, paper and their anti-aliased edges fit a 16-color palette with
# no visible change, at about a third of the RGB file size.
im.quantize(colors=16, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(f"{OUT}/alf05-halftone.png", optimize=True)
if opt("preview", False):
    im.resize((288, 384), Image.LANCZOS).save(f"{OUT}/preview-1x.png")
