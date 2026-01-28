import { ActionIcon, ColorScheme, Menu, useMantineColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { TbDeviceLaptop, TbMoon, TbSun } from "react-icons/tb";
import { FormattedMessage } from "react-intl";
import userPreferences from "../../utils/userPreferences.util";

const ThemeSelector = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const systemColorScheme = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState<string>(
    userPreferences.get("colorScheme") || "system",
  );

  // Update selected theme when colorScheme changes
  useEffect(() => {
    const storedTheme = userPreferences.get("colorScheme");
    if (storedTheme) {
      setSelectedTheme(storedTheme);
    }
  }, [colorScheme]);

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    userPreferences.set("colorScheme", value);
    
    const themeToApply =
      value === "system" ? systemColorScheme : (value as ColorScheme);
    
    toggleColorScheme(themeToApply);
    setCookie("mantine-color-scheme", themeToApply, {
      sameSite: "lax",
    });
  };

  // Get icon based on current effective theme
  const getCurrentIcon = () => {
    // Show icon based on the actual applied theme (colorScheme)
    // This reflects what the user is actually seeing
    if (colorScheme === "dark") {
      return <TbMoon size={18} />;
    } else {
      return <TbSun size={18} />;
    }
  };

  const themes = [
    {
      value: "light",
      label: <FormattedMessage id="account.theme.light" />,
      icon: <TbSun size={16} />,
    },
    {
      value: "dark",
      label: <FormattedMessage id="account.theme.dark" />,
      icon: <TbMoon size={16} />,
    },
    {
      value: "system",
      label: <FormattedMessage id="account.theme.system" />,
      icon: <TbDeviceLaptop size={16} />,
    },
  ];

  return (
    <Menu position="bottom-start" withinPortal>
      <Menu.Target>
        <ActionIcon>{getCurrentIcon()}</ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {themes.map((theme) => (
          <Menu.Item
            key={theme.value}
            icon={theme.icon}
            onClick={() => handleThemeChange(theme.value)}
            disabled={theme.value === selectedTheme}
          >
            {theme.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ThemeSelector;
