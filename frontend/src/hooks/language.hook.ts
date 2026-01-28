import { createContext, useContext } from "react";

export type LanguageHook = {
  language: string;
  setLanguage: (language: string) => void;
};

export const LanguageContext = createContext<LanguageHook>({
  language: "ar",
  setLanguage: () => {},
});

const useLanguage = () => {
  return useContext(LanguageContext);
};

export default useLanguage;
