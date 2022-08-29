import { Pokemon, SmallPokemon } from "../interfaces";

class FavoritePokemosApi {
  favorites: SmallPokemon[];
  constructor() {
    const favoritePokemos = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    this.favorites = favoritePokemos;
  }
  getFavorites() {
    return this.favorites;
  }
  addFavorite(favorite: SmallPokemon) {
    this.favorites.push(favorite);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
  removeFavorite(id: number) {
    this.favorites.splice(
      this.favorites.findIndex((pokemon) => pokemon.id === id),
      1
    );
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
}

export default FavoritePokemosApi;
