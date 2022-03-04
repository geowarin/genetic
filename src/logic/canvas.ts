import { IMG_SIZE } from "./constants";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = IMG_SIZE;
  canvas.height = IMG_SIZE;
  return canvas.getContext("2d")!;
}

export function loadImage(path: string): Promise<ImageData> {
  return loadImageRect(path, {
    x: 0,
    y: 0,
    width: IMG_SIZE,
    height: IMG_SIZE,
  });
}

export function loadImageRect(
  path: string,
  { x, y, width, height }: Rect
): Promise<ImageData> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const ctx = createCanvas();
      ctx.drawImage(img, 0, 0, IMG_SIZE, IMG_SIZE);
      const imageData = ctx.getImageData(x, y, width, height);
      resolve(imageData);
    };
    img.src = path;
  });
}

function facePath(number: number) {
  return `face-${number}.jpg`;
}

export function generateFace(
  chromosomes: number[]
): Promise<CanvasRenderingContext2D> {
  const ctx = createCanvas();
  const nbSegments = chromosomes.length;

  const rects = generateSubdivisionRects(nbSegments);
  const imgPromises = rects.map((rect, index) =>
    loadImageRect(facePath(chromosomes[index]), rect)
  );
  return Promise.all(imgPromises).then((img) => {
    for (let i = 0; i < nbSegments; i++) {
      const { y, x } = rects[i];
      ctx.putImageData(img[i], x, y);
    }
    return ctx;
  });
}

export function generateSubdivisionRects(nbSegments: number): Rect[] {
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
