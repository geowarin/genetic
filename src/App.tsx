import { useEffect, useRef, useState } from "react";
import { compare, IResult } from "./image-ssim";
import { IMG_SIZE } from "./logic/constants";
import { generateFace, loadImage } from "./logic/canvas";
import { randomImgNumber } from "./logic/random";

const DISPLAY_SCALE = 0.5;

export function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<IResult>();

  useEffect(() => {
    const canvas = ref.current;
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext("2d")!;

    const randomFace = generateFace([
      randomImgNumber(),
      randomImgNumber(),
      randomImgNumber(),
      randomImgNumber(),
    ]);
    Promise.all([randomFace, loadImage("face-2.jpg")]).then(
      ([mosaic, target]) => {
        const mosaicImage = mosaic.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
        const result = compare(mosaicImage, target);
        setResult(result);
        ctx.scale(DISPLAY_SCALE, DISPLAY_SCALE);
        ctx.drawImage(mosaic.canvas, 0, 0);
      }
    );
  }, [ref]);

  return (
    <div>
      <h2>Result {result?.ssim}</h2>
      <canvas
        ref={ref}
        width={IMG_SIZE * DISPLAY_SCALE}
        height={IMG_SIZE * DISPLAY_SCALE}
      />
    </div>
  );
}
