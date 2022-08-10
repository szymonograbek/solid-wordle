import { Component, createEffect, createSignal, For, onCleanup, Show } from 'solid-js';
import Word, { Hint } from './components/Word';
import { WORDS } from "./words"

const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

const DEFAULT_WORDS_STATE = ["", "", "", "", ""]

const App: Component = () => {
  const [randomWord, setRandomWord] = createSignal(getRandomWord());
  const [userWord, setUserWord] = createSignal("");
  const [words, setWords] = createSignal(DEFAULT_WORDS_STATE);

  const userHasWon = () => words().some(word => word === randomWord());
  const hasGameEnded = () => words()[words().length - 1].length > 0 || userHasWon(); 

  const restartGame = () => {
    setWords(DEFAULT_WORDS_STATE);
    setUserWord("");
    setRandomWord(getRandomWord());
  };

  const editableIndex = () => {
    return words().findIndex(val => val.length === 0);
  };

  const getWordHints = (word: string) => {
    const wordSplit = word.split("");

    return wordSplit.reduce<Array<Hint>>((hints, letter, index) => {
      const wordHasLetter = randomWord().includes(letter);
      const letterIsAtRightPlace = randomWord()[index] === letter;

      if (wordHasLetter) {
        return [...hints, letterIsAtRightPlace ? Hint.GOOD_POSITION : Hint.WRONG_POSITION]
      } else {
        return [...hints, Hint.NOT_IN_WORD];
      }      
    }, []);
  };

  const keydownCallback = (event: KeyboardEvent) => {
    if (hasGameEnded() && event.code === "Enter") {
      restartGame();

      return;
    }

    if (event.code === "Backspace") {
      setUserWord(prev => prev.slice(0, prev.length - 1));

      return;
    };

    if (event.code === "Enter" && userWord().length === 5) {
      setWords(prev => prev.map((val, index) => {
        if (index === editableIndex()) {
          return userWord();
        } 

        return val;
      }));

      setUserWord("");

      return;
    };

    if (/^[A-Za-z]{1}$/.test(event.key) && userWord().length < 5) {
      setUserWord(prev => prev + event.key);
    };
  };

  document.addEventListener("keydown", keydownCallback);

  onCleanup(() => document.removeEventListener("keydown", keydownCallback));

  // Just for debug purposes
  createEffect(() => {
    console.log(`The word to guess is "${randomWord()}"`);
  });

  return (
    <div class="w-full h-screen flex flex-col items-center font-sans bg-zinc-800 text-white">
      <h2 class="my-8 text-4xl">
        Solid Wordle
      </h2>
      <div class="flex flex-col items-center">
        <For each={words()}>
          {(word, index) => {
            return  (
              <Word hints={getWordHints(word)} word={editableIndex() === index() ? userWord() : word}  />
            )
          }}
        </For>
        <Show when={hasGameEnded()}>
          <div class="mt-4">
            <span>
              <Show when={userHasWon()} fallback={<>You lost! The word was {randomWord()}</>}>
                You won!
              </Show>
              <br />Click the button or press Enter again to play again
            </span>
            <div class="mt-2">
              <button type="button" onclick={restartGame} class="rounded px-2 py-1 bg-green-500 text-white">Play again</button>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default App;
