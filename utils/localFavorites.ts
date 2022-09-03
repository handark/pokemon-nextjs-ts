import { Pokemon } from "../interfaces";

/* eslint-disable import/no-anonymous-default-export */
const toogleFavorite = (pokemon: Pokemon) => {
  let favorites: Pokemon[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  if (
    favorites.findIndex(
      (FavoritePokemon) => FavoritePokemon.id === pokemon.id
    ) !== -1
  ) {
    favorites = favorites.filter(
      (favoritePokemon) => favoritePokemon.id !== pokemon.id
    );
  } else {
    favorites.push(pokemon);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existInFavorites = (pokemon: Pokemon): boolean => {
  if (typeof window === "undefined") return false;

  const favorites: Pokemon[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  return (
    favorites.findIndex(
      (FavoritePokemon) => FavoritePokemon.id === pokemon.id
    ) !== -1
  );
};

const pokemons = (): Pokemon[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export { toogleFavorite, existInFavorites, pokemons };
