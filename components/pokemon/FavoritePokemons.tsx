import { Card, Grid } from "@nextui-org/react";
import { FC } from "react";
import { Pokemon, SmallPokemon } from "../../interfaces";
import { FavoriteCardPokemon } from "./FavoriteCardPokemon";
import { PokemonCard } from "./PokemonCard";

interface Props {
  pokemos: Pokemon[];
}

export const FavoritePokemons: FC<Props> = ({ pokemos }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemos.map((pokemon) => {
        const smallPokemon: SmallPokemon = {
          id: pokemon.id,
          name: pokemon.name,
          img: pokemon.sprites.other?.dream_world.front_default || "",
          url: "",
        };
        return <PokemonCard key={smallPokemon.id} pokemon={smallPokemon} />;
      })}
    </Grid.Container>
  );
};
