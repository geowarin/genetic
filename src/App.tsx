import { useEffect, useRef, useState } from "react";
import { randImagePath } from "./random";
import { compare, IImage, IResult } from "./image-ssim";

const IMG_SIZE = 1024;
const DIVISIONS = 4;
const NB_SEGMENTS = DIVISIONS * DIVISIONS;
const RECT_SIZE = IMG_SIZE / DIVISIONS;

const rects: Rect[] = Array.from({ length: NB_SEGMENTS }).map((_, i) => {
  const x = Math.floor(i / DIVISIONS);
  const y = i % DIVISIONS;
  return {
    x: x * RECT_SIZE,
    y: y * RECT_SIZE,
    width: RECT_SIZE,
    height: RECT_SIZE,
  };
});

export function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<IResult>();

  useEffect(() => {
    const canvas = ref.current;
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext("2d")!;

    const imgPromises = rects.map(
      // (rect) => loadImageRect("face-2.jpg", rect)
      (rect) => loadImageRect(randImagePath(), rect)
    );
    Promise.all(imgPromises)
      .then((img) => {
        for (let i = 0; i < NB_SEGMENTS; i++) {
          const { y, x } = rects[i];
          ctx.putImageData(img[i], x, y);
        }
      })
      .then(() => {
        const wholeImage = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
        loadImage("face-2.jpg")
          .then(toIImage)
          .then((refImage) => {
            const result = compare(toIImage(wholeImage), refImage);
            setResult(result);
          });
      });
  }, [ref]);

  return (
    <div>
      <h2>Result {result?.ssim}</h2>
      <canvas ref={ref} width={IMG_SIZE} height={IMG_SIZE} />
    </div>
  );
}

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = IMG_SIZE;
  canvas.height = IMG_SIZE;
  return canvas.getContext("2d")!;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function toIImage(data: ImageData): IImage {
  return {
    width: data.width,
    height: data.height,
    // @ts-ignore
    data: data.data,
    channels: 4,
  };
}

function loadImage(path: string): Promise<ImageData> {
  return loadImageRect(path, {
    x: 0,
    y: 0,
    width: IMG_SIZE,
    height: IMG_SIZE,
  });
}

function loadImageRect(
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
