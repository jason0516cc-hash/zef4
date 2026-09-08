// ── Mob Drawing — florr.io style ─────────────────────────────────────────────
// All mobs are round/compact to match the game's aesthetic.
// SpiderLegs class is included here — you can delete spiderLegs.js.
import { PLAYER_COLOR, PLAYER_BORDER } from './constants.js';

// ── Spider ────────────────────────────────────────────────────────────────────
export function drawSpider(ctx, x, y, r, facing = 0, legPhase = 0, speed = 0) {
  const legLen  = r * 1.3;
  const legW    = r * 0.28;
  const spreads = [-0.55, -0.18, 0.18, 0.55];
  const sideAngle = facing + Math.PI / 2;

  ctx.lineCap = 'round';

  // Left legs — behind body
  spreads.forEach((spread, i) => {
    const ang  = sideAngle + Math.PI + spread;
    const anim = speed > 0.2 ? Math.sin(legPhase + i * 1.1) * 0.10 : 0;
    const a    = ang + anim;
    const sx = x + Math.cos(a) * r;
    const sy = y + Math.sin(a) * r;
    const ex = x + Math.cos(a) * (r + legLen);
    const ey = y + Math.sin(a) * (r + legLen);
    const cx = (sx + ex) / 2 + Math.cos(a + Math.PI / 2) * r * 0.4;
    const cy = (sy + ey) / 2 + Math.sin(a + Math.PI / 2) * r * 0.4;
    ctx.strokeStyle = '#2a1505';
    ctx.lineWidth   = legW;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(cx, cy, ex, ey);
    ctx.stroke();
  });

  // Right legs
  spreads.forEach((spread, i) => {
    const ang  = sideAngle + spread;
    const anim = speed > 0.2 ? Math.sin(legPhase * 1.1 + i * 1.1 + 2.0) * 0.10 : 0;
    const a    = ang + anim;
    const sx = x + Math.cos(a) * r;
    const sy = y + Math.sin(a) * r;
    const ex = x + Math.cos(a) * (r + legLen);
    const ey = y + Math.sin(a) * (r + legLen);
    const cx = (sx + ex) / 2 + Math.cos(a - Math.PI / 2) * r * 0.4;
    const cy = (sy + ey) / 2 + Math.sin(a - Math.PI / 2) * r * 0.4;
    ctx.strokeStyle = '#2a1505';
    ctx.lineWidth   = legW;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(cx, cy, ex, ey);
    ctx.stroke();
  });

  // Body — drawn last so it sits on top of all legs
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle   = '#3d2008';
  ctx.strokeStyle = '#1a0a02';
  ctx.lineWidth   = r * 0.15;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#5a3010';
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// ── Bee ───────────────────────────────────────────────────────────────────────
// Oval yellow body with black stripes, antennae, stinger, and gentle wobble.
export function drawBee(ctx, x, y, r, facing = 0, wobblePhase = 0) {
  ctx.save();
  ctx.translate(x, y);

  // Facing: antennae point forward, stinger trails behind.
  // The bee is drawn "pointing up" (antennae at top = -PI/2),
  // so we rotate so that "up" aligns with the facing direction.
  ctx.rotate(facing + Math.PI / 2);

  // Gentle side-to-side wobble — ±15 degrees
  ctx.rotate(Math.sin(wobblePhase) * 0.26);

  const rx = r * 1.18;  // half-width
  const ry = r * 1.55;  // half-height — longer than before

  // Stinger — curved with rounded tip, drawn first so body covers the base
  const beeTipR  = r * 0.07;
  const beeTipCY = ry + r * 0.82 - beeTipR;
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.moveTo(-r * 0.46, ry - r * 0.1);
  ctx.quadraticCurveTo(-r * 0.18, ry + r * 0.55, -beeTipR, beeTipCY);
  ctx.arc(0, beeTipCY, beeTipR, Math.PI, 0, true);
  ctx.quadraticCurveTo( r * 0.18, ry + r * 0.55, r * 0.46, ry - r * 0.1);
  ctx.closePath();
  ctx.fill();

  // Body border
  ctx.fillStyle = '#c8960a';
  ctx.beginPath();
  ctx.ellipse(0, 0, rx + r * 0.18, ry + r * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = '#f5cf4b';
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3 stripes clipped to body
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = '#1a1a1a';
  const stripeOffsets = [-ry * 0.5, 0, ry * 0.5];
  const stripeH = ry * 0.26;
  for (const sy of stripeOffsets) {
    ctx.fillRect(-rx - 2, sy - stripeH / 2, (rx + 2) * 2, stripeH);
  }
  ctx.restore();

  // Left antenna
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = r * 0.224;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-r * 0.22, -ry + r * 0.1);
  ctx.quadraticCurveTo(-r * 0.52, -ry - r * 0.44, -r * 0.656, -r * 0.656 - ry);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-r * 0.656, -r * 0.656 - ry, r * 0.192, 0, Math.PI * 2);
  ctx.fillStyle = '#1a1a1a';
  ctx.fill();

  // Right antenna
  ctx.beginPath();
  ctx.moveTo(r * 0.22, -ry + r * 0.1);
  ctx.quadraticCurveTo(r * 0.52, -ry - r * 0.44, r * 0.656, -r * 0.656 - ry);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(r * 0.656, -r * 0.656 - ry, r * 0.192, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ── Queen Bee ─────────────────────────────────────────────────────────────────
// Like drawBee but 1.5x size scaling, slightly bigger stinger, antennae curve inward then flare out.
export function drawQueenBee(ctx, x, y, r, facing = 0, wobblePhase = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing + Math.PI / 2);
  ctx.rotate(Math.sin(wobblePhase) * 0.26);

  const rx = r * 1.18;
  const ry = r * 1.55;

  // Stinger — curved, slightly bigger than regular bee
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.moveTo(-r * 0.46, ry - r * 0.1);
  ctx.quadraticCurveTo(-r * 0.18, ry + r * 0.68, 0, ry + r * 1.05);
  ctx.quadraticCurveTo( r * 0.18, ry + r * 0.68, r * 0.46, ry - r * 0.1);
  ctx.closePath();
  ctx.fill();

  // Body border
  ctx.fillStyle = '#c8960a';
  ctx.beginPath();
  ctx.ellipse(0, 0, rx + r * 0.18, ry + r * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = '#f5cf4b';
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3 stripes clipped to body
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = '#1a1a1a';
  const stripeOffsets = [-ry * 0.5, 0, ry * 0.5];
  const stripeH = ry * 0.26;
  for (const sy of stripeOffsets) {
    ctx.fillRect(-rx - 2, sy - stripeH / 2, (rx + 2) * 2, stripeH);
  }
  ctx.restore();

  // Left antenna — curves inward then flares out to tip
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = r * 0.224;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-r * 0.22, -ry + r * 0.1);
  ctx.quadraticCurveTo(-r * 0.10, -ry - r * 0.50, -r * 0.82, -r * 0.82 - ry);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-r * 0.82, -r * 0.82 - ry, r * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = '#1a1a1a';
  ctx.fill();

  // Right antenna — curves inward then flares out to tip
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = r * 0.224;
  ctx.beginPath();
  ctx.moveTo(r * 0.22, -ry + r * 0.1);
  ctx.quadraticCurveTo(r * 0.10, -ry - r * 0.50, r * 0.82, -r * 0.82 - ry);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(r * 0.82, -r * 0.82 - ry, r * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = '#1a1a1a';
  ctx.fill();

  ctx.restore();
}

// ── Hive ──────────────────────────────────────────────────────────────────────
// Flat-bottom pentagon, rotated 25°, 3 concentric rings + dark centre.
// Drawn at 1.75× the passed radius to appear larger than ant hole.
export function drawHive(ctx, x, y, r) {
  const R     = r * 1.75;      // hive is 1.75× ant hole size
  const sides = 5;
  const tilt  = -Math.PI / 2 + (25 * Math.PI / 180); // flat-bottom + 25° rotation

  function pentagon(radius) {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const a  = tilt + (i / sides) * Math.PI * 2;
      const px = Math.cos(a) * radius;
      const py = Math.sin(a) * radius;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  ctx.save();
  ctx.translate(x, y);

  // Outer ring
  pentagon(R);
  ctx.fillStyle = '#c07a10';
  ctx.fill();
  ctx.strokeStyle = '#3d2500';
  ctx.lineWidth   = R * 0.04;
  ctx.stroke();

  // Mid ring
  pentagon(R * 0.68);
  ctx.fillStyle = '#e8a020';
  ctx.fill();
  ctx.strokeStyle = '#3d2500';
  ctx.lineWidth   = R * 0.035;
  ctx.stroke();

  // Inner ring
  pentagon(R * 0.40);
  ctx.fillStyle = '#f5cf4b';
  ctx.fill();
  ctx.strokeStyle = '#3d2500';
  ctx.lineWidth   = R * 0.03;
  ctx.stroke();

  // Dark centre pentagon
  pentagon(R * 0.18);
  ctx.fillStyle = '#1e1000';
  ctx.fill();
  ctx.strokeStyle = '#3d2500';
  ctx.lineWidth   = R * 0.025;
  ctx.stroke();

  ctx.restore();
}

// ── Hornet ────────────────────────────────────────────────────────────────────
// Compact body — rx * ry proportions are balanced, not stretched.
// stingerProgress: 1 = full stinger, 0 = just fired (regrows 0→1)
export function drawHornet(ctx, x, y, r, facing = 0, wobblePhase = 0, stingerProgress = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing + Math.PI / 2);
  ctx.rotate(Math.sin(wobblePhase) * 0.18);

  const rx = r * 0.92;   // slightly slimmer than bee (bee = 1.18)
  const ry = r * 1.35;   // less elongated than before — more natural

  // Stinger — curved, grows out from body base as stingerProgress rises 0→1
  const sp = Math.max(0, Math.min(1, stingerProgress));
  if (sp > 0.02) {
    const hw  = r * 0.38 * sp;
    const tip = ry + r * 0.90 * sp;
    const tipRound = r * 0.04 * sp;  // rounded cap size
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.moveTo(-hw, ry - r * 0.06);
    ctx.quadraticCurveTo(-hw * 0.38, (ry + tip) * 0.5, -hw * 0.05, tip - tipRound);
    ctx.quadraticCurveTo(0, tip, hw * 0.05, tip - tipRound);  // rounded cap
    ctx.quadraticCurveTo( hw * 0.38, (ry + tip) * 0.5, hw, ry - r * 0.06);
    ctx.closePath();
    ctx.fill();
  }

  // Body border
  ctx.fillStyle = '#c8960a';
  ctx.beginPath();
  ctx.ellipse(0, 0, rx + r * 0.14, ry + r * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = '#f5cf4b';
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3 stripes clipped to body
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = '#1a1a1a';
  const stripeOffsets = [-ry * 0.48, 0, ry * 0.48];
  const stripeH = ry * 0.25;
  for (const so of stripeOffsets) {
    ctx.fillRect(-rx - 2, so - stripeH / 2, (rx + 2) * 2, stripeH);
  }
  ctx.restore();

  // Antennae
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = r * 0.18;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(-r * 0.20, -ry + r * 0.1);
  ctx.quadraticCurveTo(-r * 0.46, -ry - r * 0.44, -r * 0.65, -r * 0.65 - ry);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-r * 0.65, -r * 0.65 - ry, r * 0.155, 0, Math.PI * 2);
  ctx.fillStyle = '#1a1a1a';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(r * 0.20, -ry + r * 0.1);
  ctx.quadraticCurveTo(r * 0.46, -ry - r * 0.44, r * 0.65, -r * 0.65 - ry);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(r * 0.65, -r * 0.65 - ry, r * 0.155, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ── Hornet Missile (stinger projectile) ──────────────────────────────────────
// mobR  = the firing hornet's radius (world-scaled) — proportions match the stinger exactly.
// angle = direction of travel (atan2(vy, vx)).
// Tip is at (x,y); body trails behind in the opposite direction.
export function drawMissile(ctx, x, y, mobR, angle) {
  ctx.save();
  ctx.translate(x, y);
  // After rotation: local -y = travel direction (tip at origin, pointing forward)
  ctx.rotate(angle + Math.PI / 2);

  // Exact match to drawHornet stinger: hw = mobR*0.38, length = mobR*0.90
  const halfW = mobR * 0.38;
  const len   = mobR * 0.90;

  // Outer border/glow — curved with rounded tip
  const tipRadius = halfW * 0.15;  // rounded cap size
  ctx.fillStyle = '#3a2800';
  ctx.beginPath();
  ctx.moveTo(-halfW * 1.18, len * 1.06);
  ctx.quadraticCurveTo(-halfW * 0.45, len * 0.5, -halfW * 0.06, tipRadius);
  ctx.quadraticCurveTo(0, -tipRadius * 0.5, halfW * 0.06, tipRadius);  // rounded cap
  ctx.quadraticCurveTo( halfW * 0.45, len * 0.5, halfW * 1.18, len * 1.06);
  ctx.closePath();
  ctx.fill();

  // Main stinger body — curved, rounded tip at (0,0), base trails at (0, +len)
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.moveTo(-halfW, len);
  ctx.quadraticCurveTo(-halfW * 0.38, len * 0.5, -halfW * 0.04, tipRadius * 0.8);
  ctx.quadraticCurveTo(0, -tipRadius * 0.3, halfW * 0.04, tipRadius * 0.8);  // rounded cap
  ctx.quadraticCurveTo( halfW * 0.38, len * 0.5, halfW, len);
  ctx.closePath();
  ctx.fill();

  // Subtle highlight
  ctx.fillStyle = 'rgba(255,215,60,0.28)';
  ctx.beginPath();
  ctx.moveTo(-halfW * 0.28, len * 0.88);
  ctx.lineTo( halfW * 0.28, len * 0.88);
  ctx.lineTo(0, len * 0.10);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// ── Ladybug ───────────────────────────────────────────────────────────────────
// Reference geometry (authored at shell radius 95, scaled by r/95 at draw time):
//   shell: circle r=95 centered at origin, with a notch cut from (-54,-78.16)
//          curving to (0,-53) to (54,-78.16) — endpoints sit exactly on the
//          r=95 circle so the arc math below is exact, not approximated.
//   head:  circle r=54 centered at (0,-54)
//   divider line: (0,-53) to (0,83)
// spots[] entries are normalized fractions: { nx, ny, nr } relative to r.
// Use makeLadybugSpots() to generate them once at spawn time.
export function makeLadybugSpots(count = 9, seed = Math.random()) {
  let s = seed * 0xffffffff | 0;
  const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
  const spots = [];
  const shellR = 95 / 95;      // 1.0 — normalized shell radius
  const headR  = 54 / 95;      // normalized head radius
  const headCY = -54 / 95;     // normalized head center y
  const notchHalfW = 54 / 95;  // normalized notch half-width at its widest (top)
  const notchTipY  = -53 / 95; // normalized notch lowest point

  // Rough point-in-notch test — keeps spot centers out of the cut region
  function inNotch(nx, ny) {
    if (ny > headCY + headR * 0.2) return false; // well below notch, skip check
    // Approximate the notch curve as a parabola between the two endpoints
    const t = Math.abs(nx) / notchHalfW; // 0 at center, 1 at edges
    const curveY = headCY + (notchTipY - headCY) * (1 - t * t);
    return ny < curveY + 0.03;
  }

  const maxTries = 500;
  for (let attempt = 0; attempt < maxTries && spots.length < count; attempt++) {
    const angle = rand() * Math.PI * 2;
    const dist  = (0.30 + rand() * 0.62) * shellR * 0.86;
    const nx    = Math.cos(angle) * dist;
    const ny    = Math.sin(angle) * dist + shellR * 0.10;
    const nr    = 0.11 + rand() * 0.075;

    // Spot (with radius) must stay fully inside the shell circle
    if (Math.sqrt(nx * nx + ny * ny) + nr > shellR * 0.97) continue;
    // Keep off the head circle entirely
    if (Math.sqrt(nx * nx + (ny - headCY) ** 2) < headR + nr + 0.05) continue;
    // Keep clear of the notch cutout
    if (inNotch(nx, ny) || inNotch(nx - nr, ny) || inNotch(nx + nr, ny)) continue;
    // Space spots out — minimum gap between edges
    if (spots.some(o => Math.sqrt((o.nx - nx) ** 2 + (o.ny - ny) ** 2) < o.nr + nr + 0.09)) continue;

    spots.push({ nx, ny, nr });
  }
  return spots;
}

export function drawLadybug(ctx, x, y, r, facing = 0, spots = []) {
  const s = r / 95; // scale factor from reference geometry to actual radius
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing + Math.PI / 2);
  ctx.scale(s, s);

  // Antennae — drawn first, behind the head/shell
  ctx.strokeStyle = '#0d0d0d';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-12, -100);
  ctx.quadraticCurveTo(-18, -125, -36, -142);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-36, -142, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#0d0d0d';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(12, -100);
  ctx.quadraticCurveTo(18, -125, 36, -142);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(36, -142, 8, 0, Math.PI * 2);
  ctx.fill();

  // Head — black circle behind the shell, top edge aligned with shell top
  ctx.beginPath();
  ctx.arc(0, -54, 54, 0, Math.PI * 2);
  ctx.fillStyle = '#0d0d0d';
  ctx.fill();

  // Shell path — circle with a notch cut into the top, defined as one outline.
  // Notch endpoints (±54, -78.16) sit exactly on the r=95 circle so the arc
  // sweep below meets them with no gap or overlap.
  function shellPath() {
    ctx.beginPath();
    ctx.moveTo(-54, -78.16);
    ctx.quadraticCurveTo(0, -53, 54, -78.16);
    ctx.arc(0, 0, 95, -0.9662108847210533, Math.PI + 0.9662108847210533, false);
    ctx.closePath();
  }

  // Shell fill
  shellPath();
  ctx.fillStyle = '#c30000';
  ctx.fill();

  // Spots — clipped to the shell shape so none stick out past its edge
  // or over the notch/head. Drawn before the divider line and outline so
  // the linework sits on top of the dots.
  if (spots.length) {
    ctx.save();
    shellPath();
    ctx.clip();
    ctx.fillStyle = '#0d0d0d';
    for (const sp of spots) {
      if (sp.nx == null) continue; // skip malformed / old-format spots
      ctx.beginPath();
      ctx.arc(sp.nx * 95, sp.ny * 95, sp.nr * 95, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Shell outline — drawn after spots so it sits on top of them
  shellPath();
  ctx.strokeStyle = '#7a0000';
  ctx.lineWidth = 9;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Center divider line — drawn last so it sits on top of spots and outline
  ctx.beginPath();
  ctx.moveTo(0, -53);
  ctx.lineTo(0, 83);
  ctx.strokeStyle = '#7a0000';
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.restore();
}

// ── Centipede ─────────────────────────────────────────────────────────────────
// Two typeIds: 'centipede_head' and 'centipede_body'
// mob.legPhase increments each frame, mob.segIndex is the segment's position index.
export function drawCentipedeBody(ctx, x, y, r, facing = 0, legPhase = 0, segIndex = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing);

  const legR    = r * 0.32;
  const legDist = r * 1.08;
  const offsets = [-0.48, 0.48];

  // 2 feet each side, drawn behind body
  [-1, 1].forEach(side => {
    offsets.forEach((off, i) => {
      const baseAngle = side > 0 ? Math.PI / 2 : -Math.PI / 2;
      const nudge = Math.sin(legPhase + segIndex * 0.9 + i * 1.6 + (side > 0 ? Math.PI : 0)) * 0.13;
      const a  = baseAngle + off + nudge;
      const lx = Math.cos(a) * legDist;
      const ly = Math.sin(a) * legDist;
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.arc(lx, ly, legR, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  // Body border
  ctx.fillStyle = '#3a6b1a';
  ctx.beginPath();
  ctx.arc(0, 0, r + r * 0.14, 0, Math.PI * 2);
  ctx.fill();
  // Body fill
  ctx.fillStyle = '#7ed62a';
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawCentipedeHead(ctx, x, y, r, facing = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing);

  // Body border + fill — no feet
  ctx.fillStyle = '#3a6b1a';
  ctx.beginPath();
  ctx.arc(0, 0, r + r * 0.14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#7ed62a';
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  // Ram horns — base on front of head (+x = forward), sweep out and curve back
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineCap = 'round';
  [-1, 1].forEach(side => {
    const bx =  r * 0.72;
    const by =  side * r * 0.32;
    ctx.lineWidth = r * 0.28;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.bezierCurveTo(
      bx + r * 0.55,  by + side * r * 0.60,
      bx + r * 0.20,  by + side * r * 1.10,
      bx - r * 0.30,  by + side * r * 1.05
    );
    ctx.stroke();
  });

  ctx.restore();
}

// ── Ant helpers (internal) ────────────────────────────────────────────────────

function antCircle(ctx, cx, cy, r, fill, strokeCol, sw) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (strokeCol) {
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth   = sw;
    ctx.stroke();
  }
}

function antMandibles(ctx, headY, headR, pincerPhase = 0, color = '#1a1a1a') {
  const hR = headR * 0.82;
  ctx.strokeStyle = color;
  ctx.lineWidth   = headR * 0.32;
  ctx.lineCap     = 'round';
  [-1, 1].forEach(side => {
    ctx.save();
    ctx.translate(side * hR * 0.39, headY - hR * 0.66);
    // Jittery chatter: high frequency, small amplitude
    ctx.rotate(side * (-0.23 + Math.sin(pincerPhase * 4.5) * 0.045));
    ctx.beginPath();
    ctx.moveTo(0,  hR * 0.18);
    ctx.lineTo(0, -hR * 0.62);
    ctx.stroke();
    ctx.restore();
  });
}

function antAntennae(ctx, headY, headR, color = '#1a1a1a') {
  const hR      = headR * 0.82;
  const SPREAD  =  1.02;
  const CURLX   = -0.05;
  const CURLY   =  0.18;
  ctx.strokeStyle = color;
  ctx.lineWidth   = headR * 0.09;
  ctx.lineCap     = 'round';
  [-1, 1].forEach(side => {
    const bx   = side * hR * 0.35;
    const by   = headY - hR * 0.55;
    const mc1x = side * hR * SPREAD * 0.9;
    const mc1y = headY - hR * 1.1;
    const tx   = side * hR * SPREAD;
    const ty   = headY - hR * 1.3;
    const cx2  = side * hR * (SPREAD + CURLX);
    const cy2  = headY - hR * (1.3 + CURLY);
    const ex   = side * hR * (SPREAD + CURLX * 0.5);
    const ey   = headY - hR * (1.3 + CURLY * 1.4);
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(mc1x, mc1y, tx, ty);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.quadraticCurveTo(cx2, cy2, ex, ey);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(ex, ey, headR * 0.10, 0, Math.PI * 2);
    ctx.fill();
  });
}

// ── Soldier Ant ───────────────────────────────────────────────────────────────
export let soldierAntOffsetX = 0;    // visual aligned with hitbox
export let soldierAntSizeScale = 1;   // tuned size scale
export function setSoldierAntOffsetX(v) { soldierAntOffsetX = v; }
export function setSoldierAntSizeScale(v) { soldierAntSizeScale = v; }

export function drawSoldierAnt(ctx, x, y, r, facing = 0, pincerPhase = 0, wingPhase = 0, friendly = false) {
  // Head and body centered so the hitbox circle (centered at x,y) covers both.
  // hY negative = head forward, bYo positive = body back.
  // Midpoint of head-center and body-center should be ~0 for best hitbox fit.
  const hR  = r * 0.82;
  const hY  = -r * 0.50;   // was -r*0.71 — shifted toward center
  const bR  = r * 0.60;
  const bYo =  r * 0.32;   // was r*0.10 — shifted to keep midpoint ~0

  // Friendly pets use the same colour palette as the player
  const outerColor  = friendly ? PLAYER_BORDER  : '#3d3d3d';
  const outerBorder = friendly ? '#a88800'       : '#1a1a1a';  // slightly darker than PLAYER_BORDER
  const innerColor  = friendly ? PLAYER_COLOR    : '#606060';

  ctx.save();
  ctx.translate(x + soldierAntOffsetX, y);
  ctx.scale(soldierAntSizeScale, soldierAntSizeScale);
  ctx.rotate(facing + Math.PI / 2);

  antMandibles(ctx, hY, r, pincerPhase, outerColor, outerBorder);

  // Body
  antCircle(ctx, 0, bYo, bR, outerColor, outerBorder, r * 0.18);
  antCircle(ctx, 0, bYo, bR * 0.62, innerColor, null, 0);

  // Wings — rotate from attachment point on body sides for natural flapping
  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = friendly ? '#ffe090' : '#c0c0c0';
  [-1, 1].forEach(side => {
    const flapAngle = -side * (0.21 + Math.sin(wingPhase) * 0.15);
    ctx.save();
    ctx.translate(side * bR * 0.43, r * 0.06);
    ctx.rotate(flapAngle);
    ctx.beginPath();
    ctx.ellipse(0, r * 0.3, r * 0.22, r * 0.46, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();

  // Head
  antCircle(ctx, 0, hY, hR, outerColor, outerBorder, r * 0.18);
  antCircle(ctx, 0, hY, hR * 0.62, innerColor, null, 0);

  antAntennae(ctx, hY, r, outerColor);

  ctx.restore();
}

// ── Worker Ant ────────────────────────────────────────────────────────────────
// Same as soldier ant but without wings.
export function drawWorkerAnt(ctx, x, y, r, facing = 0, pincerPhase = 0) {
  const hR  = r * 0.82;
  const hY  = -r * 0.71;
  const bR  = r * 0.60;
  const bYo = r * 0.10;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing + Math.PI / 2);

  antMandibles(ctx, hY, r, pincerPhase);

  // Body
  antCircle(ctx, 0, bYo, bR, '#3d3d3d', '#1a1a1a', r * 0.18);
  antCircle(ctx, 0, bYo, bR * 0.62, '#606060', null, 0);

  // Head
  antCircle(ctx, 0, hY, hR, '#3d3d3d', '#1a1a1a', r * 0.18);
  antCircle(ctx, 0, hY, hR * 0.62, '#606060', null, 0);

  antAntennae(ctx, hY, r);

  ctx.restore();
}

// ── Baby Ant ──────────────────────────────────────────────────────────────────
// Head and mandibles only — centered at origin so hitbox matches.
export function drawBabyAnt(ctx, x, y, r, facing = 0, pincerPhase = 0) {
  const hR = r * 0.82;
  const hY = 0; // centered at origin so hitbox aligns

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing + Math.PI / 2);

  antMandibles(ctx, hY, r, pincerPhase);

  // Head — solid, no inner highlight
  antCircle(ctx, 0, hY, hR, '#3d3d3d', '#1a1a1a', r * 0.18);

  ctx.restore();
}

// ── Queen Ant ─────────────────────────────────────────────────────────────────
// Three body segments (head, thorax, abdomen), wings between head and thorax.
// Values locked from editor: wingAttachX=-0.11, wingAttachY=-0.90, wingH=126 (base r=72).
export function drawQueenAnt(ctx, x, y, r, facing = 0, pincerPhase = 0, wingPhase = 0) {
  const scale = r / 72;
  const headY = -48 * scale;
  const headR =  43 * scale;
  const bodyY =   1 * scale;
  const bodyR =  53 * scale;
  const abdY  =  50 * scale;
  const abdR  =  63 * scale;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing + Math.PI / 2);

  // Abdomen (back, drawn first)
  antCircle(ctx, 0, abdY, abdR, '#3d3d3d', '#1a1a1a', 11 * scale);
  antCircle(ctx, 0, abdY, abdR * 0.64, '#606060', null, 0);

  // Thorax / body
  antCircle(ctx, 0, bodyY, bodyR, '#3d3d3d', '#1a1a1a', 11 * scale);
  antCircle(ctx, 0, bodyY, bodyR * 0.58, '#606060', null, 0);

  // Wings — attach at thorax sides, hang downward from root, subtle flap
  ctx.save();
  ctx.globalAlpha = 0.39;
  ctx.fillStyle = '#c0c0c0';
  [-1, 1].forEach(side => {
    const flapAngle = -side * (-0.35 + Math.sin(wingPhase) * 0.07);
    ctx.save();
    ctx.translate(side * bodyR * -0.11, bodyR * -0.90);
    ctx.rotate(flapAngle);
    const wingFullW = 55 * scale;
    const wingFullH = 126 * scale;
    const wingTaper = 0.73;
    ctx.beginPath();
    ctx.ellipse(0, wingFullH / 2, (wingFullW / 2) * wingTaper, wingFullH / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();

  // Mandibles — jittery chatter: high frequency, tiny amplitude
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth   = 13 * scale;
  ctx.lineCap     = 'round';
  [-1, 1].forEach(side => {
    ctx.save();
    ctx.translate(side * 15 * scale, -82 * scale);
    ctx.rotate(side * (-13.2 * Math.PI / 180 + Math.sin(pincerPhase * 4.5) * 0.045));
    ctx.beginPath();
    ctx.moveTo(0,  8 * scale);
    ctx.lineTo(0, -28 * scale);
    ctx.stroke();
    ctx.restore();
  });

  // Head — on top of wings
  antCircle(ctx, 0, headY, headR, '#3d3d3d', '#1a1a1a', 11 * scale);
  antCircle(ctx, 0, headY, headR * 0.63, '#606060', null, 0);

  // Antennae
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth   = 5 * scale;
  ctx.lineCap     = 'round';
  [-1, 1].forEach(side => {
    ctx.beginPath();
    ctx.moveTo(side * 14 * scale, -72 * scale);
    ctx.quadraticCurveTo(side * 38 * scale, -95 * scale, side * 44 * scale, -110 * scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(side * 44 * scale, -110 * scale);
    ctx.quadraticCurveTo(side * 42 * scale, -120 * scale, side * 38 * scale, -126 * scale);
    ctx.stroke();
    antCircle(ctx, side * 38 * scale, -126 * scale, 5 * scale, '#1a1a1a', null, 0);
  });

  ctx.restore();
}

// ── Ant Egg ───────────────────────────────────────────────────────────────────
// Simple white circle with the ant double-circle style. No facing needed.
export function drawAntEgg(ctx, x, y, r) {
  antCircle(ctx, x, y, r,        '#e8e8e8', '#1a1a1a', r * 0.16);
  antCircle(ctx, x, y, r * 0.65, '#ffffff', null, 0);
}

// ── Ant Hole ──────────────────────────────────────────────────────────────────
// Three concentric brown rings, darkening toward the centre. No facing needed.
export function drawAntHole(ctx, x, y, r) {
  antCircle(ctx, x, y, r,        '#b8750a', null, 0);
  antCircle(ctx, x, y, r * 0.68, '#7a4d08', null, 0);
  antCircle(ctx, x, y, r * 0.38, '#3d2500', null, 0);
}

// ── Fire Ant helpers ──────────────────────────────────────────────────────────
// Fire ants share the same geometry as normal ants but use red colour palette.
// Outer body: #8b1a00  Border: #5a0d00  Inner highlight: #c0392b
// Wings and antennae stay the same as normal ants (grey wings, dark antennae).
const FA_OUTER  = '#8b1a00';
const FA_BORDER = '#5a0d00';
const FA_INNER  = '#c0392b';

// ── Fire Soldier Ant ──────────────────────────────────────────────────────────
export function drawFireSoldierAnt(ctx, x, y, r, facing = 0, pincerPhase = 0, wingPhase = 0) {
  const hR  = r * 0.82;
  const hY  = -r * 0.50;
  const bR  = r * 0.60;
  const bYo =  r * 0.32;

  ctx.save();
  ctx.translate(x + soldierAntOffsetX, y);
  ctx.scale(soldierAntSizeScale, soldierAntSizeScale);
  ctx.rotate(facing + Math.PI / 2);

  antMandibles(ctx, hY, r, pincerPhase, FA_BORDER);

  // Body
  antCircle(ctx, 0, bYo, bR, FA_OUTER, FA_BORDER, r * 0.18);
  antCircle(ctx, 0, bYo, bR * 0.62, FA_INNER, null, 0);

  // Wings — same grey as normal ant
  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = '#c0c0c0';
  [-1, 1].forEach(side => {
    const flapAngle = -side * (0.21 + Math.sin(wingPhase) * 0.15);
    ctx.save();
    ctx.translate(side * bR * 0.43, r * 0.06);
    ctx.rotate(flapAngle);
    ctx.beginPath();
    ctx.ellipse(0, r * 0.3, r * 0.22, r * 0.46, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();

  // Head
  antCircle(ctx, 0, hY, hR, FA_OUTER, FA_BORDER, r * 0.18);
  antCircle(ctx, 0, hY, hR * 0.62, FA_INNER, null, 0);

  antAntennae(ctx, hY, r); // keep default dark antennae

  ctx.restore();
}

// ── Fire Worker Ant ───────────────────────────────────────────────────────────
export function drawFireWorkerAnt(ctx, x, y, r, facing = 0, pincerPhase = 0) {
  const hR  = r * 0.82;
  const hY  = -r * 0.71;
  const bR  = r * 0.60;
  const bYo = r * 0.10;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing + Math.PI / 2);

  antMandibles(ctx, hY, r, pincerPhase, FA_BORDER);

  // Body
  antCircle(ctx, 0, bYo, bR, FA_OUTER, FA_BORDER, r * 0.18);
  antCircle(ctx, 0, bYo, bR * 0.62, FA_INNER, null, 0);

  // Head
  antCircle(ctx, 0, hY, hR, FA_OUTER, FA_BORDER, r * 0.18);
  antCircle(ctx, 0, hY, hR * 0.62, FA_INNER, null, 0);

  antAntennae(ctx, hY, r);

  ctx.restore();
}

// ── Fire Queen Ant ────────────────────────────────────────────────────────────
export function drawFireQueenAnt(ctx, x, y, r, facing = 0, pincerPhase = 0, wingPhase = 0) {
  const scale  = r / 72;
  const headY  = -48 * scale;
  const headR  =  43 * scale;
  const bodyY  =   1 * scale;
  const bodyR  =  53 * scale;
  const abdY   =  50 * scale;
  const abdR   =  63 * scale;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing + Math.PI / 2);

  // Abdomen
  antCircle(ctx, 0, abdY, abdR, FA_OUTER, FA_BORDER, 11 * scale);
  antCircle(ctx, 0, abdY, abdR * 0.64, FA_INNER, null, 0);

  // Thorax
  antCircle(ctx, 0, bodyY, bodyR, FA_OUTER, FA_BORDER, 11 * scale);
  antCircle(ctx, 0, bodyY, bodyR * 0.58, FA_INNER, null, 0);

  // Wings — same grey as normal queen
  ctx.save();
  ctx.globalAlpha = 0.39;
  ctx.fillStyle = '#c0c0c0';
  [-1, 1].forEach(side => {
    const flapAngle = -side * (-0.35 + Math.sin(wingPhase) * 0.07);
    ctx.save();
    ctx.translate(side * bodyR * -0.11, bodyR * -0.90);
    ctx.rotate(flapAngle);
    const wingFullW = 55 * scale;
    const wingFullH = 126 * scale;
    const wingTaper = 0.73;
    ctx.beginPath();
    ctx.ellipse(0, wingFullH / 2, (wingFullW / 2) * wingTaper, wingFullH / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();

  // Mandibles
  ctx.strokeStyle = FA_BORDER;
  ctx.lineWidth   = 13 * scale;
  ctx.lineCap     = 'round';
  [-1, 1].forEach(side => {
    ctx.save();
    ctx.translate(side * 15 * scale, -82 * scale);
    ctx.rotate(side * (-13.2 * Math.PI / 180 + Math.sin(pincerPhase * 4.5) * 0.045));
    ctx.beginPath();
    ctx.moveTo(0,  8 * scale);
    ctx.lineTo(0, -28 * scale);
    ctx.stroke();
    ctx.restore();
  });

  // Head
  antCircle(ctx, 0, headY, headR, FA_OUTER, FA_BORDER, 11 * scale);
  antCircle(ctx, 0, headY, headR * 0.63, FA_INNER, null, 0);

  // Antennae — same dark colour as normal queen
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth   = 5 * scale;
  ctx.lineCap     = 'round';
  [-1, 1].forEach(side => {
    ctx.beginPath();
    ctx.moveTo(side * 14 * scale, -72 * scale);
    ctx.quadraticCurveTo(side * 38 * scale, -95 * scale, side * 44 * scale, -110 * scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(side * 44 * scale, -110 * scale);
    ctx.quadraticCurveTo(side * 42 * scale, -120 * scale, side * 38 * scale, -126 * scale);
    ctx.stroke();
    antCircle(ctx, side * 38 * scale, -126 * scale, 5 * scale, '#1a1a1a', null, 0);
  });

  ctx.restore();
}

// ── Fire Ant Egg ──────────────────────────────────────────────────────────────
// Red/dark-red egg, slightly pulsing in appearance.
export function drawFireAntEgg(ctx, x, y, r) {
  antCircle(ctx, x, y, r,        '#c0392b', '#5a0d00', r * 0.16);
  antCircle(ctx, x, y, r * 0.65, '#e05540', null, 0);
}

// ── Fire Ant Hole ─────────────────────────────────────────────────────────────
// Three concentric dark-red rings.
export function drawFireAntHole(ctx, x, y, r) {
  antCircle(ctx, x, y, r,        '#7a1f00', null, 0);
  antCircle(ctx, x, y, r * 0.68, '#4d1200', null, 0);
  antCircle(ctx, x, y, r * 0.38, '#200800', null, 0);
}


// Circular body with rotating cutter ring and expressive face
export function drawDigger(ctx, x, y, r, state = 'neutral', cutterRot = 0, eyeAngle = 0, mob = null) {
  ctx.save();
  ctx.translate(x, y);

  // Digger is 15% bigger
  r = r * 1.15;

  const ringR = r * 1.42;
  const toothCount = 14;
  const toothH = r * 0.26;
  const toothHW = (2 * Math.PI * ringR / toothCount) * 0.38;

  // === CUTTER (draw FIRST so it's UNDER the ring) ===
  ctx.save();
  ctx.rotate(cutterRot);

  ctx.fillStyle = '#111';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = Math.max(0.5, r * 0.02);

  for (let i = 0; i < toothCount; i++) {
    const a = (i / toothCount) * Math.PI * 2;
    ctx.save();
    ctx.rotate(a);

    ctx.beginPath();
    ctx.moveTo(-toothHW, -ringR);
    ctx.lineTo(toothHW, -ringR);
    ctx.lineTo(0, -(ringR + toothH));
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  ctx.restore();

  // === RING (draw AFTER so it sits on top of triangles) ===
  ctx.beginPath();
  ctx.arc(0, 0, ringR, 0, Math.PI * 2);
  ctx.arc(0, 0, ringR - r * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = '#111';
  ctx.fill('evenodd');
  // Draw a crisp black ring outline to hide any seam between triangles and body
  ctx.strokeStyle = '#000';
  ctx.lineWidth = Math.max(1, r * 0.06);
  ctx.stroke();

  // === BODY (extended to reach cutter) ===
  const bodyR = ringR - r * 0.22; // Body reaches exactly to inner edge of ring
  ctx.beginPath();
  ctx.arc(0, 0, bodyR, 0, Math.PI * 2);
  ctx.fillStyle = mob?.bodyColor ?? '#8c8c8c';
  // Fill body only (remove thick stroke to avoid gray outline/gap)
  ctx.fill();

  // === FACE ===
  // Use bodyR as the face reference radius so features scale with the visible
  // body circle, not the outer cutter ring (r). This also means the face never
  // changes size when the camera zooms because bodyR is already zoom-scaled.
  const faceR = bodyR;

  // Eye parameters — mirror player's drawFlowerFace proportions exactly
  const eyeOffsetX = faceR * 0.285;
  const eyeOffsetY = faceR * 0.21;   // eyes sit ABOVE centre (negative Y in canvas)
  const eyeRx      = faceR * 0.128;
  const eyeRy      = faceR * 0.249;
  const pupilR     = faceR * 0.124;
  const pupilDrift = faceR * 0.09;

  // Smooth animated pupil offset supplied by the mob update loop.
  // Values are stored in world units (proportional to mob.drawRadius), so we
  // must scale by zoom (r / drawRadius) to get correct screen-space offsets.
  const zoom      = (mob?.drawRadius && mob.drawRadius > 0) ? r / mob.drawRadius : 1;
  const animPdx      = (mob?.animPdx      ?? 0)             * zoom;
  const animPdy      = (mob?.animPdy      ?? 0)             * zoom;
  const animCpOffset = (mob?.animCpOffset != null ? mob.animCpOffset : faceR * 0.14) * zoom;

  // Eyes are above the body centre (negative Y) to match the player face
  const eyes = [
    { cx: -eyeOffsetX, cy: -eyeOffsetY },
    { cx:  eyeOffsetX, cy: -eyeOffsetY },
  ];

  // Draw eyes with smooth pupil movement
  for (const eye of eyes) {
    // Dark iris
    ctx.fillStyle = '#212219';
    ctx.beginPath();
    ctx.ellipse(eye.cx, eye.cy, eyeRx, eyeRy, 0, 0, Math.PI * 2);
    ctx.fill();

    // White pupil clipped inside iris
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(eye.cx, eye.cy, eyeRx, eyeRy, 0, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = '#eeeeee';
    ctx.beginPath();
    ctx.arc(eye.cx + animPdx, eye.cy + animPdy, pupilR, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Animated mouth — control point driven by mob.animCpOffset (set by update loop)
  const mouthY  =  faceR * 0.38;   // below centre
  const mouthHW =  faceR * 0.25;
  const cpY     =  mouthY + animCpOffset;

  ctx.strokeStyle = '#212219';
  ctx.lineWidth   = faceR / 15;
  ctx.lineCap     = 'round';
  ctx.beginPath();
  ctx.moveTo(-mouthHW, mouthY);
  ctx.quadraticCurveTo(0, cpY, mouthHW, mouthY);
  ctx.stroke();

  // === EYEBROWS (single downward-pointing triangle for angry look) ===
  // browT is smoothly animated 0→1 by the mob update loop (see mobs.js).
  // Fallback for HUD icon (mob=null): instant on/off based on state string.
  const browColor = mob?.bodyColor ?? '#8c8c8c';
  const browBaseY = -eyeOffsetY - eyeRy + faceR * 0.10;
  const browT     = (mob?.browT != null) ? mob.browT : (state === 'angry' ? 1 : 0);

  if (browT > 0.01) {
    // Slide down from faceR*0.22 above browBaseY → browBaseY as browT goes 0→1.
    // When fully down (browT=1), eyebrow covers the top of the eyes for angry expression.
    // Alpha also fades in simultaneously for a smooth appearance.
    const slideOffset = (1 - browT) * faceR * 0.22;
    const browY = browBaseY - slideOffset;

    ctx.save();
    ctx.globalAlpha = browT;
    ctx.fillStyle = browColor;

    // Single downward-pointing triangle in the middle
    const browW = faceR * 0.45;
    const browH = faceR * 0.18;
    ctx.beginPath();
    ctx.moveTo(-browW, browY - browH);      // left top
    ctx.lineTo(browW, browY - browH);       // right top
    ctx.lineTo(0, browY + browH);           // point down
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  ctx.restore();
}

// ── Beekeeper ─────────────────────────────────────────────────────────────────
// Round body with a rotating black saw cutter ring and expressive face.
// cutterRot = current rotation angle of the cutter (radians), updated each frame.
// Mouth animates from circle (neutral) to frown (angry) based on browT.
export function drawBeekeeper(ctx, x, y, r, state = 'neutral', cutterRot = 0, eyeAngle = 0, mob = null) {
  ctx.save();
  ctx.translate(x, y);

  const ringR      = r * 1.38;
  const ringThick  = r * 0.20;
  const bodyR      = ringR - ringThick;
  const toothCount = 14;
  const toothH     = r * 0.18;
  const toothHW    = (2 * Math.PI * ringR / toothCount) * 0.48;

  ctx.save();
  ctx.rotate(cutterRot);

  // Ring band as annulus (outer circle minus inner hole) — full black
  ctx.beginPath();
  ctx.arc(0, 0, ringR, 0, Math.PI * 2, false);
  ctx.arc(0, 0, bodyR, 0, Math.PI * 2, true);
  ctx.fillStyle = '#000';
  ctx.fill('evenodd');

  // Teeth — base overlaps ring by 2px to eliminate any gap
  for (let i = 0; i < toothCount; i++) {
    const a = (i / toothCount) * Math.PI * 2;
    ctx.save();
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(-toothHW, -(ringR - ringThick * 0.12));
    ctx.lineTo( toothHW, -(ringR - ringThick * 0.12));
    ctx.lineTo(0, -(ringR + toothH));
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();

  // Body fill
  ctx.beginPath();
  ctx.arc(0, 0, bodyR, 0, Math.PI * 2);
  ctx.fillStyle = '#F0A830';
  ctx.fill();

  // Body outline inset so it doesn't bleed into cutter ring
  ctx.beginPath();
  ctx.arc(0, 0, bodyR - r * 0.035, 0, Math.PI * 2);
  ctx.strokeStyle = '#A86820';
  ctx.lineWidth = r * 0.07;
  ctx.stroke();

  // Face
  const faceR    = bodyR;

  // Eye parameters — larger oval eyes for better visibility
  const eyeOffX  = faceR * 0.32;
  const eyeOffY  = faceR * 0.30;
  const eyeRx    = faceR * 0.30;
  const eyeRy    = faceR * 0.42;
  const pupilRx  = faceR * 0.12;
  const pupilRy  = faceR * 0.16;
  const mouthY   = faceR * 0.47;
  const mouthR   = faceR * 0.08;

  // Smooth animated pupil offsets (set by mobs.js AI loop, world units → screen)
  const zoom_    = (mob?.drawRadius && mob.drawRadius > 0) ? bodyR / mob.drawRadius : 1;
  const animPdx  = (mob?.animPdx ?? 0) * zoom_;
  const animPdy  = (mob?.animPdy ?? 0) * zoom_;

  const eyes = [
    { cx: -eyeOffX, cy: -eyeOffY },
    { cx:  eyeOffX, cy: -eyeOffY },
  ];

  for (const eye of eyes) {
    // Dark iris oval
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.ellipse(eye.cx, eye.cy, eyeRx, eyeRy, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ellipse pupil clipped inside iris (can drift to the edge)
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(eye.cx, eye.cy, eyeRx, eyeRy, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(eye.cx + animPdx, eye.cy + animPdy, pupilRx, pupilRy, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Mouth animation — dot fades OUT first, then frown fades IN
  // browT: 0 = neutral, 1 = fully angry (driven by mobs.js)
  const browT = (mob?.browT != null) ? mob.browT : (state === 'angry' ? 1 : 0);

  // Phase split: dot gone by browT=0.45, frown fully in by browT=1.0
  const dotAlpha   = Math.max(0, 1 - browT / 0.45);
  const frownAlpha = Math.max(0, (browT - 0.45) / 0.55);

  if (dotAlpha > 0) {
    ctx.save();
    ctx.globalAlpha = dotAlpha;
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(0, mouthY, mouthR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  if (frownAlpha > 0) {
    const mouthHW  = faceR * 0.25;
    const cpOffset = -faceR * 0.20 * frownAlpha;   // deepen frown as it appears
    ctx.save();
    ctx.globalAlpha = frownAlpha;
    ctx.strokeStyle = '#111';
    ctx.lineWidth   = faceR * 0.072;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(-mouthHW, mouthY);
    ctx.quadraticCurveTo(0, mouthY + cpOffset, mouthHW, mouthY);
    ctx.stroke();
    ctx.restore();
  }

  // ── Eyebrows — downward-pointing triangle, same colour as body (#F0A830)
  // Invisible when neutral (same colour = camouflaged), slides in when angry.
  // browT drives both the slide-down and the alpha so they appear together.
  if (browT > 0.01) {
    const browBaseY  = -eyeOffY - eyeRy + faceR * 0.10;
    const slideOff   = (1 - browT) * faceR * 0.22;
    const browY      = browBaseY - slideOff;
    const browW      = faceR * 0.45;
    const browH      = faceR * 0.18;

    ctx.save();
    ctx.globalAlpha = browT;
    ctx.fillStyle   = '#F0A830';   // same as body — camouflaged but still casts shadow
    ctx.beginPath();
    ctx.moveTo(-browW, browY - browH);   // left top
    ctx.lineTo( browW, browY - browH);   // right top
    ctx.lineTo(0,      browY + browH);   // point down (angry V)
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();
}

// ── Beetle ────────────────────────────────────────────────────────────────────
export function drawBeetle(ctx, x, y, r, facing = 0, pincerPhase = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing + Math.PI / 2);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const bw = 0.92, bh = 1.20, br = 0.65;
  const ms = 0.59, ml = 1.18, mt = 0.36;
  const rx = r * bw, ry = r * bh;

  function qbez(p0, cp, p1, t) { const m=1-t; return m*m*p0+2*m*t*cp+t*t*p1; }

  // Pincer open amount: oscillates 0..1 (out then in), driven by pincerPhase
  const pincerOpen = (Math.sin(pincerPhase) * 0.5 + 0.5); // 0 = closed, 1 = fully open
  const pincerSpread = pincerOpen * r * 0.28; // max lateral spread in world units

  function drawMandible(side) {
    const rx0=side*r*0.15, ry0=-ry*0.75;
    const rx1=side*r*ms + side*pincerSpread, ry1=ry0-r*ml;
    const cpx=side*r*(ms*0.9+0.15) + side*pincerSpread*0.6, cpy=ry0-r*ml*0.25;
    const N=24, baseW=r*mt, tipW=r*mt*0.15, tipCapR=r*mt*0.28;
    const left=[], right=[];
    for (let i=0;i<=N;i++) {
      const t=i/N;
      const px=qbez(rx0,cpx,rx1,t), py=qbez(ry0,cpy,ry1,t);
      const t2=Math.min(t+0.01,1), t0=Math.max(t-0.01,0);
      const tx=qbez(rx0,cpx,rx1,t2)-qbez(rx0,cpx,rx1,t0);
      const ty=qbez(ry0,cpy,ry1,t2)-qbez(ry0,cpy,ry1,t0);
      const tlen=Math.sqrt(tx*tx+ty*ty)||1;
      const nx=-ty/tlen, ny=tx/tlen;
      const w=baseW*(1-t)+tipW*t;
      left.push({x:px+nx*w,y:py+ny*w});
      right.push({x:px-nx*w,y:py-ny*w});
    }
    ctx.fillStyle='#1a1a1a';
    ctx.beginPath();
    ctx.moveTo(left[0].x,left[0].y);
    for (let i=1;i<=N;i++) ctx.lineTo(left[i].x,left[i].y);
    const tipX=qbez(rx0,cpx,rx1,1), tipY=qbez(ry0,cpy,ry1,1);
    const ttx=qbez(rx0,cpx,rx1,0.99), tty=qbez(ry0,cpy,ry1,0.99);
    const tang=Math.atan2(tipY-tty,tipX-ttx);
    ctx.arc(tipX,tipY,tipCapR,tang-Math.PI/2,tang+Math.PI/2,false);
    for (let i=N;i>=0;i--) ctx.lineTo(right[i].x,right[i].y);
    ctx.closePath();
    ctx.fill();
  }

  drawMandible(-1);
  drawMandible( 1);

  function roundedEllipse(erx, ery) {
    const k=br;
    ctx.beginPath();
    ctx.moveTo(0,-ery);
    ctx.bezierCurveTo( erx*k,-ery, erx,-ery*k, erx,0);
    ctx.bezierCurveTo( erx,ery*k, erx*k,ery, 0,ery);
    ctx.bezierCurveTo(-erx*k,ery,-erx,ery*k,-erx,0);
    ctx.bezierCurveTo(-erx,-ery*k,-erx*k,-ery,0,-ery);
    ctx.closePath();
  }

  ctx.fillStyle='#7D3C98';
  roundedEllipse(rx+r*0.11, ry+r*0.11);
  ctx.fill();

  ctx.fillStyle='#8E44AD';
  roundedEllipse(rx, ry);
  ctx.fill();

  // Speckle dots — 3 per side, mirrored across the center line
  const dotR=r*0.09;
  [{x:-r*0.35,  y:-r*0.50 },
   {x:-r*0.525, y: r*0.0375},
   {x:-r*0.4125,y: r*0.5625},
   {x: r*0.35,  y:-r*0.50 },
   {x: r*0.525, y: r*0.0375},
   {x: r*0.4125,y: r*0.5625}].forEach(d=>{
    ctx.fillStyle='#7D3C98';
    ctx.beginPath();
    ctx.arc(d.x,d.y,dotR,0,Math.PI*2);
    ctx.fill();
  });

  // Center divider line — gentle curve, offset slightly left of center
  ctx.strokeStyle='#7D3C98';
  ctx.lineWidth=r*0.1437;
  ctx.lineCap='round';
  ctx.beginPath();
  ctx.moveTo(-r*0.0375, -r*0.80);
  ctx.quadraticCurveTo(r*0.1375, 0, -r*0.0375, r*0.85);
  ctx.stroke();

  ctx.restore();
}

// ── Mummified Beetle ──────────────────────────────────────────────────────────
// Same silhouette and mandibles as the regular Beetle, but the body is
// filled entirely in bandage cream instead of purple, with 8 fixed diagonal
// texture lines (clipped to the body) suggesting wrapped fabric strips.
// Reference geometry matches drawBeetle (authored at r=80), scaled the same way.
export function drawMummifiedBeetle(ctx, x, y, r, facing = 0, pincerPhase = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing + Math.PI / 2);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const bw = 0.92, bh = 1.20, br = 0.65;
  const ms = 0.59, ml = 1.18, mt = 0.36;
  const rx = r * bw, ry = r * bh;

  function qbez(p0, cp, p1, t) { const m=1-t; return m*m*p0+2*m*t*cp+t*t*p1; }

  const pincerOpen = (Math.sin(pincerPhase) * 0.5 + 0.5);
  const pincerSpread = pincerOpen * r * 0.28;

  function drawMandible(side) {
    const rx0=side*r*0.15, ry0=-ry*0.75;
    const rx1=side*r*ms + side*pincerSpread, ry1=ry0-r*ml;
    const cpx=side*r*(ms*0.9+0.15) + side*pincerSpread*0.6, cpy=ry0-r*ml*0.25;
    const N=24, baseW=r*mt, tipW=r*mt*0.15, tipCapR=r*mt*0.28;
    const left=[], right=[];
    for (let i=0;i<=N;i++) {
      const t=i/N;
      const px=qbez(rx0,cpx,rx1,t), py=qbez(ry0,cpy,ry1,t);
      const t2=Math.min(t+0.01,1), t0=Math.max(t-0.01,0);
      const tx=qbez(rx0,cpx,rx1,t2)-qbez(rx0,cpx,rx1,t0);
      const ty=qbez(ry0,cpy,ry1,t2)-qbez(ry0,cpy,ry1,t0);
      const tlen=Math.sqrt(tx*tx+ty*ty)||1;
      const nx=-ty/tlen, ny=tx/tlen;
      const w=baseW*(1-t)+tipW*t;
      left.push({x:px+nx*w,y:py+ny*w});
      right.push({x:px-nx*w,y:py-ny*w});
    }
    ctx.fillStyle='#1a1a1a';
    ctx.beginPath();
    ctx.moveTo(left[0].x,left[0].y);
    for (let i=1;i<=N;i++) ctx.lineTo(left[i].x,left[i].y);
    const tipX=qbez(rx0,cpx,rx1,1), tipY=qbez(ry0,cpy,ry1,1);
    const ttx=qbez(rx0,cpx,rx1,0.99), tty=qbez(ry0,cpy,ry1,0.99);
    const tang=Math.atan2(tipY-tty,tipX-ttx);
    ctx.arc(tipX,tipY,tipCapR,tang-Math.PI/2,tang+Math.PI/2,false);
    for (let i=N;i>=0;i--) ctx.lineTo(right[i].x,right[i].y);
    ctx.closePath();
    ctx.fill();
  }

  drawMandible(-1);
  drawMandible( 1);

  function roundedEllipsePath(erx, ery) {
    const k=br;
    ctx.beginPath();
    ctx.moveTo(0,-ery);
    ctx.bezierCurveTo( erx*k,-ery, erx,-ery*k, erx,0);
    ctx.bezierCurveTo( erx,ery*k, erx*k,ery, 0,ery);
    ctx.bezierCurveTo(-erx*k,ery,-erx,ery*k,-erx,0);
    ctx.bezierCurveTo(-erx,-ery*k,-erx*k,-ery,0,-ery);
    ctx.closePath();
  }

  // Outer border ring and inner body, both bandage-cream toned
  ctx.fillStyle='#c9b98a';
  roundedEllipsePath(rx+r*0.11, ry+r*0.11);
  ctx.fill();

  ctx.fillStyle='#e8dcc0';
  roundedEllipsePath(rx, ry);
  ctx.fill();

  // Texture lines — 8 fixed diagonal strips clipped to the body, giving a
  // wrapped-bandage look. Endpoints below are pre-computed at r=80 from
  // (x, y, rotation, length) values, then scaled by r/80 like everything else.
  const S = r / 80;
  ctx.save();
  roundedEllipsePath(rx, ry);
  ctx.clip();
  ctx.strokeStyle = '#b5a476';
  ctx.globalAlpha = 0.7;
  const textureLines = [
    { x1: -89.0, y1: 14.0,   x2: 17.0,  y2: 120.0, w: 8   },
    { x1: -75.0, y1: -15.0,  x2: 31.0,  y2: 91.0,  w: 8   },
    { x1: -51.0, y1: -48.0,  x2: 55.0,  y2: 58.0,  w: 8   },
    { x1: -66.4, y1: -128.4, x2: 216.4, y2: 154.4, w: 8.5 },
    { x1: 108.0, y1: -226.6, x2: -104.0,y2: 112.6, w: 8   },
    { x1: 111.0, y1: -113.6, x2: -101.0,y2: 225.6, w: 8   },
    { x1: 20.7,  y1: -189.0, x2: -48.7, y2: 205.0, w: 8   },
    { x1: 60.0,  y1: -150.9, x2: -30.0, y2: 238.9, w: 8   },
  ];
  textureLines.forEach(ln => {
    ctx.beginPath();
    ctx.moveTo(ln.x1 * S, ln.y1 * S);
    ctx.lineTo(ln.x2 * S, ln.y2 * S);
    ctx.lineWidth = ln.w * S;
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
  ctx.restore();

  // Outer border stroke on top
  roundedEllipsePath(rx, ry);
  ctx.strokeStyle = '#9e8b5e';
  ctx.lineWidth = r * 0.1;
  ctx.stroke();

  ctx.restore();
}

// ── Scorpion ──────────────────────────────────────────────────────────────────
// Reference geometry authored at body max-reach 115 units, scaled by r/115.
// Layer order (back to front): legs, mandibles (behind body), body + detail
// curves, tail segment + tail curves, stinger (drawn on top of everything).
export function drawScorpion(ctx, x, y, r, facing = 0, legPhase = 0, pincerPhase = 0) {
  const s = r / 115;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing);
  // Mirror the whole body across the vertical axis: the art below was authored
  // with mandibles on -X, but the game's plain-rotate(facing) convention (see
  // drawCentipedeHead) expects the mob's front on +X. Negating the X scale
  // flips every coordinate below without needing to re-derive any curve math.
  ctx.scale(-s, s);

  // Legs — 4 per side, mirrored, drawn first so everything else sits on top.
  // A subtle walking sway is layered on the rotation, alternating left/right
  // like a real gait (front-left+back-right swing together, opposite the rest).
  ctx.strokeStyle = '#151515';
  ctx.lineWidth = 13;
  ctx.lineCap = 'round';
  function drawLeg(lx, ly, llen, lrot, mirrorY = false, swayPhase = 0) {
    ctx.save();
    ctx.translate(lx, ly);
    const sway = Math.sin(legPhase + swayPhase) * 8; // degrees of walking swing
    ctx.rotate((lrot + sway) * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    // Bottom-side legs are drawn toward +llen instead of -llen — a true mirror
    // of the top-side legs across the X axis, so they splay outward under the
    // body instead of folding inward underneath it (where they'd be hidden).
    ctx.lineTo(0, mirrorY ? llen : -llen);
    ctx.stroke();
    ctx.restore();
  }
  // Top side (front-to-back: legs 0-3), alternating gait phase per leg
  drawLeg(-62, -38, 35, -27, false, 0);
  drawLeg(-37, -54, 30, -10, false, Math.PI);
  drawLeg(  0, -67, 26,   0, false, 0);
  drawLeg( 48, -58, 26,  22, false, Math.PI);
  // Bottom side — mirrored anchors/rotations (as originally authored) PLUS the
  // mirrored draw-direction fix, and an opposite gait phase so legs alternate
  // like a real walk cycle rather than moving in lockstep with their opposite.
  drawLeg(-62,  38, 35,  27, true, Math.PI);
  drawLeg(-37,  54, 30,  10, true, 0);
  drawLeg(  0,  67, 26,   0, true, Math.PI);
  drawLeg( 48,  58, 26, -22, true, 0);

  // Mandibles — straight stroked lines pointing inward (pincers curling toward
  // each other), same build as the ant mandibles. Body draws on top of their
  // base so they appear to tuck under the front of the body. Chatter animation
  // mirrors antMandibles: fixed splay angle plus a small fast wiggle.
  function drawMandible(side) {
    ctx.save();
    ctx.translate(-83, side * 38);
    const chatter = side * (18 + Math.sin(pincerPhase * 4.5) * 4.5);
    ctx.rotate(chatter * Math.PI / 180);
    ctx.scale(1.5, 1.5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-32, 0);
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
  }
  drawMandible(-1);
  drawMandible(1);

  // Body — curved-front teardrop shape with corner bulges
  ctx.beginPath();
  ctx.moveTo(-97, -40);
  ctx.quadraticCurveTo(-114, 0, -97, 40);
  ctx.quadraticCurveTo(-61, 68, 0, 79);
  ctx.quadraticCurveTo(66, 84, 97, 21);
  ctx.quadraticCurveTo(115, 7, 97, -15);
  ctx.quadraticCurveTo(66, -76, 0, -79);
  ctx.quadraticCurveTo(-61, -68, -97, -40);
  ctx.closePath();
  ctx.fillStyle = '#9a7412';
  ctx.strokeStyle = '#6e5308';
  ctx.lineWidth = 8;
  ctx.lineJoin = 'round';
  ctx.fill();
  ctx.stroke();

  // Body detail curves — 5 sweeping lines echoing a segmented shell
  ctx.strokeStyle = '#6e5308';
  ctx.lineCap = 'round';
  function bodyCurve(cx, halfLen, ctrlX, lw) {
    ctx.beginPath();
    ctx.moveTo(cx, -halfLen);
    ctx.quadraticCurveTo(ctrlX, 0, cx, halfLen);
    ctx.lineWidth = lw;
    ctx.stroke();
  }
  bodyCurve(-60, 60.5, -100, 7);
  bodyCurve(-20, 75, -97, 7);
  bodyCurve(3, 75, -67, 7);
  bodyCurve(26, 74.5, -32, 7);
  bodyCurve(53, 63, -10, 7);

  // Tail segment — teardrop, rounded end toward body, tapering outward,
  // drawn on top of the body/mandibles.
  ctx.save();
  ctx.translate(101, 0);
  ctx.rotate(Math.PI);
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.quadraticCurveTo(37.4, -38, 68, -8.4);
  ctx.quadraticCurveTo(76, 0, 68, 8.4);
  ctx.quadraticCurveTo(37.4, 38, 0, 38);
  ctx.quadraticCurveTo(-13.3, 0, 0, -38);
  ctx.closePath();
  ctx.fillStyle = '#9a7412';
  ctx.strokeStyle = '#6e5308';
  ctx.lineWidth = 8;
  ctx.fill();
  ctx.stroke();

  // Tail detail curves
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(3, -31);
  ctx.quadraticCurveTo(26, 2, 3, 35);
  ctx.strokeStyle = '#6e5308';
  ctx.lineWidth = 7;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(17, -33);
  ctx.quadraticCurveTo(41, 0, 17, 33);
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.restore();

  // Stinger — smooth teardrop, no sharp point, drawn last on top of everything
  ctx.save();
  ctx.translate(61, 0);
  ctx.rotate(Math.PI);
  ctx.beginPath();
  ctx.moveTo(0, -37);
  ctx.quadraticCurveTo(44.8, -37, 64, 0);
  ctx.quadraticCurveTo(44.8, 37, 0, 37);
  ctx.quadraticCurveTo(-14.8, 0, 0, -37);
  ctx.closePath();
  ctx.fillStyle = '#1a1a1a';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

// ── Pyramid ───────────────────────────────────────────────────────────────────
// Top-down view: square base with four triangular faces converging on a
// centre apex, each face shaded slightly differently, plus stepped "brick"
// lines on each face for texture. Authored at half-width 90, scaled by r/90.
export function drawPyramid(ctx, x, y, r) {
  const s = r / 90;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Base square
  ctx.beginPath();
  ctx.rect(-90, -90, 180, 180);
  ctx.fillStyle = '#d4a24a';
  ctx.strokeStyle = '#8a651f';
  ctx.lineWidth = 6;
  ctx.fill();

  // Four triangular faces, each shaded differently
  function face(pts, color) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
  face([[-90, -90], [90, -90], [0, 0]], '#e8bc63'); // top
  face([[90, -90], [90, 90], [0, 0]], '#c99a3a');   // right
  face([[90, 90], [-90, 90], [0, 0]], '#b8862c');   // bottom
  face([[-90, 90], [-90, -90], [0, 0]], '#d4a24a'); // left

  // Stepped brick lines on each face, parallel to the base edges
  ctx.strokeStyle = '#8a651f';
  ctx.lineWidth = 2.5;
  ctx.globalAlpha = 0.55;
  const steps = [65, 40, 18];
  ctx.beginPath();
  steps.forEach(v => { ctx.moveTo(-v, -v); ctx.lineTo(v, -v); });   // top edges
  steps.forEach(v => { ctx.moveTo(v, -v); ctx.lineTo(v, v); });     // right edges
  steps.forEach(v => { ctx.moveTo(-v, v); ctx.lineTo(v, v); });     // bottom edges
  steps.forEach(v => { ctx.moveTo(-v, -v); ctx.lineTo(-v, v); });   // left edges
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Corner-to-apex ridge lines
  ctx.beginPath();
  ctx.moveTo(-90, -90); ctx.lineTo(0, 0);
  ctx.moveTo(90, -90);  ctx.lineTo(0, 0);
  ctx.moveTo(90, 90);   ctx.lineTo(0, 0);
  ctx.moveTo(-90, 90);  ctx.lineTo(0, 0);
  ctx.lineWidth = 4;
  ctx.stroke();

  // Base outline on top
  ctx.beginPath();
  ctx.rect(-90, -90, 180, 180);
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.restore();
}

// ── Pharaoh's Tomb (Sarcophagus) ─────────────────────────────────────────────
// Top-down mummy/sarcophagus figure: tapered gold body with the two
// arm-shaped ellipses merged into one combined silhouette, an outer border
// drawn as a separate expanded shape (not a centered stroke), horizontal
// bandage bands clipped to that combined silhouette, and a golden mask face
// (eyes, nose, teeth, headdress collar) at the top.
// Reference geometry authored in the original 301x301 sketch coordinate
// space, recentred so the body's centre sits at local (0,0), then scaled by
// r/95 (95 being roughly the body's half-height in that space).
export function drawTomb(ctx, x, y, r) {
  const s = r / 95;
  const ox = -145, oy = -173; // recenter reference coords so body center -> origin

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.translate(ox, oy);

  // Helper: apply an SVG-style matrix(a,b,c,d,e,f) as a temporary transform
  function withMatrix(a, b, c, d, e, f, draw) {
    ctx.save();
    ctx.transform(a, b, c, d, e, f);
    draw();
    ctx.restore();
  }

  // Outer border — a separately-computed, expanded silhouette combining the
  // main body and both arm ellipses, drawn first so it sits fully outside
  // the artwork rather than straddling its edge like a centered stroke would.
  ctx.beginPath();
  ctx.moveTo(176.2, 106.2);
  ctx.lineTo(177.9, 106.3);
  ctx.lineTo(179.4, 107.0);
  ctx.lineTo(180.7, 108.3);
  ctx.lineTo(181.9, 110.0);
  ctx.lineTo(182.9, 112.2);
  ctx.lineTo(183.6, 114.9);
  ctx.lineTo(184.1, 118.0);
  ctx.lineTo(184.3, 121.4);
  ctx.lineTo(184.2, 125.1);
  ctx.lineTo(184.0, 129.0);
  ctx.lineTo(183.4, 133.1);
  ctx.lineTo(182.6, 137.3);
  ctx.lineTo(170.0, 198.4);
  ctx.lineTo(168.4, 205.5);
  ctx.lineTo(166.4, 212.0);
  ctx.lineTo(164.0, 218.0);
  ctx.lineTo(161.3, 223.2);
  ctx.lineTo(158.3, 227.6);
  ctx.lineTo(155.0, 231.1);
  ctx.lineTo(151.6, 233.6);
  ctx.lineTo(148.0, 235.1);
  ctx.lineTo(144.4, 235.7);
  ctx.lineTo(140.8, 235.1);
  ctx.lineTo(137.3, 233.6);
  ctx.lineTo(133.8, 231.1);
  ctx.lineTo(130.6, 227.6);
  ctx.lineTo(127.6, 223.2);
  ctx.lineTo(124.8, 218.0);
  ctx.lineTo(122.5, 212.0);
  ctx.lineTo(120.4, 205.5);
  ctx.lineTo(106.3, 144.0);
  ctx.lineTo(105.4, 139.8);
  ctx.lineTo(104.7, 135.6);
  ctx.lineTo(104.2, 131.5);
  ctx.lineTo(104.0, 127.5);
  ctx.lineTo(104.0, 123.8);
  ctx.lineTo(104.3, 120.4);
  ctx.lineTo(104.8, 117.3);
  ctx.lineTo(105.6, 114.7);
  ctx.lineTo(106.6, 112.5);
  ctx.lineTo(107.8, 110.7);
  ctx.lineTo(109.2, 109.5);
  ctx.lineTo(110.7, 108.9);
  ctx.lineTo(112.4, 108.7);
  ctx.closePath();
  ctx.fillStyle = '#5a3d00';
  ctx.fill();

  // Headdress side-lappet (curved wing shape behind the head)
  withMatrix(0.02079482780309265, 0.999783764189357, -0.999783764189357, 0.02079482780309265, 174.86792035163913, 67.11500081939681, () => {
    ctx.beginPath();
    ctx.moveTo(31.033, 62.065);
    ctx.bezierCurveTo(13.894, 62.065, 0, 48.171, 0, 31.033);
    ctx.bezierCurveTo(0, 13.894, 13.894, 0, 31.033, 0);
    ctx.lineTo(31.033, 8.379);
    ctx.bezierCurveTo(18.521, 8.379, 8.379, 18.521, 8.379, 31.033);
    ctx.bezierCurveTo(8.379, 43.544, 18.521, 53.686, 31.033, 53.686);
    ctx.closePath();
    ctx.fillStyle = '#d08800';
    ctx.strokeStyle = '#9f6700';
    ctx.lineWidth = 5.08;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fill();
    ctx.stroke();
  });

  // Headdress collar circles (left, right, top)
  function collarCircle(a, b, c, d, e, f, rx, ry) {
    withMatrix(a, b, c, d, e, f, () => {
      ctx.beginPath();
      ctx.ellipse(rx, ry, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#bd7b00';
      ctx.fill();
    });
  }
  collarCircle(0.9751973713085925, -0.2213370438783604, 0.2213370438783604, 0.9751973713085925, 101.23022292443001, 99.6081777944739, 19.585, 19.585);
  collarCircle(0.9751973713085925, -0.2213370438783604, 0.2213370438783604, 0.9751973713085925, 138.9732652423862, 98.84569209108086, 19.585, 19.585);
  collarCircle(0.9850408701128116, -0.17232087571561114, 0.17232087571561114, 0.9850408701128116, 123.81606599610703, 81.93585583920479, 17.864, 17.864);

  // Main body (tapered egg shape)
  withMatrix(1, 0, 0, 1, 121.23652986911374, 119.33056023990692, () => {
    ctx.beginPath();
    ctx.moveTo(23.194, 0);
    ctx.bezierCurveTo(36.004, 0, 46.388, 25.034, 46.388, 55.916);
    ctx.bezierCurveTo(46.388, 86.798, 36.004, 111.832, 23.194, 111.832);
    ctx.bezierCurveTo(10.384, 111.832, 0, 86.798, 0, 55.916);
    ctx.bezierCurveTo(0, 25.034, 10.384, 0, 23.194, 0);
    ctx.closePath();
    ctx.fillStyle = '#bd7b00';
    ctx.fill();
  });

  // Arm shapes (tall thin ellipses flanking the body)
  withMatrix(0.970575892568149, -0.24079542513416005, 0.24079542513416005, 0.970575892568149, 103.83132153821303, 115.2072306877317, () => {
    ctx.beginPath();
    ctx.moveTo(8.206, 0);
    ctx.bezierCurveTo(12.738, 0, 16.412, 12.768, 16.412, 28.517);
    ctx.bezierCurveTo(16.412, 44.267, 12.738, 57.034, 8.206, 57.034);
    ctx.bezierCurveTo(3.674, 57.034, 0, 44.267, 0, 28.517);
    ctx.bezierCurveTo(0, 12.768, 3.674, 0, 8.206, 0);
    ctx.closePath();
    ctx.fillStyle = '#bd7b00';
    ctx.fill();
  });
  withMatrix(0.9663899781345133, 0.2570805518921549, -0.2570805518921549, 0.9663899781345133, 168.76895501077473, 108.57227743372715, () => {
    ctx.beginPath();
    ctx.moveTo(8.206, 0);
    ctx.bezierCurveTo(12.738, 0, 16.412, 12.768, 16.412, 28.517);
    ctx.bezierCurveTo(16.412, 44.267, 12.738, 57.034, 8.206, 57.034);
    ctx.bezierCurveTo(3.674, 57.034, 0, 44.267, 0, 28.517);
    ctx.bezierCurveTo(0, 12.768, 3.674, 0, 8.206, 0);
    ctx.closePath();
    ctx.fillStyle = '#bd7b00';
    ctx.fill();
  });

  // Bandage bands — clipped to the combined body+arms silhouette so none
  // overhang past the edges, matching the mummified beetle's texture lines.
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(110.8, 113.7);
  ctx.lineTo(111.8, 113.2);
  ctx.lineTo(175.6, 110.6);
  ctx.lineTo(176.7, 110.7);
  ctx.lineTo(177.7, 111.2);
  ctx.lineTo(178.5, 112.2);
  ctx.lineTo(179.2, 113.6);
  ctx.lineTo(179.7, 115.4);
  ctx.lineTo(180.0, 117.7);
  ctx.lineTo(180.2, 120.2);
  ctx.lineTo(180.1, 123.1);
  ctx.lineTo(179.9, 126.3);
  ctx.lineTo(179.5, 129.6);
  ctx.lineTo(178.9, 133.1);
  ctx.lineTo(178.2, 136.7);
  ctx.lineTo(164.5, 203.2);
  ctx.lineTo(162.8, 209.3);
  ctx.lineTo(160.8, 214.8);
  ctx.lineTo(158.6, 219.6);
  ctx.lineTo(156.0, 223.7);
  ctx.lineTo(153.3, 226.9);
  ctx.lineTo(150.4, 229.3);
  ctx.lineTo(147.5, 230.7);
  ctx.lineTo(144.4, 231.2);
  ctx.lineTo(141.4, 230.7);
  ctx.lineTo(138.4, 229.3);
  ctx.lineTo(135.6, 226.9);
  ctx.lineTo(132.8, 223.7);
  ctx.lineTo(130.3, 219.6);
  ctx.lineTo(128.0, 214.8);
  ctx.lineTo(126.0, 209.3);
  ctx.lineTo(124.3, 203.2);
  ctx.lineTo(109.9, 139.3);
  ctx.lineTo(109.2, 135.7);
  ctx.lineTo(108.7, 132.1);
  ctx.lineTo(108.3, 128.8);
  ctx.lineTo(108.2, 125.6);
  ctx.lineTo(108.2, 122.7);
  ctx.lineTo(108.4, 120.2);
  ctx.lineTo(108.7, 117.9);
  ctx.lineTo(109.3, 116.1);
  ctx.lineTo(110.0, 114.7);
  ctx.closePath();
  ctx.clip();

  function bandageBand(sx, x0, y0, w) {
    withMatrix(sx, 0, 0, 1, x0, y0, () => {
      ctx.beginPath();
      ctx.rect(0, 0, w, 5.424);
      ctx.fillStyle = '#eea300';
      ctx.fill();
    });
  }
  bandageBand(1, 130.7795297350282, 80.97583475166218, 26.102);
  bandageBand(2.9675559573101618, 105.90061428432585, 96.01057272122654, 26.102);
  bandageBand(3.11571129033427, 103.72613775856895, 109.43593978300333, 26.102);
  bandageBand(3.2561702911458985, 101.5619057683651, 124.00480307285655, 26.102);
  bandageBand(3.2266935822083496, 102.50070321925006, 137.38782865306976, 26.102);
  bandageBand(2.9872461599803857, 104.67492981862767, 151.27907039455658, 26.102);
  bandageBand(2.6038484590301922, 109.07121657890293, 165.6785282973173, 26.102);
  bandageBand(2.4684559586430987, 111.34191028895326, 180.24739158716937, 26.102);
  bandageBand(2.3014530220434457, 114.13000673704462, 195.66328181247792, 26.102);
  bandageBand(2.1158561835213185, 115.64956854923871, 210.40155048942125, 26.102);
  bandageBand(1.783480260494274, 120.17507463403274, 224.12338684381677, 26.102);

  ctx.restore(); // end bandage clip

  // Face plate (mask shape behind the eyes/nose)
  withMatrix(1, 0, 0, 0.788045189568394, 119.79457160484469, 81.02975522397061, () => {
    ctx.beginPath();
    ctx.moveTo(11.517, 24.504);
    ctx.quadraticCurveTo(0, 0, 24.504, 0);
    ctx.quadraticCurveTo(49.008, 0, 37.492, 24.504);
    ctx.quadraticCurveTo(49.008, 49.008, 24.504, 49.008);
    ctx.quadraticCurveTo(0, 49.008, 11.517, 24.504);
    ctx.closePath();
    ctx.fillStyle = '#d08800';
    ctx.strokeStyle = '#9f6700';
    ctx.lineWidth = 7.34;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fill();
    ctx.stroke();
  });

  // Eyebrows (two small curved marks)
  function eyebrow(a, b, c, d, e, f) {
    withMatrix(a, b, c, d, e, f, () => {
      ctx.beginPath();
      ctx.moveTo(14.39, 7.195);
      ctx.quadraticCurveTo(8.976, 8.976, 7.195, 8.976);
      ctx.quadraticCurveTo(5.414, 8.976, 0, 7.195);
      ctx.quadraticCurveTo(5.414, 5.414, 7.195, 5.414);
      ctx.quadraticCurveTo(8.976, 5.414, 14.39, 7.195);
      ctx.closePath();
      ctx.fillStyle = '#d08800';
      ctx.strokeStyle = '#9f6700';
      ctx.lineWidth = 2.27;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.fill();
      ctx.stroke();
    });
  }
  eyebrow(0.9999949269133752, -0.003185301793137102, 0.003185301793137102, 0.9999949269133752, 127.7715585008543, 83.78773838769781);
  eyebrow(0.9999949269133752, -0.003185301793137102, 0.003185301793137102, 0.9999949269133752, 145.41619378239943, 83.78773838769783);

  // Pupils
  function pupil(a, b, c, d, e, f) {
    withMatrix(a, b, c, d, e, f, () => {
      ctx.beginPath();
      ctx.moveTo(1.919, 0);
      ctx.bezierCurveTo(2.979, 0, 3.838, 0.859, 3.838, 1.919);
      ctx.bezierCurveTo(3.838, 2.979, 2.979, 3.838, 1.919, 3.838);
      ctx.bezierCurveTo(0.859, 3.838, 0, 2.979, 0, 1.919);
      ctx.bezierCurveTo(0, 0.859, 0.859, 0, 1.919, 0);
      ctx.closePath();
      ctx.fillStyle = '#d08800';
      ctx.strokeStyle = '#9f6700';
      ctx.lineWidth = 1.77;
      ctx.lineJoin = 'round';
      ctx.fill();
      ctx.stroke();
    });
  }
  pupil(0.9629163869490754, -0.26979998470151617, 0.26979998470151617, 0.9629163869490754, 132.82808496825407, 89.70052607220687);
  pupil(0.9629163869490754, -0.26979998470151617, 0.26979998470151617, 0.9629163869490754, 150.44733722437786, 89.70052607220687);

  // Nose (small triangular polyline)
  withMatrix(0.8370197740599968, 0, 0, 0.7306577043847433, 143.51824652218, 95.06536071315423, () => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0.08, 6.29);
    ctx.lineTo(4.4, 6.5);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = '#9f6700';
    ctx.lineWidth = 2.15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'miter';
    ctx.stroke();
  });

  // Mouth outline (flattened ellipse)
  withMatrix(1.0483491293310785, 0, 0, 1.0617120305703627, 131.18993152771696, 104.24600967088995, () => {
    ctx.beginPath();
    ctx.moveTo(12.554, 0);
    ctx.bezierCurveTo(19.488, 0, 25.108, 1.454, 25.108, 3.247);
    ctx.bezierCurveTo(25.108, 5.04, 19.488, 6.494, 12.554, 6.494);
    ctx.bezierCurveTo(5.621, 6.494, 0, 5.04, 0, 3.247);
    ctx.bezierCurveTo(0, 1.454, 5.621, 0, 12.554, 0);
    ctx.closePath();
    ctx.strokeStyle = '#9f6700';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Small teeth marks (bursts) inside the mouth
  function tooth(a, b, c, d, e, f) {
    withMatrix(a, b, c, d, e, f, () => {
      ctx.beginPath();
      ctx.moveTo(3.566, 3.602);
      ctx.quadraticCurveTo(0, 0, 3.602, 0);
      ctx.quadraticCurveTo(7.203, 0, 3.638, 3.602);
      ctx.quadraticCurveTo(7.203, 7.203, 3.602, 7.203);
      ctx.quadraticCurveTo(0, 7.203, 3.566, 3.602);
      ctx.closePath();
      ctx.fillStyle = '#d08800';
      ctx.strokeStyle = '#9f6700';
      ctx.lineWidth = 2.27;
      ctx.lineJoin = 'miter';
      ctx.fill();
      ctx.stroke();
    });
  }
  tooth(0.9999500004166653, 0.009999833334166451, -0.009999833334166451, 0.9999500004166653, 131.43331436337348, 106.52488317572106);
  tooth(0.9999500004166653, 0.009999833334166451, -0.009999833334166451, 0.9999500004166653, 151.1644234716701, 106.54712739185607);
  tooth(0.9999500004166653, 0.009999833334166451, -0.011510023635604398, 1.1509639965592318, 135.3369265524405, 106.08584586005182);

  // Wider mouth opening outline
  withMatrix(0.8123582693534083, 0, 0, 0.7945972602131871, 130.57133293530336, 103.85643636861371, () => {
    ctx.beginPath();
    ctx.moveTo(16.883, 0);
    ctx.bezierCurveTo(26.207, 0, 33.766, 3.44, 33.766, 7.684);
    ctx.bezierCurveTo(33.766, 11.928, 26.207, 15.368, 16.883, 15.368);
    ctx.bezierCurveTo(7.559, 15.368, 0, 11.928, 0, 7.684);
    ctx.bezierCurveTo(0, 3.44, 7.559, 0, 16.883, 0);
    ctx.closePath();
    ctx.strokeStyle = '#9f6700';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  tooth(0.9999500004166653, 0.009999833334166451, -0.011510023635604398, 1.1509639965592318, 147.01512724448133, 105.86958288427327);
  tooth(0.9999500004166653, 0.009999833334166451, -0.014060371020068527, 1.4059902337910268, 139.24803149185283, 105.33008443739682);
  tooth(0.9999500004166653, 0.009999833334166451, -0.014060371020068527, 1.4059902337910268, 143.14076505586644, 105.54634741317537);

  ctx.restore();
}

// ── Main dispatch ─────────────────────────────────────────────────────────────
// Call once per frame per mob.  dt = delta time in ms.
// For ladybugs: generate mob.spots once at spawn with makeLadybugSpots(count, seed).
// Spots are normalized (fractions of r) so they scale correctly with the mob.
export function drawMob(ctx, mob, x, y, scaledRadius = mob.radius) {
  const r = scaledRadius;
  switch (mob.typeId) {

    case 'bee':
      drawBee(ctx, x, y, r, mob.facing ?? 0, mob.wobblePhase ?? 0);
      break;

    case 'queen_bee':
      drawQueenBee(ctx, x, y, r, mob.facing ?? 0, mob.wobblePhase ?? 0);
      break;

    case 'beetle':
      drawBeetle(ctx, x, y, r, mob.facing ?? 0, mob.pincerPhase ?? 0);
      break;

    case 'beehive':
      drawHive(ctx, x, y, r);
      break;

    case 'hornet':
      drawHornet(ctx, x, y, r, mob.facing ?? 0, mob.wobblePhase ?? 0, mob.stingerProgress ?? 1);
      break;

    case 'ladybug':
      if (!mob.spots || mob.spots.length === 0 || mob.spots[0].nx == null)
        mob.spots = makeLadybugSpots(5, mob.id ? mob.id * 0.0001 : Math.random());
      // Boss spin animation during rose spawn pause
      if (mob.isBoss && mob.ladyRosePausing) {
        mob._spinAngle = (mob._spinAngle ?? mob.facing ?? 0) + 0.18;
        drawLadybug(ctx, x, y, r, mob._spinAngle, mob.spots);
      } else {
        if (mob._spinAngle != null) mob._spinAngle = null;
        drawLadybug(ctx, x, y, r, mob.facing ?? 0, mob.spots);
      }
      break;

    case 'centipede_head':
      drawCentipedeHead(ctx, x, y, r, mob.facing ?? 0);
      break;

    case 'centipede_body':
      drawCentipedeBody(ctx, x, y, r, mob.facing ?? 0, mob.legPhase ?? 0, mob.segIndex ?? 0);
      break;

    case 'spider':
      drawSpider(ctx, x, y, r, mob.facing ?? 0, mob.legPhase ?? 0, mob.speed);
      break;

    case 'soldier_ant':
      drawSoldierAnt(ctx, x, y, r, mob.facing ?? 0, mob.pincerPhase ?? 0, mob.wingPhase ?? 0, mob.isFriendlyPet ?? false);
      break;

    case 'worker_ant':
      drawWorkerAnt(ctx, x, y, r, mob.facing ?? 0, mob.pincerPhase ?? 0);
      break;

    case 'baby_ant':
      drawBabyAnt(ctx, x, y, r, mob.facing ?? 0, mob.pincerPhase ?? 0);
      break;

    case 'queen_ant':
      drawQueenAnt(ctx, x, y, r, mob.facing ?? 0, mob.pincerPhase ?? 0, mob.wingPhase ?? 0);
      break;

    case 'ant_egg':
      drawAntEgg(ctx, x, y, r);
      break;

    case 'spider_egg': {
      // Spider egg sac — silky white/tan sphere with dark border
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r + Math.max(1, r * 0.12), 0, Math.PI * 2);
      ctx.fillStyle = '#2a1a0a';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#e8dfc8';
      ctx.fill();
      ctx.restore();
      break;
    }

    case 'ant_hole':
      drawAntHole(ctx, x, y, r);
      break;

    case 'fire_soldier_ant':
      drawFireSoldierAnt(ctx, x, y, r, mob.facing ?? 0, mob.pincerPhase ?? 0, mob.wingPhase ?? 0);
      break;

    case 'fire_worker_ant':
      drawFireWorkerAnt(ctx, x, y, r, mob.facing ?? 0, mob.pincerPhase ?? 0);
      break;

    case 'fire_queen_ant':
      drawFireQueenAnt(ctx, x, y, r, mob.facing ?? 0, mob.pincerPhase ?? 0, mob.wingPhase ?? 0);
      break;

    case 'fire_ant_egg':
      drawFireAntEgg(ctx, x, y, r);
      break;

    case 'fire_ant_hole':
      drawFireAntHole(ctx, x, y, r);
      break;

    case 'beekeeper':
      drawBeekeeper(ctx, x, y, r, mob.state ?? 'neutral', mob.cutterRot ?? 0, mob.eyeAngle ?? 0, mob);
      break;

    case 'digger':
      drawDigger(ctx, x, y, r, mob.state ?? 'neutral', mob.cutterRot ?? 0, mob.eyeAngle ?? 0, mob);
      break;

    case 'sandstorm':
      drawSandstorm(ctx, x, y, r, mob.hexRotations ?? [0,0,0], mob.alerted ?? false, mob.isRamming ?? false);
      break;

    case 'desert_centipede_head':
      drawDesertCentipedeHead(ctx, x, y, r, mob.facing ?? 0);
      break;

    case 'desert_centipede_body':
      drawDesertCentipedeBody(ctx, x, y, r, mob.facing ?? 0, mob.legPhase ?? 0, mob.segIndex ?? 0);
      break;

    case 'cactus':
      drawCactus(ctx, x, y, r, mob.hasFlower ?? true);
      break;

    case 'scorpion':
      drawScorpion(ctx, x, y, r, mob.facing ?? 0, mob.legPhase ?? 0, mob.pincerPhase ?? 0);
      break;

    case 'pyramid':
      drawPyramid(ctx, x, y, r);
      break;

    case 'tomb':
      drawTomb(ctx, x, y, r);
      break;

    case 'mummified_beetle':
      drawMummifiedBeetle(ctx, x, y, r, mob.facing ?? 0, mob.pincerPhase ?? 0);
      break;

    default:
      ctx.fillStyle   = mob.color   || '#aaa';
      ctx.strokeStyle = mob.border  || '#555';
      ctx.lineWidth   = r * 0.10;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
  }

}

// ── Sandstorm ─────────────────────────────────────────────────────────────────
// Three nested hexagons each spinning independently, styled after the sketch:
//   outer = bright yellow #faed05, mid = yellow #ffdc00, inner = dark gold #d6b700
// hexRotations[2]=outer, [1]=mid, [0]=inner — each starts offset like the sketch.
export function drawSandstorm(ctx, x, y, r, hexRotations = [0,0,0], alerted = false, isRamming = false) {
  ctx.save();
  ctx.translate(x, y);

  // Helper: regular hexagon path centred at origin
  function hexPath(radius, rot) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = rot + (Math.PI / 3) * i - Math.PI / 6; // flat-top orientation
      if (i === 0) ctx.moveTo(Math.cos(a) * radius, Math.sin(a) * radius);
      else         ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
    }
    ctx.closePath();
  }

  // Radii — outer biggest, each ~62% of previous (matching SVG proportions)
  const outerR = r * 1.00;
  const midR   = r * 0.62;
  const innerR = r * 0.35;

  // Base colors from SVG; shift orange-red when ramming
  const cOuter  = isRamming ? '#ff8800' : '#faed05';
  const cMid    = isRamming ? '#ffaa22' : '#ffdc00';
  const cInner  = isRamming ? '#dd6600' : '#d6b700';
  const border  = isRamming ? '#5a1a00' : '#222222';
  const lw      = Math.max(1.5, r * 0.12); // stroke width scales with mob size

  // Outer hex — SVG had a tiny CCW tilt (~-1.9°), baked into hexRotations[2] start
  hexPath(outerR, hexRotations[2]);
  ctx.fillStyle = cOuter;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = lw;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Mid hex — SVG had a strong CW tilt (~21°), baked into hexRotations[1] start
  hexPath(midR, hexRotations[1]);
  ctx.fillStyle = cMid;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = lw * 0.9;
  ctx.stroke();

  // Inner hex — SVG had a slight CW tilt (~5°), baked into hexRotations[0] start
  hexPath(innerR, hexRotations[0]);
  ctx.fillStyle = cInner;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = lw * 0.8;
  ctx.stroke();

  ctx.restore();
}
// ── Desert Centipede ──────────────────────────────────────────────────────────
// Same structure as regular centipede but recolored to sandy gold (#C5B357)
export function drawDesertCentipedeBody(ctx, x, y, r, facing = 0, legPhase = 0, segIndex = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing);

  const legR    = r * 0.32;
  const legDist = r * 1.08;
  const offsets = [-0.48, 0.48];

  [-1, 1].forEach(side => {
    offsets.forEach((off, i) => {
      const baseAngle = side > 0 ? Math.PI / 2 : -Math.PI / 2;
      const nudge = Math.sin(legPhase + segIndex * 0.9 + i * 1.6 + (side > 0 ? Math.PI : 0)) * 0.13;
      const a  = baseAngle + off + nudge;
      const lx = Math.cos(a) * legDist;
      const ly = Math.sin(a) * legDist;
      ctx.fillStyle = '#6b5c1a';
      ctx.beginPath();
      ctx.arc(lx, ly, legR, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  // Body border
  ctx.fillStyle = '#8a7a30';
  ctx.beginPath();
  ctx.arc(0, 0, r + r * 0.14, 0, Math.PI * 2);
  ctx.fill();
  // Body fill
  ctx.fillStyle = '#C5B357';
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawDesertCentipedeHead(ctx, x, y, r, facing = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing);

  // Body border + fill
  ctx.fillStyle = '#8a7a30';
  ctx.beginPath();
  ctx.arc(0, 0, r + r * 0.14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#C5B357';
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  // Mandibles / horns — same shape as regular centipede but dark gold color
  ctx.strokeStyle = '#6b5c1a';
  ctx.lineCap = 'round';
  [-1, 1].forEach(side => {
    const bx =  r * 0.72;
    const by =  side * r * 0.32;
    ctx.lineWidth = r * 0.28;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.bezierCurveTo(
      bx + r * 0.55,  by + side * r * 0.60,
      bx + r * 0.20,  by + side * r * 1.10,
      bx - r * 0.30,  by + side * r * 1.05
    );
    ctx.stroke();
  });

  ctx.restore();
}

// ── Cactus ────────────────────────────────────────────────────────────────────
// Drawn from the SVG sketch: green spiky burst body + circular head,
// with optional pink/yellow flower petals on top (75% chance).
export function drawCactus(ctx, x, y, r, hasFlower = true) {
  ctx.save();
  ctx.translate(x, y);

  // Scale factor — SVG canvas was 301×301, the cactus center is roughly at (150,175)
  // We map the circular body (radius ~86 in SVG) to our mob radius r
  const scale = r / 86;

  ctx.save();
  ctx.scale(scale, scale);

  // ── Spiky burst body (green, behind the circle) ──
  // Simplified sunburst: draw alternating long/short spikes
  const spikeCount = 24;
  ctx.beginPath();
  for (let i = 0; i < spikeCount * 2; i++) {
    const angle = (i / (spikeCount * 2)) * Math.PI * 2 - Math.PI / 2;
    const rad   = i % 2 === 0 ? 96 : 70;
    const px    = Math.cos(angle) * rad;
    const py    = Math.sin(angle) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle   = '#689a10';
  ctx.strokeStyle = '#83b925';
  ctx.lineWidth   = 2;
  ctx.fill();
  ctx.stroke();

  // ── Main circular body ──
  ctx.beginPath();
  ctx.arc(0, 0, 86, 0, Math.PI * 2);
  ctx.fillStyle   = '#83b925';
  ctx.strokeStyle = '#83b925';
  ctx.lineWidth   = 2;
  ctx.fill();
  ctx.stroke();

  if (hasFlower) {
    // ── Flower petals (pink) — arranged around the top of the circle ──
    const petalAngles = [-0.9, -0.4, 0.1, 0.5, 1.0];
    const petalDist   = 62;
    petalAngles.forEach(a => {
      const px = Math.cos(a - Math.PI / 2) * petalDist;
      const py = Math.sin(a - Math.PI / 2) * petalDist;
      // Pink petal
      ctx.beginPath();
      ctx.ellipse(px, py, 14, 22, a, 0, Math.PI * 2);
      ctx.fillStyle   = '#ff79c2';
      ctx.strokeStyle = '#ff48a6';
      ctx.lineWidth   = 3;
      ctx.fill();
      ctx.stroke();
    });
    // ── Flower center (yellow) ──
    ctx.beginPath();
    ctx.arc(0, -60, 18, 0, Math.PI * 2);
    ctx.fillStyle   = '#ffff9a';
    ctx.strokeStyle = '#ffff49';
    ctx.lineWidth   = 3;
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore(); // un-scale
  ctx.restore(); // un-translate
}

// ── Ocean ─────────────────────────────────────────────────────────────────────

// ── Jellyfish ─────────────────────────────────────────────────────────────────
// Flat grey bell with a white ring border, 8 short tentacles anchored at evenly
// spaced root points around the bell edge, and a 6-dot "petals" ring + center
// dot marking on the bell. Each tentacle is a single unbroken quadraticCurveTo
// stroke (base fixed, tip/mid drift independently) so it reads as a gentle
// whip/sway rather than a rigid pivoting spike. tentaclePhase should be a
// slowly-incrementing per-mob value (e.g. += 0.02/frame) driven by the caller.
const JELLYFISH_TENTACLE_COUNT = 8;
const JELLYFISH_TENTACLE_PHASE_OFFSETS = Array.from(
  { length: JELLYFISH_TENTACLE_COUNT },
  (_, i) => i * 2.399963 // golden-angle spacing so sways desync naturally
);

export function drawJellyfish(ctx, x, y, r, tentaclePhase = 0) {
  const rootR = r;
  const tentacleLen = r * 0.85;

  ctx.save();
  ctx.lineCap = 'round';

  // Tentacles — drawn first, behind the bell
  for (let i = 0; i < JELLYFISH_TENTACLE_COUNT; i++) {
    const baseAngle = (i / JELLYFISH_TENTACLE_COUNT) * Math.PI * 2;
    const off = JELLYFISH_TENTACLE_PHASE_OFFSETS[i];

    const sx = x + Math.cos(baseAngle) * rootR;
    const sy = y + Math.sin(baseAngle) * rootR;

    // Perpendicular to the root direction — bend displaces sideways along this axis
    const nx = Math.cos(baseAngle), ny = Math.sin(baseAngle);
    const px = -ny, py = nx;

    const bendMid = Math.sin(tentaclePhase * 0.6 + off) * r * 0.16;
    const midX = sx + nx * tentacleLen * 0.55 + px * bendMid * 0.5;
    const midY = sy + ny * tentacleLen * 0.55 + py * bendMid * 0.5;

    const bendTip = Math.sin(tentaclePhase * 0.6 + off + 1.4) * r * 0.26;
    const ex = sx + nx * tentacleLen + px * bendTip;
    const ey = sy + ny * tentacleLen + py * bendTip;

    ctx.strokeStyle = '#9a9a9a';
    ctx.lineWidth   = r * 0.16;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(midX, midY, ex, ey);
    ctx.stroke();
  }

  // Bell body
  ctx.beginPath();
  ctx.arc(x, y, rootR, 0, Math.PI * 2);
  ctx.fillStyle = '#b0b0b0';
  ctx.fill();
  ctx.lineWidth   = r * 0.09;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  // Petals marking — 6-dot ring + center dot
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = '#ffffff';
  const petalDots = [
    [0, 0, 0.09],
    [0, -0.5, 0.07], [0.43, -0.25, 0.07], [0.43, 0.25, 0.07],
    [0, 0.5, 0.07], [-0.43, 0.25, 0.07], [-0.43, -0.25, 0.07],
  ];
  petalDots.forEach(([nx2, ny2, nr2]) => {
    ctx.beginPath();
    ctx.arc(nx2 * r, ny2 * r, nr2 * r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  ctx.restore();
}

// ── Starfish ──────────────────────────────────────────────────────────────────
// Traced from a hand-drawn reference: 5 rounded, unevenly-shaped arms with deep
// concave dips between them (no straight edges, no sharp points). Coordinates
// below are normalized as fractions of r (traced at reference tip-radius, then
// divided down) so the shape scales cleanly with mob size. The body is drawn as
// one continuous smoothed path (quadratic curve through point midpoints — no
// visible seams or joints), with a second, larger copy of the same path drawn
// first as a border. The border is offset along each point's local perpendicular
// (not radially from center) so its width stays even all the way around,
// including through the tight dips — a radial offset would pinch thin at dips
// and balloon thick at the wide arm tips.
const STARFISH_OUTLINE = [
  [-0.5526,-0.0], [-0.5356,-0.0378], [-0.5252,-0.0741], [-0.5207,-0.1104],
  [-0.5222,-0.1496], [-0.5289,-0.1926], [-0.5452,-0.243], [-0.5741,-0.3052],
  [-0.6319,-0.3948], [-0.7289,-0.5296], [-0.7481,-0.6274], [-0.7193,-0.6948],
  [-0.6637,-0.737], [-0.5852,-0.7489], [-0.4615,-0.6837], [-0.3452,-0.5978],
  [-0.2719,-0.557], [-0.2163,-0.5356], [-0.1704,-0.5252], [-0.1296,-0.5207],
  [-0.0919,-0.5222], [-0.0556,-0.5304], [-0.0193,-0.543], [0.02,-0.563],
  [0.0622,-0.5933], [0.1133,-0.6407], [0.18,-0.7222], [0.2785,-0.8563],
  [0.3659,-0.9052], [0.4378,-0.8985], [0.4963,-0.8593], [0.5319,-0.7889],
  [0.5059,-0.6474], [0.4607,-0.5119], [0.4459,-0.4304], [0.443,-0.3719],
  [0.4467,-0.3244], [0.4548,-0.2844], [0.4689,-0.2496], [0.4874,-0.217],
  [0.5111,-0.1859], [0.543,-0.1556], [0.5844,-0.1244], [0.6437,-0.0904],
  [0.7422,-0.0519], [0.9,0.0], [0.9748,0.0681], [0.9896,0.1393],
  [0.9711,0.2067], [0.9141,0.2622], [0.7733,0.2815], [0.6304,0.2807],
  [0.5474,0.2911], [0.4904,0.3059], [0.4467,0.3244], [0.4119,0.3459],
  [0.3822,0.3689], [0.357,0.397], [0.3348,0.4281], [0.3148,0.4667],
  [0.2985,0.5163], [0.2852,0.5844], [0.2785,0.6904], [0.2785,0.8563],
  [0.2363,0.9489], [0.1733,0.9844], [0.1037,0.9874], [0.0333,0.9511],
  [-0.0289,0.8207], [-0.0719,0.6852], [-0.1074,0.6111], [-0.14,0.5622],
  [-0.1711,0.5259], [-0.2015,0.4985], [-0.2326,0.4778], [-0.2667,0.4615],
  [-0.3037,0.4496], [-0.3467,0.4437], [-0.3993,0.4437], [-0.4674,0.4511],
  [-0.5689,0.4778], [-0.7281,0.5289], [-0.8289,0.5178], [-0.8822,0.4689],
  [-0.9059,0.4037], [-0.8941,0.3252], [-0.7919,0.2267], [-0.6756,0.1437],
  [-0.6148,0.0867], [-0.5778,0.0407],
];

// Offsets every point of a closed polyline along its own local perpendicular
// (derived from the tangent to its neighbours), not radially from a center —
// keeps border thickness visually even through tight concave dips and wide
// convex tips alike.
function offsetOutlinePerp(pts, amount) {
  const n = pts.length;
  return pts.map((p, i) => {
    const prev = pts[(i - 1 + n) % n];
    const next = pts[(i + 1) % n];
    let tx = next.x - prev.x;
    let ty = next.y - prev.y;
    const tlen = Math.hypot(tx, ty) || 1;
    tx /= tlen; ty /= tlen;
    let nx = -ty, ny = tx;
    if (nx * p.x + ny * p.y < 0) { nx = -nx; ny = -ny; } // keep normal pointing outward
    return { x: p.x + nx * amount, y: p.y + ny * amount };
  });
}

// Draws a smooth closed path through pts using quadratic curves between
// consecutive point midpoints — removes the jagged/faceted look of a plain
// lineTo polygon while still following the traced silhouette closely.
function starfishSmoothPath(ctx, pts) {
  const n = pts.length;
  ctx.beginPath();
  ctx.moveTo((pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
  for (let i = 1; i <= n; i++) {
    const p0 = pts[i % n];
    const p1 = pts[(i + 1) % n];
    const midX = (p0.x + p1.x) / 2;
    const midY = (p0.y + p1.y) / 2;
    ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
  }
  ctx.closePath();
}

// ── Starfish damage-flinch animation ─────────────────────────────────────────
// On taking a hit, one arm shrinks in toward the body (a "flinch") and holds
// briefly before easing back out. Driven by hitArm (which of the 5 arms,
// 0-4) and hitPhase (0 = no reaction / fully healed out, 1 = fully shrunk).
// TODO: hook this up to the starfish's HP when damage is added — e.g. on
// taking damage, pick/cycle hitArm and set hitPhase to 1, then tween
// hitPhase back down to 0 over time (or hold it while flashing, then
// release). This file only draws a given hitPhase; it does not animate it.
const STARFISH_MAX_SHRINK = 0.30; // cap: arm pulls in at most 30% toward the body

// Assigns every outline point to its nearest of the 5 arm tips (by angle
// around the center), so a whole arm — tip to both surrounding dips — shares
// one hitArm id and animates together.
function starfishAssignArms(pts) {
  const n = pts.length;
  const angles = pts.map(p => Math.atan2(p.y, p.x));
  const radii  = pts.map(p => Math.hypot(p.x, p.y));

  // Arm tips = local radius maxima walking around the outline
  const tipIndices = [];
  for (let i = 0; i < n; i++) {
    const prev = radii[(i - 1 + n) % n];
    const next = radii[(i + 1) % n];
    if (radii[i] >= prev && radii[i] >= next) tipIndices.push(i);
  }
  const tipAngles = tipIndices.map(i => angles[i]);

  function angDist(a, b) {
    let d = Math.abs(a - b) % (Math.PI * 2);
    if (d > Math.PI) d = Math.PI * 2 - d;
    return d;
  }

  return pts.map((_, i) => {
    let bestArm = 0, bestDist = Infinity;
    tipAngles.forEach((tipAngle, armIdx) => {
      const d = angDist(angles[i], tipAngle);
      if (d < bestDist) { bestDist = d; bestArm = armIdx; }
    });
    return bestArm;
  });
}

// Per-point shrink weight within its arm: 1.0 at the tip (radius max), fading
// to 0 at the arm's base / the concave dips beside it (radius min) — so the
// dips stay anchored and only the arm tip pulls inward.
function starfishArmWeights(pts) {
  const radii = pts.map(p => Math.hypot(p.x, p.y));
  const minR = Math.min(...radii);
  const maxR = Math.max(...radii);
  return radii.map(r => {
    const t = (r - minR) / (maxR - minR || 1);
    return t * t * (3 - 2 * t); // smoothstep ease
  });
}

// Precomputed once against the normalized outline (arm/weight assignment is
// shape-based, not size-based, so this doesn't need to be redone per-radius).
const STARFISH_NORM_PTS   = STARFISH_OUTLINE.map(([nx, ny]) => ({ x: nx, y: ny }));
const STARFISH_ARM_ID     = starfishAssignArms(STARFISH_NORM_PTS);
const STARFISH_ARM_WEIGHT = starfishArmWeights(STARFISH_NORM_PTS);

// Applies the flinch shrink for the given arm/phase to a set of (already
// radius-scaled) outline points.
function starfishFlinchPoints(basePts, hitArm, hitPhase) {
  if (!hitPhase) return basePts; // fast path: no active reaction
  const amt = Math.max(0, Math.min(1, hitPhase)) * STARFISH_MAX_SHRINK;
  return basePts.map((p, i) => {
    if (STARFISH_ARM_ID[i] !== hitArm) return p;
    const scale = 1 - STARFISH_ARM_WEIGHT[i] * amt;
    return { x: p.x * scale, y: p.y * scale };
  });
}

// hitArm: which arm (0-4) is reacting. hitPhase: 0-1, how far into the
// flinch it currently is (0 = normal, 1 = fully shrunk 30%). Both default to
// "no reaction" so existing callers keep working unchanged.
export function drawStarfish(ctx, x, y, r, hitArm = 0, hitPhase = 0) {
  const basePts = STARFISH_OUTLINE.map(([nx, ny]) => ({ x: nx * r, y: ny * r }));
  const pts = starfishFlinchPoints(basePts, hitArm, hitPhase);

  ctx.save();
  ctx.translate(x, y);

  // Border — larger copy of the same path, offset outward evenly
  starfishSmoothPath(ctx, offsetOutlinePerp(pts, r * 0.045));
  ctx.fillStyle = '#a8342f';
  ctx.fill();

  // Body fill — the traced silhouette itself, inset slightly so the border reads evenly
  starfishSmoothPath(ctx, offsetOutlinePerp(pts, -r * 0.022));
  ctx.fillStyle = '#d9534f';
  ctx.fill();

  ctx.restore();
}

// ── Shell ─────────────────────────────────────────────────────────────────────
// Static mob, no animation. Traced from a hand-drawn reference: a rounded fan
// body with a pointed hinge tail at the bottom-right, and 5 ridge lines fanning
// out from the hinge. Coordinates are normalized as fractions of r (traced at
// reference tip-radius, then divided down) so the shape scales cleanly with mob
// size. The ridges are traced as two filled polygons (not strokes) directly
// from the same reference image and the same normalization as the body outline,
// so they sit flush against the body with no gap or drift at any scale.
const SHELL_OUTLINE = [
  [-0.0520,-0.9358], [-0.1560,-0.9178], [-0.2260,-0.8998], [-0.3219,-0.8658],
  [-0.4419,-0.8079], [-0.5339,-0.7479], [-0.6239,-0.6759], [-0.7079,-0.5939],
  [-0.7639,-0.5279], [-0.8119,-0.4599], [-0.8678,-0.3579], [-0.8998,-0.2839],
  [-0.9298,-0.1920], [-0.9538,-0.0780], [-0.9638,0.0160], [-0.9638,0.1320],
  [-0.9578,0.2000], [-0.9418,0.2899], [-0.9078,0.4019], [-0.8378,0.5459],
  [-0.8159,0.5659], [-0.7899,0.5759], [0.0220,0.6159], [0.0360,0.6359],
  [0.1140,0.8998], [0.1440,0.9298], [0.1900,0.9418], [0.2260,0.9318],
  [0.2540,0.9078], [0.3199,0.7939], [0.4019,0.6779], [0.4719,0.5959],
  [0.5379,0.5299], [0.6139,0.4679], [0.6939,0.4139], [0.7979,0.3539],
  [0.9298,0.2899], [0.9458,0.2760], [0.9598,0.2520], [0.9638,0.2160],
  [0.9518,0.1840], [0.9198,0.1580], [0.6919,0.1000], [0.6639,0.0900],
  [0.6579,0.0820], [0.6279,-0.2740], [0.5979,-0.7699], [0.5759,-0.8119],
  [0.5139,-0.8478], [0.4499,-0.8738], [0.3559,-0.9038], [0.2680,-0.9238],
  [0.1160,-0.9418], [0.0220,-0.9418],
];

// The 5 ridges fan out from one hinge area but partially overlap/touch each
// other near it, so tracing them from the source image yields 2 fused blobs
// rather than 5 clean separate shapes — drawn as-is, this reproduces the
// reference exactly and still reads as a fan of ridges.
const SHELL_RIDGE_BLOBS = [
  [[-0.5819,-0.2260],[-0.5939,-0.2000],[-0.5939,-0.1700],[-0.5839,-0.1460],[-0.5679,-0.1280],
   [-0.3259,0.0200],[-0.1940,0.1060],[-0.0800,0.1860],[0.1120,0.3299],[0.1000,0.3299],
   [-0.0640,0.2819],[-0.3259,0.1960],[-0.6059,0.1100],[-0.6199,0.1100],[-0.6459,0.1180],
   [-0.6679,0.1380],[-0.6779,0.1580],[-0.6779,0.1980],[-0.6659,0.2200],[-0.6539,0.2320],
   [-0.6359,0.2420],[-0.5319,0.2720],[0.0960,0.4399],[0.1680,0.4559],[0.1960,0.4559],
   [0.2140,0.4479],[0.2260,0.4359],[0.2360,0.4139],[0.2360,0.3939],[0.2280,0.3739],
   [0.2180,0.3639],[0.2460,0.3519],[0.2600,0.3359],[0.2680,0.3139],[0.2660,0.2939],
   [0.2540,0.2700],[0.0180,0.1120],[-0.4899,-0.2460],[-0.5139,-0.2540],[-0.5359,-0.2540],
   [-0.5619,-0.2440]],
  [[-0.2280,-0.5259],[-0.2480,-0.5099],[-0.2620,-0.4839],[-0.2640,-0.4499],[-0.2540,-0.4239],
   [0.0560,-0.0320],[0.1840,0.1480],[0.2580,0.2640],[0.2799,0.2779],[0.3039,0.2799],
   [0.3279,0.2700],[0.3459,0.2500],[0.3519,0.2320],[0.3739,0.2500],[0.3879,0.2540],
   [0.4119,0.2520],[0.4299,0.2420],[0.4419,0.2280],[0.4499,0.2060],[0.4499,0.1860],
   [0.4319,0.1040],[0.2420,-0.5759],[0.2300,-0.5999],[0.2160,-0.6139],[0.1920,-0.6259],
   [0.1600,-0.6279],[0.1300,-0.6139],[0.1140,-0.5979],[0.1020,-0.5679],[0.1020,-0.5439],
   [0.2200,-0.1900],[0.2899,0.0060],[0.3279,0.1300],[0.3259,0.1340],[0.1200,-0.1420],
   [-0.1400,-0.5099],[-0.1580,-0.5239],[-0.1860,-0.5339],[-0.2020,-0.5339]],
];

// Draws a smooth closed path through pts using quadratic curves between
// consecutive point midpoints — same smoothing technique as the starfish,
// removes the jagged/faceted look of a plain lineTo polygon.
function shellSmoothPath(ctx, pts) {
  const n = pts.length;
  ctx.beginPath();
  ctx.moveTo((pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
  for (let i = 1; i <= n; i++) {
    const p0 = pts[i % n];
    const p1 = pts[(i + 1) % n];
    const midX = (p0.x + p1.x) / 2;
    const midY = (p0.y + p1.y) / 2;
    ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
  }
  ctx.closePath();
}

// Static mob — no animation, no phase/hit parameters.
export function drawShell(ctx, x, y, r) {
  const basePts = SHELL_OUTLINE.map(([nx, ny]) => ({ x: nx * r, y: ny * r }));
  const borderColor = '#6b4a2f';

  ctx.save();
  ctx.translate(x, y);

  // Border — larger copy of the same path, offset outward evenly
  shellSmoothPath(ctx, offsetOutlinePerp(basePts, r * 0.05));
  ctx.fillStyle = borderColor;
  ctx.fill();

  // Body fill — the traced silhouette itself, inset slightly so the border reads evenly
  shellSmoothPath(ctx, offsetOutlinePerp(basePts, -r * 0.025));
  ctx.fillStyle = '#e8b96a';
  ctx.fill();

  // Ridges — filled shapes traced from the same reference, same color as the
  // border so they read as part of the shell's structure rather than a
  // separate marking.
  ctx.restore();
}

// ── Crab ──────────────────────────────────────────────────────────────────────
// Traced from a hand-drawn reference: an oval body with 6 limbs of 3 distinct
// shapes (2 two-pronged claws, 2 three-pronged feet, 2 plain capsule legs),
// each anchored at its own irregular angle rather than a neat symmetric ring.
// Limbs are drawn first, solid in the shell-border color, so their bases tuck
// under and attach to the body — the body ellipse is drawn on top and covers
// each limb's attachment point. Coordinates are normalized as fractions of r
// (traced at reference body half-height, then divided down) so the shape
// scales cleanly with mob size, matching the convention used elsewhere in
// this file (see STARFISH_OUTLINE, SHELL_OUTLINE).
const CRAB_CLAW_L = [[-1.414,-0.355],[-1.412,-0.451],[-1.343,-0.607],[-1.252,-0.721],[-1.151,-0.795],[-1.042,-0.838],[-0.917,-0.855],[-0.769,-0.835],[-0.649,-0.781],[-0.749,-0.609],[-0.815,-0.456],[-0.93,-0.422],[-1.148,-0.255],[-1.208,-0.238],[-1.228,-0.254],[-1.232,-0.313],[-1.201,-0.475],[-1.36,-0.364]];
const CRAB_CLAW_BIG = [[-1.414,0.355],[-1.412,0.451],[-1.343,0.607],[-1.252,0.721],[-1.151,0.795],[-1.042,0.838],[-0.917,0.855],[-0.769,0.835],[-0.649,0.781],[-0.749,0.609],[-0.815,0.456],[-0.93,0.422],[-1.148,0.255],[-1.208,0.238],[-1.228,0.254],[-1.232,0.313],[-1.201,0.475],[-1.36,0.364]];

const CRAB_DETAIL_1 = [[-0.499,0.452],[-0.398,0.402],[-0.294,0.354],[-0.174,0.314],[-0.044,0.287],[0.094,0.271],[0.227,0.274],[0.345,0.29],[0.455,0.316],[0.565,0.348]];
const CRAB_DETAIL_2 = [[-0.555,-0.326],[-0.453,-0.301],[-0.342,-0.282],[-0.226,-0.269],[-0.099,-0.271],[0.037,-0.283],[0.17,-0.303],[0.285,-0.337],[0.393,-0.378],[0.491,-0.425]];

// Single leg template, local space, anchor (attachment point) at the origin,
// pointing outward along +x — reused for all 8 legs via placement below.
const CRAB_LEG_TEMPLATE = [[0.0,-0.13],[0.425,-0.118],[0.722,-0.085],[0.85,0.0],[0.722,0.085],[0.425,0.118],[0.0,0.13],[-0.05,0.0]];

// Fixed placement (edge angle = position on the body ellipse, out angle =
// direction the leg points) for all 8 legs, tuned by hand so the legs read
// as naturally attached and spread rather than a symmetric ring. Each leg
// also carries its own phaseOffset/rate so their swing animation runs out
// of sync with one another rather than all 8 moving in lockstep.
const CRAB_LEGS = [
  { edge: -112, out: -117, length: 1.25, tuck: 0.28, phaseOffset: 0.4,  rate: 1.05 },
  { edge: -86,  out: -102, length: 1.25, tuck: 0.28, phaseOffset: 2.1,  rate: 0.92 },
  { edge: -57,  out: -76,  length: 1.25, tuck: 0.28, phaseOffset: 3.6,  rate: 1.18 },
  { edge: -44,  out: -43,  length: 1.25, tuck: 0.28, phaseOffset: 5.0,  rate: 0.85 },
  { edge: 112,  out: 117,  length: 1.25, tuck: 0.28, phaseOffset: 1.2,  rate: 1.12 },
  { edge: 86,   out: 102,  length: 1.25, tuck: 0.28, phaseOffset: 3.0,  rate: 0.95 },
  { edge: 57,   out: 76,   length: 1.25, tuck: 0.28, phaseOffset: 4.4,  rate: 1.25 },
  { edge: 44,   out: 43,   length: 1.25, tuck: 0.28, phaseOffset: 5.7,  rate: 0.88 },
];

// Draws a smooth closed path through pts using quadratic curves between
// consecutive point midpoints — same smoothing technique as the starfish/
// shell, removes the jagged/faceted look of a plain lineTo polygon.
function crabSmoothPath(ctx, pts) {
  const n = pts.length;
  ctx.beginPath();
  ctx.moveTo((pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2);
  for (let i = 1; i <= n; i++) {
    const p0 = pts[i % n];
    const p1 = pts[(i + 1) % n];
    const midX = (p0[0] + p1[0]) / 2;
    const midY = (p0[1] + p1[1]) / 2;
    ctx.quadraticCurveTo(p0[0], p0[1], midX, midY);
  }
  ctx.closePath();
}

// Strokes an open curve (not closed) through pts using the same
// quadratic-through-midpoints smoothing, for the shell highlight lines.
function crabStrokeCurve(ctx, pts) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
  }
  ctx.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]);
  ctx.stroke();
}

function crabDrawLimb(ctx, pts, fill) {
  crabSmoothPath(ctx, pts);
  ctx.fillStyle = fill;
  ctx.fill();
}

// Places a leg from CRAB_LEG_TEMPLATE so its anchor sits on the body edge at
// edgeDeg, pointing outward at outDeg (+ swing, in degrees). The leg only
// rotates about its own fixed anchor point — the anchor's (x,y) never moves,
// matching the scorpion-style "clock hand" swing rather than a lift/step.
function crabPlaceLeg(edgeDeg, outDeg, length, tuck, swingDeg) {
  const bw = 1.0, bh = 1.23;
  const edgeRad = edgeDeg * Math.PI / 180;
  let ax = bw * Math.cos(edgeRad);
  let ay = bh * Math.sin(edgeRad);
  const edgeLen = Math.hypot(ax, ay);
  ax -= (ax / edgeLen) * tuck;
  ay -= (ay / edgeLen) * tuck;
  const outRad = (outDeg + swingDeg) * Math.PI / 180;
  return CRAB_LEG_TEMPLATE.map(([px, py]) => {
    const rx = px * length * Math.cos(outRad) - py * length * Math.sin(outRad);
    const ry = px * length * Math.sin(outRad) + py * length * Math.cos(outRad);
    return [ax + rx, ay + ry];
  });
}

// legPhase: external animation clock (radians), same convention as
// drawSpider/drawScorpion's legPhase — advance it each frame while the crab
// is moving. Each leg swings out of sync via its own phaseOffset/rate, so
// all 8 legs never move in unison. Static (legPhase=0, the default) still
// renders a sensible resting pose since sin(0 + offset) is just a fixed
// small swing baked into the same placement math.
export function drawCrab(ctx, x, y, r, facing = 0, legPhase = 0) {
  const shellColor  = '#de7048';
  const shellBorder = '#ac5a3a';
  const limbColor   = '#48201e';

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing);
  ctx.lineJoin = 'round';
  ctx.lineCap  = 'round';

  const scaled = pts => pts.map(([px, py]) => [px * r, py * r]);

  // Legs — solid limb color, drawn before the body so their attachment
  // points sit underneath the shell edge. Each leg's swing angle is driven
  // by the shared legPhase plus its own fixed offset/rate.
  CRAB_LEGS.forEach(leg => {
    const swing = Math.sin(legPhase * leg.rate + leg.phaseOffset) * 16;
    const legPts = crabPlaceLeg(leg.edge, leg.out, leg.length, leg.tuck, swing);
    crabDrawLimb(ctx, scaled(legPts), limbColor);
  });

  // Claws — same limb color, static placement (no swing).
  crabDrawLimb(ctx, scaled(CRAB_CLAW_L),   limbColor);
  crabDrawLimb(ctx, scaled(CRAB_CLAW_BIG), limbColor);

  // Body — border ellipse then inset fill ellipse, same layering as the
  // rest of the file's two-tone bodies (see drawSpider, ant helpers). The
  // fill ellipse is pulled in further than usual (0.82 vs the more common
  // ~0.95) for a visibly thicker shell rim.
  const bw = r * 1.0;
  const bh = r * 1.23;

  ctx.beginPath();
  ctx.ellipse(0, 0, bw, bh, 0, 0, Math.PI * 2);
  ctx.fillStyle = shellBorder;
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(0, 0, bw * 0.82, bh * 0.82, 0, 0, Math.PI * 2);
  ctx.fillStyle = shellColor;
  ctx.fill();

  // Shell detail — two curved highlight strokes, same limb color as the
  // legs/claws so the whole shell reads as one consistent dark tone against
  // the lighter body fill.
  ctx.strokeStyle = limbColor;
  ctx.lineWidth   = r * 0.16;
  ctx.lineCap     = 'round';
  crabStrokeCurve(ctx, scaled(CRAB_DETAIL_1));
  crabStrokeCurve(ctx, scaled(CRAB_DETAIL_2));

  ctx.restore();
}

// ── Leech ─────────────────────────────────────────────────────────────────────
// ============================================================================
// MOVEMENT MODEL — READ BEFORE WIRING THIS INTO THE GAME
// ============================================================================
// The leech's body is NOT a static shape animated in place the way, say,
// drawJellyfish bends its tentacles with a sine wave applied inside one draw
// call. The leech works like a snake / the game's existing centipede chain:
//
//   - The HEAD (the end with the two pincers) is the only part that has its
//     own independent movement — it's what steers, accelerates, and responds
//     to the leech's AI/target the way any normal mob's x/y does today.
//   - The BODY is not animated on its own at all. It has no independent
//     bend/wave/phase applied to it in the draw call. Instead, the body's
//     shape simply FOLLOWS wherever the head has already been — the same
//     "trailing" idea as the centipede's chained segments in mobs.js
//     (spawnCentipede / segSpacing / chainArr), except here it should read
//     as one continuous smooth body instead of separate circular segments.
//   - Concretely, this means the real implementation needs a short history
//     of the head's past positions (a small ring buffer of {x,y} recorded
//     once per frame/tick while the head moves), and the body curve should
//     be drawn by threading a smooth path (e.g. quadratic/Catmull-Rom
//     through those recorded points) from the head backward. Turn the head
//     sharply and the body should lag and curl through the turn a moment
//     later, like a real leech/snake — not pivot rigidly as one stiff piece.
//   - Nothing about the body is "stiff": there is no fixed body silhouette
//     baked in at a fixed angle relative to the head like the crab's shell.
//     The curve in LEECH_POSE_BODY below is ONLY a resting/icon pose, not
//     the shape the body holds while alive and moving.
//
// This means drawLeech's eventual real signature will need to take the
// head's position history as a parameter (e.g. an array of recent {x,y}
// points, oldest-to-newest or newest-to-oldest — decide when wiring this up
// alongside whatever mobs.js ends up storing per-frame), not just a single
// static facing angle. That plumbing does not exist yet — spawnMob/mobs.js
// would need to start recording a trail buffer per mob, the way centipede
// chains store multiple mob objects today, except here it's one mob storing
// its own position history rather than multiple chained mob objects.
//
// DO NOT wire drawLeech into drawMob / the live game yet. This section only
// exists so the intended pose/geometry is on record. drawLeechPose() below
// is safe to use right now for anything static (population cards, the mob
// index/gallery, tooltips) since those only ever need one fixed snapshot,
// never live per-frame body movement.
// ============================================================================

// LEECH_POSE_BODY / LEECH_POSE_PINCER_L / LEECH_POSE_PINCER_R — the exact
// resting pose to use for icons (population cards, mob gallery/index, any
// other static thumbnail). This is a SNAPSHOT pose only. Coordinates are
// authored directly in a 380x380 icon space (not normalized to a mob radius
// like the rest of this file's mobs) since this pose is only ever drawn at
// one fixed size for UI chrome, never scaled to a live in-game mob radius.
// If a scalable version is needed later, these would need to be normalized
// the same way CRAB_CLAW_L etc. are (divided down by a reference radius).
const LEECH_POSE_BODY = { d: [90, 70, 110, 200, 190, 260, 260, 310, 300, 300] }; // M x0 y0 Q c1x c1y x1 y1 Q c2x c2y x2 y2
const LEECH_POSE_PINCER_L = { start: [72, 82], ctrl: [42.73, 59.37], end: [33.5, 23.54], rotation: 23 };
const LEECH_POSE_PINCER_R = { start: [97, 82], ctrl: [126.27, 59.37], end: [135.5, 23.54], rotation: -23 };

// Draws the leech's fixed icon/index pose — the exact pose approved for
// population cards and the mob gallery. Not used for live in-game mobs (see
// the movement-model comment above); this is a static snapshot only, so it
// takes no facing/phase/position-history parameters.
export function drawLeechPose(ctx, x, y) {
  const bodyColor  = '#3d3d3d';
  const pincerColor = '#000000';

  ctx.save();
  ctx.translate(x, y);
  ctx.lineCap = 'round';

  // Pincers — drawn first so the body can sit on top of their base if this
  // pose is ever repositioned/rescaled and the anchor points shift.
  [LEECH_POSE_PINCER_L, LEECH_POSE_PINCER_R].forEach(p => {
    ctx.save();
    ctx.translate(p.start[0], p.start[1]);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.translate(-p.start[0], -p.start[1]);
    ctx.strokeStyle = pincerColor;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(p.start[0], p.start[1]);
    ctx.quadraticCurveTo(p.ctrl[0], p.ctrl[1], p.end[0], p.end[1]);
    ctx.stroke();
    ctx.restore();
  });

  // Body — two-tone (black border, dark gray fill), same layered-stroke
  // trick used elsewhere in this file for a clean outline without a
  // separate offset-outline path.
  const [x0, y0, c1x, c1y, x1, y1, c2x, c2y, x2, y2] = LEECH_POSE_BODY.d;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 82;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.quadraticCurveTo(c1x, c1y, x1, y1);
  ctx.quadraticCurveTo(c2x, c2y, x2, y2);
  ctx.stroke();

  ctx.strokeStyle = bodyColor;
  ctx.lineWidth = 66;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.quadraticCurveTo(c1x, c1y, x1, y1);
  ctx.quadraticCurveTo(c2x, c2y, x2, y2);
  ctx.stroke();

  ctx.restore();
}

// TODO(leech live animation): approved pincer vibration values from tuning —
// dist: 3 (degrees of swing off each pincer's resting rotation)
// speed: 0.5 (oscillation rate multiplier)
// Applied the same way antMandibles layers jitter onto a base angle:
//   const jitter = Math.sin(t * 4.5 * speed) * dist;
//   pincerL.rotation = LEECH_POSE_PINCER_L.rotation + jitter;
//   pincerR.rotation = LEECH_POSE_PINCER_R.rotation - jitter;
// where t accumulates over time (e.g. a shared animation clock param, same
// convention as legPhase/tentaclePhase elsewhere in this file). This jitter
// is independent of the snake-follow body movement described above — the
// pincers vibrate in place at the head regardless of whether the head is
// currently moving.

// ── Sponge ────────────────────────────────────────────────────────────────────
// Ported from sponge_outline_tuner.html. That tuner's slider was used to
// pick a ridge (scallop) depth for the outline; the approved/tuned value was
// 8 out of a 0..35 range, so it's baked in below as SPONGE_RIDGE_DEPTH
// rather than exposed as a live parameter. Not wired into drawMob / any
// mob.typeId case yet — this is just the ported drawing code, present in
// the file per request, with no hookup.
//
// Geometry note: the tuner authored everything in an unscaled 380x380 icon
// space (center (190,190), base outline radius 130). Below, that's
// normalized the same way the rest of this file normalizes fixed shapes
// (e.g. CRAB_LEG_TEMPLATE) — divided down by the base radius — so the
// outline and its holes scale with a mob's radius `r` like every other
// draw* function here, instead of being locked to one fixed pixel size.

const SPONGE_RIDGE_DEPTH   = 8;     // tuned value from the slider (range was 0-35)
const SPONGE_RIDGE_BUMPS   = 13;    // number of scallops around the outline
const SPONGE_OUTLINE_STEPS = 120;   // point density for the smoothed outline
const SPONGE_BASE_R        = 130;   // the tuner's un-normalized base outline radius

// Hole/pore circles, ported from the tuner's <circle> elements and
// normalized to [nx, ny, nr] as fractions of SPONGE_BASE_R so they scale
// with a mob radius `r` (final position/size = cx + nx*r, cy + ny*r, nr*r).
const SPONGE_HOLES = [
  [0.0762,  0.0762,  0.0615],
  [0.1815,  0.2862,  0.1154],
  [0.4454,  0.5015,  0.1769],
  [-0.0762, 0.0762,  0.0615],
  [-0.2862, 0.1815,  0.1154],
  [-0.5015, 0.4454,  0.1769],
  [-0.0762, -0.0762, 0.0615],
  [-0.1815, -0.2862, 0.1154],
  [-0.4454, -0.5015, 0.1769],
  [0.0762,  -0.0762, 0.0615],
  [0.2862,  -0.1815, 0.1154],
  [0.5015,  -0.4454, 0.1769],
  [0.62,    0.0985,  0.0531],
  [0.1069,  0.57,    0.07],
  [-0.09,   -0.7054, 0.0677],
  [-0.1677, -0.5723, 0.0408],
  [-0.1031, 0.4085,  0.0431],
  [0.4138,  0.0846,  0.0554],
  [-0.2946, 0.6854,  0.0738],
  [-0.7923, -0.1469, 0.0908],
  [-0.4392, -0.0015, 0.0485],
  [0.7054,  -0.2446, 0.0431],
];

// Builds the scalloped outline points, same math as the tuner's
// scallopedCircle(): a base circle whose radius oscillates sinusoidally
// (bumps cycles per revolution, +/- bumpDepth) to give the ridged edge.
function spongeScallopedPoints(baseR, bumps, bumpDepth, n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = 2 * Math.PI * i / n;
    const r = baseR + Math.sin(t * bumps) * bumpDepth;
    pts.push([r * Math.cos(t), r * Math.sin(t)]);
  }
  return pts;
}

// Traces the scalloped points as a smooth closed loop on ctx, same
// midpoint-quadratic smoothing as the tuner's smoothClosedPath(), just
// emitting canvas calls instead of an SVG path string.
function spongeTraceSmoothClosedPath(ctx, pts) {
  const n = pts.length;
  const startX = (pts[0][0] + pts[1][0]) / 2;
  const startY = (pts[0][1] + pts[1][1]) / 2;
  ctx.moveTo(startX, startY);
  for (let i = 1; i <= n; i++) {
    const p0 = pts[i % n];
    const p1 = pts[(i + 1) % n];
    const mx = (p0[0] + p1[0]) / 2;
    const my = (p0[1] + p1[1]) / 2;
    ctx.quadraticCurveTo(p0[0], p0[1], mx, my);
  }
}

// Not wired into drawMob or any mob.typeId case — present but unhooked,
// per request. No animation params; draws one static pose at (x, y) scaled
// to radius r, same call shape as the file's other static draw* functions
// (e.g. drawHive, drawAntEgg).
export function drawSponge(ctx, x, y, r) {
  const fillColor   = '#c4945c';
  const borderColor = '#6b4a2e';
  const scale = r / SPONGE_BASE_R;

  ctx.save();
  ctx.translate(x, y);

  // Outline — scalloped ridge edge, ridge depth fixed at the tuned value.
  const outlinePts = spongeScallopedPoints(
    SPONGE_BASE_R, SPONGE_RIDGE_BUMPS, SPONGE_RIDGE_DEPTH, SPONGE_OUTLINE_STEPS
  ).map(([px, py]) => [px * scale, py * scale]);

  ctx.fillStyle   = fillColor;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth   = r * (6 / SPONGE_BASE_R);
  ctx.beginPath();
  spongeTraceSmoothClosedPath(ctx, outlinePts);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Holes/pores — same two-tone fill+stroke treatment as the tuner's circles.
  SPONGE_HOLES.forEach(([nx, ny, nr]) => {
    const hx = nx * r;
    const hy = ny * r;
    const hr = nr * r;
    ctx.beginPath();
    ctx.arc(hx, hy, hr, 0, Math.PI * 2);
    ctx.fillStyle   = '#f5ead9';
    ctx.strokeStyle = borderColor;
    ctx.lineWidth   = Math.max(1, hr * 0.22);
    ctx.fill();
    ctx.stroke();
  });

  ctx.restore();
}