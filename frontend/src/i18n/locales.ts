import arabic from "./translations/ar";
import english from "./translations/en-US";

export const LOCALES = {
  ENGLISH: {
    name: "English",
    code: "en-US",
    messages: english,
    direction: "ltr" as const,
  },
  ARABIC: {
    name: "العربية",
    code: "ar",
    messages: arabic,
    direction: "rtl" as const,
  },
};
