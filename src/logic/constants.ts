export const IMG_SIZE = 1024;

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function generateSubvisionsRects(nbSegments: number): Rect[] {
  const DIVISIONS = Math.sqrt(nbSegments);
  // const NB_SEGMENTS = DIVISIONS * DIVISIONS;
  const RECT_SIZE = IMG_SIZE / DIVISIONS;

  return Array.from({ length: nbSegments }).map((_, i) => {
    const x = Math.floor(i / DIVISIONS);
    const y = i % DIVISIONS;
    return {
      x: x * RECT_SIZE,
      y: y * RECT_SIZE,
      width: RECT_SIZE,
      height: RECT_SIZE,
    };
  });
}
