import { Card, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { Pokemon } from "../../interfaces";

interface Props {
  pokemon: Pokemon;
}

export const FavoriteCardPokemon: FC<Props> = ({ pokemon }) => {
  const route = useRouter();

  const onFavoriteClicked = () => {
    route.push(`/name/${pokemon.name}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} lg={1} key={pokemon.id}>
      <Card isPressable isHoverable onPress={onFavoriteClicked}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          width={"100%"}
          height={140}
        />
      </Card>
    </Grid>
  );
};
