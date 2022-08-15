import { children, Component, mergeProps } from "solid-js";

interface LetterProps {
  class?: string;
  children: string;
}

const Letter: Component<LetterProps> = (props) => {
  const mergedProps = mergeProps({ class: "" }, props);
  const c = children(() => props.children);

  return (
    <div
      class={`w-12 h-12 border-blue-400 flex items-center justify-center text-xl  text-white rounded ${mergedProps.class}`}
    >
      {c()}
    </div>
  );
};

export default Letter;
