import { NextPage, GetStaticProps } from "next";
import { Grid, Input } from "@nextui-org/react";

import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";
import { useEffect, useState } from "react";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  const [search, setSearch] = useState("");

  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  /**
   * Filtra los pokemons por el nombre
   */
  useEffect(() => {
    if (search === "") {
      setFilteredPokemons(pokemons);
      return;
    }

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.includes(search)
    );
    setFilteredPokemons(filteredPokemons);
  }, [search]);

  return (
    <Layout title="Listado de Pokémons">
      <Grid.Container gap={2}>
        <Grid xs={12}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            placeholder="Buscar Pokémon"
            aria-label="Buscar Pokémon"
            onClearClick={() => setSearch("")}
            clearable
          />
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2} justify="flex-start">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
