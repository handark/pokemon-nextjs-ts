import { FC, ReactNode } from "react";
import Head from "next/head";
import { NavbarDefault } from "../ui";
import { Container, Grid, Link, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  children: ReactNode;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokedex App"}</title>
        <meta name="author" content="Jose Orozco" />
        <meta name="description" content={`Pokemon - ${title}`} />
        <meta name="keywords" content={`${title}, pokémon, pokedex`} />

        <meta
          property="og:title"
          content={`Información sobre ${title} - Pokedex App`}
        />
        <meta
          property="og:description"
          content={`Información sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
        <link rel="icon" href="/bulbasaur.svg" />
      </Head>

      {/* Navbar */}
      <NavbarDefault />

      <Container
        style={{
          padding: "0 20px",
        }}
      >
        {children}
      </Container>

      <footer>
        <Container>
          <Grid.Container gap={2} justify="center">
            <Grid>
              <Text>© {new Date().getFullYear()}</Text>
            </Grid>
            <Grid css={{ display: "flex", gap: "7px" }}>
              <Text>Creado por</Text>
              <Link href="https://joseorozco.co">Jose Luis Orozco</Link>
            </Grid>
          </Grid.Container>
        </Container>
      </footer>
    </>
  );
};
