import { NB_FACES } from "./constants";

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randImagePath() {
  const rand = random(1, NB_FACES);
  return `face-${rand}.jpg`;
}

export function randomImgNumber(): number {
  return random(1, NB_FACES);
}

export function randomChromosome() {
  return [
    randomImgNumber(),
    randomImgNumber(),
    randomImgNumber(),
    randomImgNumber(),
    randomImgNumber(),
    randomImgNumber(),
    randomImgNumber(),
    randomImgNumber(),
    randomImgNumber(),
  ];
}
