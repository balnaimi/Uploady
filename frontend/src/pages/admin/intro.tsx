import {
  Button,
  Center,
  Container,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
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
            {t("admin.intro.description")}
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
