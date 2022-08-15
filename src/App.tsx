import {
  Component,
  createEffect,
  createSignal,
  For,
  onCleanup,
  Show,
} from "solid-js";
import LangSwitch from "./components/LangSwitch";
import Word, { Hint } from "./components/Word";
import { Language } from "./constants/languages";

import { language, setLanguage } from "./utils/language";
import { getRandomWord, randomWord, setRandomWord, WORDS } from "./utils/wordSet";

const DEFAULT_WORDS_STATE = ["", "", "", "", ""];

const App: Component = () => {
  const [userWord, setUserWord] = createSignal("");
  const [words, setWords] = createSignal(DEFAULT_WORDS_STATE);

  const userHasWon = () => words().some((word) => word === randomWord());
  const hasGameEnded = () =>
    words()[words().length - 1].length > 0 || userHasWon();

  const [invalidWordSubmitted, setInvalidWordSubmitted] = createSignal(false);

  const restartGame = () => {
    setWords(DEFAULT_WORDS_STATE);
    setUserWord("");
    setRandomWord(getRandomWord());
  };

  const editableIndex = () => {
    return words().findIndex((val) => val.length === 0);
  };

  const getWordHints = (word: string) => {
    const wordSplit = word.split("");

    return wordSplit.reduce<Array<Hint>>((hints, letter, index) => {
      const wordHasLetter = randomWord().includes(letter);
      const letterIsAtRightPlace = randomWord()[index] === letter;

      if (wordHasLetter) {
        return [
          ...hints,
          letterIsAtRightPlace ? Hint.GOOD_POSITION : Hint.WRONG_POSITION,
        ];
      } else {
        return [...hints, Hint.NOT_IN_WORD];
      }
    }, []);
  };

  const handleLanguageSwitch = (selectedLanguage: Language) => {
    if (selectedLanguage === language()) return;

    setLanguage(selectedLanguage);
    console.log(`Language is set to ${selectedLanguage}`);
    restartGame();
  };

  const keydownCallback = (event: KeyboardEvent) => {
    if (hasGameEnded() && event.code === "Enter") {
      restartGame();

      return;
    }

    if (event.code === "Backspace") {
      setUserWord((prev) => prev.slice(0, prev.length - 1));

      return;
    }

    if (event.code === "Enter" && userWord().length === 5) {
      if (!WORDS().includes(userWord().toLowerCase())) {
        setInvalidWordSubmitted(true);

        setTimeout(() => setInvalidWordSubmitted(false), 300);

        return;
      }

      setWords((prev) =>
        prev.map((val, index) => {
          if (index === editableIndex()) {
            return userWord();
          }

          return val;
        })
      );

      setUserWord("");

      return;
    }

    if (/^\p{Letter}$/u.test(event.key) && userWord().length < 5) {
      setUserWord((prev) => prev + event.key);
    }
  };

  document.addEventListener("keydown", keydownCallback);

  onCleanup(() => document.removeEventListener("keydown", keydownCallback));

  // Just for debug purposes
  createEffect(() => {
    console.log(`The word to guess is "${randomWord()}"`);
  });

  createEffect(() => {
    localStorage.setItem("language", language());
  });

  return (
    <div class="w-full h-screen flex flex-col items-center font-sans bg-zinc-800 text-white">
      <div class="flex flex-col items-center my-8">
        <h2 class="text-4xl mb-4">Solid Wordle</h2>
        <LangSwitch
          activeLanguage={language()}
          onLangSwitch={handleLanguageSwitch}
        />
      </div>
      <div class="flex flex-col items-center">
        <For each={words()}>
          {(word, index) => {
            return (
              <Word
                hints={getWordHints(word)}
                word={editableIndex() === index() ? userWord() : word}
                classList={{
                  "animate-shake":
                    editableIndex() === index() && invalidWordSubmitted(),
                }}
              />
            );
          }}
        </For>
        <Show when={hasGameEnded()}>
          <div class="mt-4">
            <span>
              <Show
                when={userHasWon()}
                fallback={<>You lost! The word was {randomWord()}</>}
              >
                You won!
              </Show>
              <br />
              Click the button or press Enter again to play again
            </span>
            <div class="mt-2">
              <button
                type="button"
                onclick={restartGame}
                class="rounded px-2 py-1 bg-green-500 text-white"
              >
                Play again
              </button>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default App;
