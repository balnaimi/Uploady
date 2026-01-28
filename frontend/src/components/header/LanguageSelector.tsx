import { ActionIcon, Menu } from "@mantine/core";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { TbLanguage } from "react-icons/tb";
import useLanguage from "../../hooks/language.hook";
import { LOCALES } from "../../i18n/locales";

const LanguageSelector = () => {
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

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    setCookie("language", value, {
      sameSite: "lax",
      expires: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      ),
    });
    setLanguage(value);
  };

  return (
    <Menu position="bottom-start" withinPortal>
      <Menu.Target>
        <ActionIcon>
          <TbLanguage size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {languages.map((language) => (
          <Menu.Item
            key={language.value}
            onClick={() => handleLanguageChange(language.value)}
            disabled={language.value === selectedLanguage}
          >
            {language.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageSelector;
