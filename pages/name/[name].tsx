import { useState } from "react";

import {
  Button,
  Card,
  Container,
  Grid,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";

import confetti from "canvas-confetti";

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import Image from "next/image";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorite, setIsInFavorite] = useState(
    localFavorites.existInFavorites(pokemon)
  );

  const onToggleFavorite = () => {
    localFavorites.toogleFavorite(pokemon);
    setIsInFavorite(!isInFavorite);

    if (isInFavorite) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { y: 0, x: 1 },
    });
  };

  return (
    <Layout title={`Pokémon - ${pokemon.name}`}>
      <Grid.Container
        css={{
          marginTop: "5px",
        }}
        gap={2}
      >
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header>
              <Row wrap="wrap" justify="space-between" align="center" fluid>
                <Text transform="capitalize" h2>
                  {pokemon.name}
                </Text>
                <Button
                  color={"gradient"}
                  ghost={!isInFavorite}
                  onPress={onToggleFavorite}
                >
                  {isInFavorite
                    ? "Eliminar de favoritos"
                    : "Agregar a favoritos"}
                </Button>
              </Row>
            </Card.Header>
            <Card.Body>
              <Text size={27}>Sprites:</Text>
              <Container>
                <Grid.Container gap={1} justify="space-between">
                  <Grid xs={12} sm={6} md={3} xl={3} justify="center">
                    <Image
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      width={130}
                      height={120}
                      layout="fixed"
                    />
                  </Grid>
                  <Grid xs={12} sm={6} md={3} xl={3} justify="center">
                    <Image
                      src={pokemon.sprites.back_default}
                      alt={pokemon.name}
                      width={130}
                      height={120}
                      layout="fixed"
                    />
                  </Grid>

                  <Grid xs={12} sm={6} md={3} xl={3} justify="center">
                    <Image
                      src={pokemon.sprites.front_shiny}
                      alt={pokemon.name}
                      width={130}
                      height={120}
                      layout="fixed"
                    />
                  </Grid>
                  <Grid xs={12} sm={6} md={3} xl={3} justify="center">
                    <Image
                      src={pokemon.sprites.back_shiny}
                      alt={pokemon.name}
                      width={130}
                      height={120}
                      layout="fixed"
                    />
                  </Grid>
                </Grid.Container>
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2}>
        <Card>
          <Card.Body>
            <Text h3>Abilidades:</Text>
            <Container display="flex" fluid>
              {pokemon.abilities.map((ability) => (
                <Text
                  h6
                  transform="capitalize"
                  css={{ marginRight: "1rem" }}
                  key={ability.ability.name}
                >
                  {ability.ability.name}
                </Text>
              ))}
            </Container>
            <Container display="flex" alignItems="center">
              <Text color="secondary" h5>
                Experiencia:
              </Text>
              <Spacer x={0.5} />
              <Text h5>{pokemon.base_experience}</Text>
            </Container>
          </Card.Body>
        </Card>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=300`);

  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({ params: { name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
