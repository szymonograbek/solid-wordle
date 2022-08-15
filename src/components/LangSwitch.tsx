import { children, Component, JSX, mergeProps } from "solid-js";
import { Language } from "../constants/languages";

interface LangSwitchProps {
  activeLanguage: Language;
  onLangSwitch: (language: Language) => void;
}

const LangSwitch: Component<LangSwitchProps> = (props) => {
  const mergedProps = mergeProps({ activeLanguage: Language.ENGLISH }, props);

  return (
    <div>
      <LanguageButton
        active={mergedProps.activeLanguage === Language.ENGLISH}
        class="mr-4"
        onclick={() => props.onLangSwitch(Language.ENGLISH)}
      >
        ENG 🇺🇸
      </LanguageButton>
      <LanguageButton
        active={mergedProps.activeLanguage === Language.POLISH}
        onclick={() => props.onLangSwitch(Language.POLISH)}
      >
        PL 🇵🇱
      </LanguageButton>
    </div>
  );
};

interface LanguageButtonProps
  extends Pick<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onclick" | "class"> {
  active: boolean;
  children: string;
}

const LanguageButton: Component<LanguageButtonProps> = (props) => {
  const mergedProps = mergeProps({ active: false }, props);
  const c = children(() => props.children);

  return (
    <button
      {...mergedProps}
      class={mergedProps.class + " px-2 py-1 border"}
      classList={{
        "border-sky-500": mergedProps.active,
        "border-transparent": !mergedProps.active,
      }}
    >
      {c()}
    </button>
  );
};

export default LangSwitch;
