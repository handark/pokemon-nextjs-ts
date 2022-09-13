import { Button, Container, Grid, Link, Text } from "@nextui-org/react";
import { GithubIcon } from "./IconsDefault";

export const Footer = () => {
  const handleIrARepositorio = () => {
    window.open("https://github.com/handark/pokemon-nextjs-ts");
  };

  return (
    <footer>
      <Container>
        <Grid.Container gap={2} justify="center">
          <Grid css={{ display: "flex", gap: "7px" }} alignItems="center">
            <Text>© {new Date().getFullYear()} - </Text>
            <Text>Creado por</Text>
            <Link href="https://joseorozco.co">Jose Luis Orozco</Link>
            <Button
              onPress={handleIrARepositorio}
              auto
              light
              icon={<GithubIcon fill="currentColor" filled />}
            />
          </Grid>
        </Grid.Container>
      </Container>
    </footer>
  );
};
