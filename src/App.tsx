import { useEffect, useState } from "react";
import { compare, CompareResult } from "./image-ssim";
import { generateFace, getImageData, loadImage } from "./logic/canvas";
import { randomChromosome } from "./logic/random";
import { useAsset } from "use-asset";
import { Canvas } from "./components/Canvas";

const DISPLAY_SCALE = 0.5;

export function App() {
  const [result, setResult] = useState<CompareResult>();

  const [randomFace, target] = useAsset(async () => {
    return [
      await generateFace(randomChromosome()),
      await loadImage("face-2.jpg"),
    ];
  });

  useEffect(() => {
    const compareResult = compare(getImageData(randomFace), target);
    setResult(compareResult);
  }, [target]);

  return (
    <>
      <h2>Result {result?.ssim}</h2>
      <Canvas image={randomFace} scale={DISPLAY_SCALE} />
    </>
  );
}
