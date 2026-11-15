import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

dest_dir = r"p:\Portfolio\premium-portfolio\public\images\intro"
os.makedirs(dest_dir, exist_ok=True)

# -----------------------------------------------------------------
# 1. PHOTOREALISTIC GRITTY CONCRETE WALL TEXTURE (1024 x 1024)
# -----------------------------------------------------------------
W, H = 1024, 1024
np.random.seed(42)

# Multi-octave Perlin-like noise for realistic concrete surface
base = np.full((H, W), 42, dtype=np.float32)

# Add noise layers of various frequencies
for scale, weight in [(256, 18), (128, 14), (64, 10), (16, 8), (4, 4), (1, 3)]:
    noise = np.random.normal(0, 1, (H // scale + 2, W // scale + 2))
    # Simple bilinear upscale using PIL
    n_im = Image.fromarray(noise).resize((W, H), Image.Resampling.BILINEAR)
    base += np.array(n_im) * weight

# Aggregate specks / stone pits in concrete
pits = np.random.choice([0, 1], size=(H, W), p=[0.985, 0.015]) * -25
stains = np.random.choice([0, 1], size=(H, W), p=[0.992, 0.008]) * 15
base += pits + stains

# Weathering streaks
y_coords = np.linspace(0, 1, H)[:, None]
streaks = np.sin(np.linspace(0, 30, W)[None, :]) * 6 * y_coords
base += streaks

# Clamp to realistic dark concrete values (40 to 110)
base = np.clip(base, 25, 120).astype(np.uint8)

# Convert to 3-channel BGR/RGB with slight cool-grey / industrial tone
r = np.clip(base.astype(np.int16) - 2, 0, 255).astype(np.uint8)
g = base
b = np.clip(base.astype(np.int16) + 4, 0, 255).astype(np.uint8)

concrete_im = Image.fromarray(np.stack([r, g, b], axis=2))
concrete_im = concrete_im.filter(ImageFilter.DETAIL)
concrete_im.save(os.path.join(dest_dir, "concrete-wall.jpg"), quality=95)
print("Saved concrete-wall.jpg (1024x1024)")

# -----------------------------------------------------------------
# 2. REALISTIC SHATTERED IMPACT BULLET CRATER (512 x 512 RGBA)
# -----------------------------------------------------------------
crater_im = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
d = ImageDraw.Draw(crater_im)
cx, cy = 256, 256

# Outer spall / pulverized white concrete dust ring
for r_step in range(160, 40, -10):
    alpha = int(90 * (1 - r_step / 160))
    d.ellipse([cx - r_step, cy - r_step, cx + r_step, cy + r_step],
              fill=(230, 225, 220, alpha))

# Irregular chipped concrete crater rim
pts = []
for a in np.linspace(0, np.pi * 2, 36, endpoint=False):
    rad = 65 + np.random.randint(-12, 16)
    pts.append((cx + int(np.cos(a) * rad), cy + int(np.sin(a) * rad)))
d.polygon(pts, fill=(18, 18, 20, 230), outline=(210, 205, 195, 240))

# Inner deep bullet puncture hole (pitch black with lead residue)
hole_pts = []
for a in np.linspace(0, np.pi * 2, 24, endpoint=False):
    rad = 28 + np.random.randint(-5, 6)
    hole_pts.append((cx + int(np.cos(a) * rad), cy + int(np.sin(a) * rad)))
d.polygon(hole_pts, fill=(6, 6, 8, 255), outline=(100, 40, 30, 200))

# Core cavity
d.ellipse([cx - 15, cy - 15, cx + 15, cy + 15], fill=(2, 2, 3, 255))

crater_im = crater_im.filter(ImageFilter.GaussianBlur(1))
crater_im.save(os.path.join(dest_dir, "concrete-crater.png"))
print("Saved concrete-crater.png (512x512)")
