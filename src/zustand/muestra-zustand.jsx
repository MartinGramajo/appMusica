import axios from "axios";
import { create } from "zustand";

const usePokemonStore = create((set) => ({
  pokemones: [],
  loading: false,
  error: null,

  getPokemones: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const respuesta2 = res.data.results;
      const resp = respuesta2.map((pokemon) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      );

      const data = await Promise.all(resp);
      const pokemones = data.map((pokemon) => pokemon.data);

      set({ pokemones, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default usePokemonStore;
