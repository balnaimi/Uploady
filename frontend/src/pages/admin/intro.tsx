import {
  Anchor,
  Button,
  Center,
  Container,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import Logo from "../../components/Logo";
import Meta from "../../components/Meta";
import useTranslate from "../../hooks/useTranslate.hook";

const Intro = () => {
  const t = useTranslate();

  return (
    <>
      <Meta title={t("admin.intro.title")} />
      <Container size="xs">
        <Stack>
          <Center>
            <Logo height={80} width={80} />
          </Center>
          <Center>
            <Title order={2}>{t("admin.intro.welcome")}</Title>
          </Center>
          <Text>
            <FormattedMessage
              id="admin.intro.description"
              values={{
                github: (
                  <Anchor
                    target="_blank"
                    href="https://github.com/stonith404/pingvin-share"
                  >
                    GitHub
                  </Anchor>
                ),
                coffee: (
                  <Anchor
                    target="_blank"
                    href="https://github.com/sponsors/stonith404"
                  >
                    buy me a coffee
                  </Anchor>
                ),
              }}
            />
          </Text>
          <Text>{t("admin.intro.fun")}</Text>
          <Text mt="lg">{t("admin.intro.continue")}</Text>
          <Stack>
            <Button href="/admin/config/general" component={Link}>
              {t("admin.intro.button.customize")}
            </Button>
            <Button href="/" component={Link} variant="light">
              {t("admin.intro.button.explore")}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Intro;
