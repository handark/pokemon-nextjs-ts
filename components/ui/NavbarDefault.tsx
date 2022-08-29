import {
  Text,
  useTheme,
  Navbar,
  Link,
  Switch,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Menu } from "../../interfaces";
import { useTheme as useNextTheme } from "next-themes";
import { GithubIcon, MoonIcon, SunIcon } from "./IconsDefault";

export const NavbarDefault = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  const route = useRouter();

  const menuItems: Menu[] = [
    {
      href: "/favorites",
      title: "Favorites",
    },
  ];

  const handleIrARepositorio = () => {
    window.open("https://github.com/handark/pokemon-nextjs-ts");
  };

  return (
    <Navbar isBordered={isDark} variant={"floating"}>
      <Navbar.Brand>
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
            <Text h3>okedex</Text>
          </Link>
        </NextLink>
      </Navbar.Brand>
      <Navbar.Content>
        {menuItems.map((item) => (
          <NextLink key={item.href} href={item.href}>
            <Link>
              <Text
                size={20}
                color={
                  route.pathname === item.href
                    ? "primary"
                    : isDark
                    ? "#ECEDEE"
                    : "#111213"
                }
              >
                {item.title}
              </Text>
            </Link>
          </NextLink>
        ))}

        <Button
          onPress={handleIrARepositorio}
          auto
          light
          icon={<GithubIcon fill="currentColor" filled />}
        />
        {/*         <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          iconOn={<MoonIcon />}
          iconOff={<SunIcon />}
        /> */}
        <Button
          onPress={() => setTheme(isDark ? "light" : "dark")}
          auto
          light
          icon={
            isDark ? (
              <MoonIcon fill="currentColor" filled />
            ) : (
              <SunIcon fill="currentColor" filled />
            )
          }
        />
      </Navbar.Content>
    </Navbar>
    /*   <div
   
       Para ocupar el espacio del navbar, se debe agregar un Spacer con flex 1.
      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" passHref>
        <Link>
          <Text>Favoritos</Text>
        </Link>
      </NextLink>
    </div> */
  );
};
