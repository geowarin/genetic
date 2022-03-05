import { useCallback, useEffect, useState } from "react";
import { compare, IResult } from "./image-ssim";
import { IMG_SIZE } from "./logic/constants";
import { generateFace, loadImage } from "./logic/canvas";
import { randomChromosome } from "./logic/random";
import { useAsset } from "use-asset";
import { Canvas } from "./components/Canvas";

const DISPLAY_SCALE = 0.5;

export function App() {
  const [result, setResult] = useState<IResult>();

  const [randomFace, target] = useAsset(async () => {
    return [
      await generateFace(randomChromosome()),
      await loadImage("face-2.jpg"),
    ];
  });

  const draw = useCallback((ctx) => {
    ctx.drawImage(randomFace.canvas, 0, 0);
  }, []);

  useEffect(() => {
    const imageData = randomFace.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
    setResult(compare(imageData, target));
  }, [target]);

  return (
    <>
      <h2>Result {result?.ssim}</h2>
      <Canvas draw={draw} scale={DISPLAY_SCALE} />
    </>
  );
}
