import { ActionIcon, Menu } from "@mantine/core";
import { getCookie, setCookie } from "cookies-next";
import { useState } from "react";
import { TbLanguage } from "react-icons/tb";
import { LOCALES } from "../../i18n/locales";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    getCookie("language")?.toString() || "ar",
  );

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
    location.reload();
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
