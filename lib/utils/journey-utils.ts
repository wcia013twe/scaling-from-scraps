// Upward S-curve position calculation (Candy Crush / Duolingo style)
export function getNodePosition(index: number, totalNodes: number) {
  const verticalSpacing = 180;
  const amplitude = 220; // Horizontal wave amplitude - increased from 140 to 220

  // Y goes upward (higher index = higher Y position)
  const y = index * verticalSpacing;

  // Smooth S-curve using sine wave (creates natural left-right alternation)
  const progress = index / Math.max(totalNodes - 1, 1);
  const x = Math.sin(progress * Math.PI * 3) * amplitude;

  return { x, y };
}

// Generate smooth Bézier path connecting nodes (upward progression)
export function generateBezierPath(positions: { x: number; y: number }[]) {
  if (positions.length < 2) return '';

  let path = `M ${positions[0].x} ${positions[0].y}`;

  for (let i = 0; i < positions.length - 1; i++) {
    const curr = positions[i];
    const next = positions[i + 1];

    const dx = next.x - curr.x;
    const dy = next.y - curr.y;

    // Smooth control points for natural S-curve
    const cp1x = curr.x + dx * 0.3;
    const cp1y = curr.y + dy * 0.4;
    const cp2x = curr.x + dx * 0.7;
    const cp2y = curr.y + dy * 0.6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return path;
}
