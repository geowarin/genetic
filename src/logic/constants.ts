export const IMG_SIZE = 1024;
const DIVISIONS = 2;
export const NB_SEGMENTS = DIVISIONS * DIVISIONS;
const RECT_SIZE = IMG_SIZE / DIVISIONS;

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const rects: Rect[] = Array.from({ length: NB_SEGMENTS }).map((_, i) => {
  const x = Math.floor(i / DIVISIONS);
  const y = i % DIVISIONS;
  return {
    x: x * RECT_SIZE,
    y: y * RECT_SIZE,
    width: RECT_SIZE,
    height: RECT_SIZE,
  };
});
