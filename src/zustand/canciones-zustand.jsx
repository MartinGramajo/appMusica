// import axios from "axios";
// import { create } from "zustand";

// const useArtistasStore = create((set) => ({
//   artistas: [],
//   loading: false,
//   error: null,
//   tracklist: []

//   getArtistas: async () => {
//     set({ loading: true, error: null });
//     try {
//       const res = await axios.get("https://api.deezer.com/user/2529/artists");
//       console.log("getArtistas: ~ res:", res.data.data);

//       const respuesta2 = res.data.data;
//       const resp = respuesta2.map((artista) => axios.get(artista.tracklist));
//       return { ...artista, tracklist: respuesta2.data.data };

//       set({ artistas: respuesta2, loading: false, error: null, tracklist: resp });
//     } catch (error) {
//       set({ error: error.message, loading: false });
//     }
//   },
// }));

// export default useArtistasStore;

import axios from "axios";
import { create } from "zustand";

const useArtistasStore = create((set) => ({
  artistas: [],
  loading: false,
  error: null,

  getArtistas: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("https://api.deezer.com/user/2529/artists");
      console.log("getArtistas: ~ res:", res.data.data);

      const artistas = await Promise.all(
        res.data.data.map(async (artista) => {
          try {
            const tracklistRes = await axios.get(artista.tracklist);
            return { ...artista, tracklist: tracklistRes.data.data };
          } catch (tracklistError) {
            console.error(
              `Error fetching tracklist for artist ${artista.id}:`,
              tracklistError
            );
            return { ...artista, tracklist: [] };
          }
        })
      );

      set({ artistas, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useArtistasStore;
