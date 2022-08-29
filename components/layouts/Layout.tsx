import { FC, ReactNode } from "react";
import Head from "next/head";
import { NavbarDefault } from "../ui";
import { Container } from "@nextui-org/react";

interface Props {
  title?: string;
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokémon App"}</title>
        <meta name="author" content="Jose Orozco" />
        <meta
          name="description"
          content={`Informacion soble el pokémon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokémon, pokedex`} />
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
    </>
  );
};
