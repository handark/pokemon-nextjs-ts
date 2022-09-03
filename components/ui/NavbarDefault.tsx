import {
  Text,
  useTheme,
  Navbar,
  Button,
  Link,
  Switch,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { Menu } from "../../interfaces";
import { Bulbasaur, CharmeleonSvg } from "../pokemon";
import { GithubIcon } from "./IconsDefault";
import NextLink from "next/link";
import { useTheme as useNextTheme } from "next-themes";

export const NavbarDefault = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  const route = useRouter();

  const menuItems: Menu[] = [
    {
      href: "/favorites",
      title: "Favoritos",
    },
  ];

  const handleIrARepositorio = () => {
    window.open("https://github.com/handark/pokemon-nextjs-ts");
  };

  return (
    <Navbar isBordered variant={"floating"}>
      <Navbar.Brand>
        <NextLink href="/">
          <Link>
            <Bulbasaur />
            <Text
              color="white"
              h2
              css={{
                marginLeft: "0.7rem",
              }}
            >
              P
            </Text>
            <Text color="white" h3>
              okémon
            </Text>
          </Link>
        </NextLink>
      </Navbar.Brand>

      <Navbar.Content>
        {menuItems.map((item) => (
          <NextLink key={item.href} href={item.href}>
            <Link>
              <Text size={20}>{item.title}</Text>
            </Link>
          </NextLink>
        ))}

        <Button
          onPress={handleIrARepositorio}
          auto
          light
          icon={<GithubIcon fill="currentColor" filled />}
        />
      </Navbar.Content>
    </Navbar>
  );
};
