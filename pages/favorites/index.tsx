import { Grid } from "@nextui-org/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { FavoritePokemosApi } from "../../api";
import { Layout } from "../../components/layouts";
import { PokemonCard } from "../../components/pokemon";
import { Pokemon, SmallPokemon } from "../../interfaces";

const FavoritesPage: NextPage = () => {
  const [pokemons, setPokemons] = useState<SmallPokemon[]>([]);

  useEffect(() => {
    const favoritePokemons = new FavoritePokemosApi();
    setPokemons(favoritePokemons.getFavorites());
  }, []);

  return (
    <Layout title="Pokemons - Favoritos">
      <Grid.Container gap={2} justify={"flex-start"}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export default FavoritesPage;
