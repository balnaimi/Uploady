import { Select } from "@mantine/core";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import useLanguage from "../../hooks/language.hook";
import useTranslate from "../../hooks/useTranslate.hook";
import { LOCALES } from "../../i18n/locales";

const LanguagePicker = () => {
  const t = useTranslate();
  const { language, setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  // Update selectedLanguage when language changes from context
  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const languages = Object.values(LOCALES).map((locale) => ({
    value: locale.code,
    label: locale.name,
  }));
  return (
    <Select
      value={selectedLanguage}
      description={t("account.card.language.description")}
      onChange={(value) => {
        const newLanguage = value ?? "ar";
        setSelectedLanguage(newLanguage);
        setCookie("language", newLanguage, {
          sameSite: "lax",
          expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1),
          ),
        });
        setLanguage(newLanguage);
      }}
      data={languages}
    />
  );
};

export default LanguagePicker;
