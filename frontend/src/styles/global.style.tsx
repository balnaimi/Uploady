import { Global } from "@mantine/core";

const GlobalStyle = () => {
  return (
    <Global
      styles={(theme) => ({
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        "table.md, table.md th:nth-of-type(odd), table.md td:nth-of-type(odd)":
          {
            background:
              theme.colorScheme == "dark"
                ? "rgba(50, 50, 50, 0.5)"
                : "rgba(220, 220, 220, 0.5)",
          },
        "table.md td": {
          paddingInlineStart: "0.5em",
          paddingInlineEnd: "0.5em",
        },
        // RTL fix for PasswordInput visibility toggle button
        '[dir="rtl"] .mantine-PasswordInput-rightSection': {
          right: "unset",
          left: 0,
        },
        '[dir="rtl"] .mantine-PasswordInput-innerInput': {
          paddingRight: "0.75rem !important",
          paddingLeft: "calc(2.25rem + 0.625rem) !important",
        },
      })}
    />
  );
};
export default GlobalStyle;
