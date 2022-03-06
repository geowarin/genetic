import { getImageData, loadImage } from "./canvas";
import { compare } from "../image-ssim";
import { asSequence } from "sequency";
import {
  array,
  createPerson,
  generateRandomPopulation,
  GeneticsResult,
  RatedPerson,
  rateWith,
} from "./utils";
import { NB_CHROMOSOMES, NB_PARENTS, POPULATION_SIZE } from "./constants";
import { randomElement } from "./random";

export interface Person {
  face: CanvasRenderingContext2D;
  chromosome: number[];
  id: string;
  name: string;
}

function fitness(target: ImageData) {
  return (person: Person) => {
    const imageData = getImageData(person.face);
    return compare(imageData, target).ssim;
  };
}

function selection(population: RatedPerson[]): RatedPerson[] {
  return asSequence(population)
    .sortedByDescending((p) => p.rating)
    .take(NB_PARENTS)
    .toArray();
}

async function crossOver(population: Person[]): Promise<Person[]> {
  const futurePersons = asSequence(population)
    .chunk(2)
    .flatMap(([one, two]) => {
      const chromosome = array(NB_CHROMOSOMES).map((_, index) => {
        return Math.random() > 0.5
          ? one.chromosome[index]
          : two.chromosome[index];
      });
      const nameOne = randomElement(one.name.split(" "));
      const nameTwo = randomElement(two.name.split(" "));
      return createPerson(nameOne + " " + nameTwo, chromosome);
    });
  return Promise.all(futurePersons);
}

function replacement(population: RatedPerson[]): RatedPerson[] {
  return asSequence(population)
    .sortedByDescending((p) => p.rating)
    .take(POPULATION_SIZE)
    .toArray();
}

function mutation(population: Person[]): Person[] {
  return [];
}

async function iteration(
  rate: (population: Person[]) => RatedPerson[],
  initialPopulation: Person[]
): Promise<GeneticsResult> {
  const population = rate(initialPopulation);

  const selected = selection(population);

  const children = rate(await crossOver(selected));
  const mutants = rate(mutation(population));

  const newPopulation = replacement([...population, ...mutants, ...children]);

  return {
    population,
    selected,
    children,
    mutants,
    newPopulation,
  };
}

export async function doGenetics(
  iterations: number = 1
): Promise<GeneticsResult> {
  const target = await loadImage("face-2.jpg");
  const initialPopulation = await generateRandomPopulation();
  const rate = rateWith(fitness(target));
  let geneticsResult = await iteration(rate, initialPopulation);
  for (let i = 1; i < iterations; i++) {
    geneticsResult = await iteration(rate, geneticsResult.newPopulation);
  }
  return geneticsResult;
}
