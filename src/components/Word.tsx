import { Component, JSX, mergeProps } from "solid-js";
import Letter from "./Letter";

export enum Hint {
  GOOD_POSITION = "rightPosition",
  WRONG_POSITION = "wrongPosition",
  NOT_IN_WORD = "notInWord"
}

interface WordProps extends Pick<JSX.CustomAttributes<HTMLDivElement>, "classList"> {
  hints: Array<Hint>
  word: string;
}

const getBackgroundForHint = (hint: Hint) => {
  if (!hint) return "bg-neutral-500"

  if (hint === Hint.NOT_IN_WORD) return "bg-neutral-600";

  if (hint === Hint.WRONG_POSITION) return "bg-yellow-500";

  return "bg-green-500"
}

const Word: Component<WordProps> = (props) => {
  const mergedProps = mergeProps({ word: "", hints: [], classList: undefined }, props);

  return (
    <div classList={mergedProps.classList} class="flex flex-row mb-4">
      <Letter class={`mr-2 ${getBackgroundForHint(mergedProps.hints[0])}`}>{mergedProps.word[0]}</Letter>
      <Letter class={`mr-2 ${getBackgroundForHint(mergedProps.hints[1])}`}>{mergedProps.word[1]}</Letter>
      <Letter class={`mr-2 ${getBackgroundForHint(mergedProps.hints[2])}`}>{mergedProps.word[2]}</Letter>
      <Letter class={`mr-2 ${getBackgroundForHint(mergedProps.hints[3])}`}>{mergedProps.word[3]}</Letter>
      <Letter class={getBackgroundForHint(mergedProps.hints[4])}>{mergedProps.word[4]}</Letter>
    </div>
  )
};

export default Word;