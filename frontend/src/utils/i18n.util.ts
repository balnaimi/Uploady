import { setCookie } from "cookies-next";
import { LOCALES } from "../i18n/locales";

const getLocaleByCode = (code: string) => {
  return Object.values(LOCALES).find((l) => l.code === code) ?? LOCALES.ARABIC;
};

// Parse the Accept-Language header and return the first supported language
// Only supports Arabic (ar) and English (en)
const getLanguageFromAcceptHeader = (acceptLanguage?: string) => {
  if (!acceptLanguage) return "ar";

  const languages = acceptLanguage.split(",").map((l) => l.split(";")[0].trim().toLowerCase());

  for (const language of languages) {
    // Check for Arabic (ar or ar-*)
    if (language === "ar" || language.startsWith("ar-")) {
      return "ar";
    }
    // Check for English (en or en-*)
    if (language === "en" || language.startsWith("en-")) {
      return "en";
    }
  }
  
  // Default to Arabic
  return "ar";
};

const isLanguageSupported = (code: string) => {
  return Object.values(LOCALES).some((l) => l.code === code);
};

const setLanguageCookie = (code: string) => {
  setCookie("language", code, {
    sameSite: "lax",
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  });
};

const getDirectionByCode = (code: string): "rtl" | "ltr" => {
  const locale = getLocaleByCode(code);
  return locale?.direction ?? "rtl";
};

export default {
  getLocaleByCode,
  getLanguageFromAcceptHeader,
  isLanguageSupported,
  setLanguageCookie,
  getDirectionByCode,
};
