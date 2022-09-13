import { Card, Container, Grid, Text } from "@nextui-org/react";
import type { NextPage } from "next";

import { useEffect, useState } from "react";

import { Layout } from "../../components/layouts";
import { FavoritePokemons } from "../../components/pokemon";

import { NoFavorites } from "../../components/ui";
import { Pokemon } from "../../interfaces";

import { localFavorites } from "../../utils";

const FavoritesPage: NextPage = () => {
  const [favoritesPokemos, setFavoritesPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons);
  }, []);

  return (
    <Layout title="Pokemons - Favoritos">
      {favoritesPokemos.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemos={favoritesPokemos} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
