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
import {
  MUTATION_RATE,
  NB_CHROMOSOMES,
  NB_FACES,
  NB_PARENTS,
  POPULATION_SIZE,
} from "./constants";
import { random, randomElement, randomName } from "./random";

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

function mutation(population: Person[]): Promise<Person[]> {
  return Promise.all(
    asSequence(population)
      .filter((_) => Math.random() <= MUTATION_RATE)
      .map((p) => {
        const index = random(0, NB_CHROMOSOMES - 1);
        const newChromosome = [...p.chromosome];
        newChromosome[index] = random(1, NB_FACES);
        return createPerson(randomName(), newChromosome);
      })
      .toArray()
  );
}

async function iteration(
  rate: (population: Person[]) => RatedPerson[],
  population: RatedPerson[]
): Promise<GeneticsResult> {
  const selected = selection(population);

  const children = rate(await crossOver(selected));
  const mutants = rate(await mutation(population));

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
): Promise<GeneticsResult[]> {
  const target = await loadImage("face-2.jpg");
  const initialPopulation = await generateRandomPopulation();
  const rate = rateWith(fitness(target));

  const overallResults = [];
  let currentPop = rate(initialPopulation);
  for (let i = 0; i < iterations; i++) {
    const results = await iteration(rate, currentPop);
    overallResults.push(results);
    currentPop = results.newPopulation;
  }
  return overallResults;
}
