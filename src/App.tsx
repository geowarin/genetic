import { useAsset } from "use-asset";
import { Canvas } from "./components/Canvas";
import { doGenetics, RatedPerson } from "./logic/genetic";
import classNames from "classnames";

export function App() {
  const results = useAsset(() => doGenetics());

  return (
    <>
      <h2>Population</h2>
      <div className="portraits">
        {results.population.map((p) => (
          <Portrait
            key={p.id}
            person={p}
            className={classNames({
              selected: results.newPopulation.includes(p),
            })}
          />
        ))}
      </div>
      <h2>Children</h2>
      <div className="portraits">
        {results.children.map((p) => (
          <Portrait
            key={p.id}
            person={p}
            className={classNames({
              selected: results.newPopulation.includes(p),
            })}
          />
        ))}
      </div>
      <h2>Mutants</h2>
      <div className="portraits">
        {results.mutants.map((p) => (
          <Portrait
            key={p.id}
            person={p}
            className={classNames({
              selected: results.newPopulation.includes(p),
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
