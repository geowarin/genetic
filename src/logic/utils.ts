import { randomImgNumber, randomName } from "./random";
import { generateFace } from "./canvas";
import { nanoid } from "nanoid";
import { Person } from "./genetic";
import { NB_CHROMOSOMES, POPULATION_SIZE } from "./constants";

export type RatedPerson = Person & { rating: number };

type Fitness = (person: Person) => number;

export interface GeneticsResult {
  population: RatedPerson[];
  selected: RatedPerson[];
  children: RatedPerson[];
  mutants: RatedPerson[];
  newPopulation: RatedPerson[];
}

export function array(length: number) {
  return Array.from({ length });
}

export function randomChromosome() {
  return array(NB_CHROMOSOMES).map(randomImgNumber);
}

export function generateRandomPopulation(): Promise<Person[]> {
  const chromosomes = array(POPULATION_SIZE).map(randomChromosome);
  return Promise.all(chromosomes.map((c) => createPerson(randomName(), c)));
}

export function createPerson(
  name: string,
  chromosome: number[]
): Promise<Person> {
  return generateFace(chromosome).then((face) => ({
    face,
    chromosome,
    id: nanoid(),
    name,
  }));
}

export function rateWith(fitness: Fitness) {
  return (population: Person[]) =>
    population.map((p) => ({ ...p, rating: fitness(p) }));
}
