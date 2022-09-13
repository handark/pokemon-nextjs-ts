import { FC, ReactNode } from "react";
import Head from "next/head";
import { Footer, NavbarDefault } from "../ui";
import { Container, Grid, Link, Text } from "@nextui-org/react";

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

      <Footer />
    </>
  );
};
