import { createSignal } from "solid-js";
import { Language } from "../constants/languages";
import { WORDS as WORDS_ENG } from "../constants/wordsEN";
import { WORDS as WORDS_PL } from "../constants/wordsPL";
import { language } from "./language";

export const WORDS = () => (language() === Language.ENGLISH ? WORDS_ENG : WORDS_PL);

export const getRandomWord = () => {
  return WORDS()[Math.floor(Math.random() * WORDS().length)];
};

export const [randomWord, setRandomWord] = createSignal(getRandomWord());