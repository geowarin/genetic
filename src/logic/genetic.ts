import { randomImgNumber, randomName } from "./random";
import { generateFace, getImageData, loadImage } from "./canvas";
import { compare } from "../image-ssim";
import { nanoid } from "nanoid";
import { asSequence, range } from "sequency";

const POPULATION_SIZE = 10;
const NB_CHROMOSOMES = 9;
const SELECTION_NUM = 6;

export interface Person {
  face: CanvasRenderingContext2D;
  chromosome: number[];
  id: string;
  name: string;
}

export type RatedPerson = Person & { rating: number };

type Fitness = (person: Person) => number;

export interface GeneticsResult {
  population: RatedPerson[];
  selected: RatedPerson[];
  children: RatedPerson[];
  mutants: RatedPerson[];
  newPopulation: RatedPerson[];
}

function array(length: number) {
  return Array.from({ length });
}

export function randomChromosome() {
  return array(NB_CHROMOSOMES).map(randomImgNumber);
}

function fitness(target: ImageData) {
  return (person: Person) => {
    const imageData = getImageData(person.face);
    return compare(imageData, target).ssim;
  };
}

async function generateRandomPopulation(): Promise<Person[]> {
  const chromosomes = array(POPULATION_SIZE).map(randomChromosome);
  return Promise.all(chromosomes.map((c) => createPerson(randomName(), c)));
}

function selection(population: RatedPerson[]): RatedPerson[] {
  return asSequence(population)
    .sortedByDescending((p) => p.rating)
    .take(SELECTION_NUM)
    .toArray();
}

function createPerson(name: string, chromosome: number[]): Promise<Person> {
  return generateFace(chromosome).then((face) => ({
    face,
    chromosome,
    id: nanoid(),
    name,
  }));
}

async function crossOver(population: Person[]): Promise<Person[]> {
  const futurePersons = asSequence(population)
    .chunk(2)
    .flatMap(([one, two]) => {
      const chromosome = range(0, NB_CHROMOSOMES - 1)
        .map((index) => {
          return Math.random() > 0.5
            ? one.chromosome[index]
            : two.chromosome[index];
        })
        .toArray();
      return createPerson(one.name + " " + two.name, chromosome);
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

function rateWith(fitness: Fitness) {
  return (population: Person[]) =>
    population.map((p) => ({ ...p, rating: fitness(p) }));
}

export async function doGenetics(): Promise<GeneticsResult> {
  const target = await loadImage("face-2.jpg");
  const rate = rateWith(fitness(target));

  const population = rate(await generateRandomPopulation());

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
