import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Uploady",
  tagline:
    "Uploady is self-hosted file sharing platform and an alternative for WeTransfer.",
  favicon: "img/pingvinshare.svg",

  url: "https://YOUR_ORG.github.io",
  baseUrl: "/uploady/",
  organizationName: "YOUR_ORG",
  projectName: "uploady",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/YOUR_ORG/uploady/edit/main/docs",
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/pingvinshare.svg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Uploady",
      logo: {
        alt: "Uploady Logo",
        src: "img/pingvinshare.svg",
      },
      items: [
        {
          href: "https://github.com/YOUR_ORG/uploady",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
