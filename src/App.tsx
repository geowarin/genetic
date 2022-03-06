import { useAsset } from "use-asset";
import { Canvas } from "./components/Canvas";
import { doGenetics } from "./logic/genetic";
import classNames from "classnames";
import { RatedPerson } from "./logic/utils";
import { NB_ITERATIONS } from "./logic/constants";
import { useState } from "react";

export function App() {
  const [generation, setGeneration] = useState(0);
  const results = useAsset(() => doGenetics(NB_ITERATIONS));

  const geneticsResults = results[generation];
  return (
    <>
      <h2>Generation {generation}</h2>
      <div>
        <input
          type="range"
          min="0"
          max={NB_ITERATIONS - 1}
          value={generation}
          onChange={(e) => setGeneration(parseInt(e.target.value))}
        />
      </div>

      <h2>Population</h2>
      <div className="portraits">
        {geneticsResults.population.map((p) => (
          <Portrait
            key={p.id}
            person={p}
            className={classNames({
              selected: geneticsResults.newPopulation.includes(p),
            })}
          />
        ))}
      </div>
      <h2>Children</h2>
      <div className="portraits">
        {geneticsResults.children.map((p) => (
          <Portrait
            key={p.id}
            person={p}
            className={classNames({
              selected: geneticsResults.newPopulation.includes(p),
            })}
          />
        ))}
      </div>
      <h2>Mutants</h2>
      <div className="portraits">
        {geneticsResults.mutants.map((p) => (
          <Portrait
            key={p.id}
            person={p}
            className={classNames({
              selected: geneticsResults.newPopulation.includes(p),
            })}
          />
        ))}
      </div>
    </>
  );
}

type PortraitProps = { person: RatedPerson; className?: string };

function Portrait({ person, className }: PortraitProps) {
  return (
    <div className={"portrait " + className}>
      <Canvas image={person.face} scale={0.2} />
      <span>{person.name}</span>
      <span>{Math.ceil(person.rating * 10000) / 100}%</span>
    </div>
  );
}
