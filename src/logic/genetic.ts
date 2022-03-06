import { randomImgNumber, randomName } from "./random";
import { generateFace, getImageData, loadImage } from "./canvas";
import { compare } from "../image-ssim";
import { nanoid } from "nanoid";
import { asSequence } from "sequency";

const POPULATION_SIZE = 10;
const NB_CHROMOSOMES = 9;
const SELECTION_NUM = 4;

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
  const faces = await Promise.all(chromosomes.map(generateFace));
  return chromosomes.map((chromosome, i) => ({
    face: faces[i],
    chromosome,
    id: nanoid(),
    name: randomName(),
  }));
}

function selection(population: RatedPerson[]): RatedPerson[] {
  return asSequence(population)
    .sortedByDescending((p) => p.rating)
    .take(SELECTION_NUM)
    .toArray();
}

function crossOver(population: Person[]): Person[] {
  return population;
}

function replacement(population: RatedPerson[]): RatedPerson[] {
  return [];
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

  const children = rate(crossOver(selected));
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
