import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";
import i18nUtil from "../utils/i18n.util";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document<{ dir?: string; lang?: string }> {
  static getInitialProps = async (ctx: any) => {
    const initialProps = await getInitialProps(ctx);
    const language = ctx.req?.cookies?.["language"] ?? "ar";
    const direction = i18nUtil.getDirectionByCode(language);
    return { ...initialProps, dir: direction, lang: language };
  };

  render() {
    return (
      <Html dir={this.props.dir || "rtl"} lang={this.props.lang || "ar"}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
          <link rel="apple-touch-icon" href="/img/icons/icon-128x128.png" />

          <meta name="robots" content="noindex" />
          <meta name="theme-color" content="#46509e" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
