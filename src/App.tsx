import { useEffect, useRef, useState } from "react";
import { randImagePath } from "./logic/random";
import { compare, IResult } from "./image-ssim";
import { IMG_SIZE, NB_SEGMENTS, rects } from "./logic/constants";
import { createCanvas, loadImage, loadImageRect } from "./logic/canvas";

interface Toto {
  image: ImageData;
  canvas: CanvasImageSource;
}

function mosaicFace(): Promise<Toto> {
  const ctx = createCanvas();
  const imgPromises = rects.map(
    // (rect) => loadImageRect("face-2.jpg", rect)
    (rect) => loadImageRect(randImagePath(), rect)
  );
  return Promise.all(imgPromises).then((img) => {
    for (let i = 0; i < NB_SEGMENTS; i++) {
      const { y, x } = rects[i];
      ctx.putImageData(img[i], x, y);
    }
    const wholeImage = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
    ctx.putImageData(wholeImage, 0, 0);
    return {
      image: wholeImage,
      canvas: ctx.canvas,
    };
  });
}

export function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<IResult>();

  useEffect(() => {
    const canvas = ref.current;
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext("2d")!;
    mosaicFace().then((wholeImage) => {
      loadImage("face-2.jpg").then((refImage) => {
        const result = compare(wholeImage.image, refImage);
        setResult(result);
        ctx.scale(0.5, 0.5);
        ctx.drawImage(wholeImage.canvas, 0, 0);
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
