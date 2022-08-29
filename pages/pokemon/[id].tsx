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
import Image from "next/image";
import { pokeApi, FavoritePokemosApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const handleAddToFavorites = () => {
    const favoritePokemons = new FavoritePokemosApi();

    favoritePokemons.addFavorite({
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.sprites.other?.dream_world?.front_default || "no-image.png",
      url: "",
    });
    console.log(favoritePokemons.getFavorites());
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
                <Button color={"gradient"} ghost onPress={handleAddToFavorites}>
                  Add to favorites
                </Button>
              </Row>
            </Card.Header>
            <Card.Body>
              <Text size={27}>Sprites:</Text>
              <Container fluid>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2}>
        <Card>
          <Card.Body>
            <Text h3>Abilities:</Text>
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
                Base experience:
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
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
