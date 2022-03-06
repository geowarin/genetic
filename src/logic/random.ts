import { NB_FACES } from "./constants";
import { funny_words } from "../names/funny";

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randImagePath() {
  const rand = random(1, NB_FACES);
  return `face-${rand}.jpg`;
}

export function randomImgNumber(): number {
  return random(1, NB_FACES);
}

export function randomElement<T>(array: T[]): T {
  return array[random(0, array.length - 1)];
}

export function randomName(): string {
  return randomElement(funny_words);
}
