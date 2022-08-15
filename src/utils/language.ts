import { createSignal } from "solid-js";
import { Language } from "../constants/languages";

const prefferedLanguage = localStorage.getItem("language");

export const [language, setLanguage] = createSignal(prefferedLanguage as Language || Language.ENGLISH);