import { Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { Link } from "@nextui-org/react";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0 20px",
        backgroundColor: theme?.colors.gray300.value,
      }}
    >
      <NextLink href="/" passHref>
        <Link>
          <Image
            alt="icono de la app"
            width={50}
            height={50}
            src={
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg"
            }
          />
          <Text css={{ marginLeft: 10 }} h2>
            P
          </Text>
          <Text h3>okémon</Text>
        </Link>
      </NextLink>

      {/* flex: 1 es para ocupar todo el espacio disponible */}
      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" passHref>
        <Link>
          <Text>Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  );
};
