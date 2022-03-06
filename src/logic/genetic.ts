import { randomImgNumber } from "./random";
import { generateFace, getImageData, loadImage } from "./canvas";
import { compare } from "../image-ssim";
import { maxBy, MaxResult } from "./maths";

const POPULATION_SIZE = 10;
const NB_CHROMOSOMES = 9;

interface Person {
  face: CanvasRenderingContext2D;
  chromosome: number[];
}

interface GeneticsResult {
  bestFit: MaxResult<Person>;
  population: Person[];
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
  }));
}

export async function doGenetics(): Promise<GeneticsResult> {
  const target = await loadImage("face-2.jpg");
  const population = await generateRandomPopulation();
  const bestFit = maxBy(population, fitness(target));
  return {
    bestFit,
    population,
  };
}
