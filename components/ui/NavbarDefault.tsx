import {
  Text,
  Navbar,
  Button,
  Link,
  Grid,
  Avatar,
  Dropdown,
} from "@nextui-org/react";

import { Menu } from "../../interfaces";
import { Bulbasaur } from "../pokemon";

import NextLink from "next/link";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import { useState } from "react";

export const NavbarDefault = () => {
  const menuItems: Menu[] = [
    {
      href: "/favoritos",
      title: "Favoritos",
    },
  ];

  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(user);
      console.log("Usuario logueado", user);
    } else {
      console.log("No hay usuario");
      setUser(null);
    }
  });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Usuario deslogueado");
      })
      .catch((error) => {
        console.log("Error al desloguear", error);
      });
  };

  return (
    <Navbar isBordered variant={"floating"}>
      <Navbar.Brand>
        <NextLink href="/">
          <Link>
            <Bulbasaur />
            <Text
              h2
              css={{
                marginLeft: "0.7rem",
              }}
            >
              P
            </Text>
            <Text h3>okémon</Text>
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

        {user ? (
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src={user.photoURL || ""}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => {
                if (actionKey === "logout") handleLogout();
              }}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {user?.displayName}
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {user?.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                Mi Cuenta
              </Dropdown.Item>

              <Dropdown.Item key="logout" withDivider color="error">
                Salir
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Navbar.Item>
            <Button auto flat as={Link} href="/usuario/login">
              Acceder
            </Button>
          </Navbar.Item>
        )}
      </Navbar.Content>
    </Navbar>
  );
};
