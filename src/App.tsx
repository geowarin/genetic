import { useAsset } from "use-asset";
import { Canvas } from "./components/Canvas";
import { doGenetics } from "./logic/genetic";

const DISPLAY_SCALE = 0.5;

export function App() {
  const results = useAsset(() => doGenetics());

  return (
    <>
      <h2>Winner {results.bestFit.score}</h2>
      <Canvas image={results.bestFit.element.face} scale={DISPLAY_SCALE} />

      <h2>Population</h2>
      <div>
        {results.population.map((p) => (
          <Canvas image={p.face} scale={0.2} />
        ))}
      </div>
    </>
  );
}
