import { useAsset } from "use-asset";
import { Canvas } from "./components/Canvas";
import { doGenetics, Person, RatedPerson } from "./logic/genetic";
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
              selected: results.selected.includes(p),
            })}
          />
        ))}
      </div>
    </>
  );
}

type PortraitProps = { person: RatedPerson; className: string };

function Portrait({ person, className }: PortraitProps) {
  return (
    <div className={"portrait " + className}>
      <Canvas image={person.face} scale={0.2} />
      <span>{person.name}</span>
      <span>{person.rating}</span>
    </div>
  );
}
