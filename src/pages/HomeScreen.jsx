// import React, { useEffect, useState } from "react";
// import useArtistasStore from "../zustand/canciones-zustand";

// const HomeScreen = () => {
//   const artistas = useArtistasStore((state) => state.artistas);

//   const getArtistas = useArtistasStore((state) => state.getArtistas);

//   const [artistaElegido, setArtistaElegido] = useState("");

//   useEffect(() => {
//     getArtistas();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-center text-3xl text-gray-700">Lista de canciones</h1>
//       <div className="grid grid-cols-6 justify-center ">
//         {artistas.map((artista) => (
//           <div
//             key={artista.id}
//             className={`${artistaElegido === artista.id && "col-span-6"}`}
//           >
//             <p>{artista.name}</p>
//             <img src={artista.picture_small} alt={artista.name} />
//             <button onClick={() => setArtistaElegido(artista.id)}>
//               ver mas
//             </button>
//             {artista.tracklist.map((cancion) => (
//               <>
//                 <li>{cancion.title}</li>
//               </>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomeScreen;
import React, { useEffect, useState } from "react";
import useArtistasStore from "../zustand/canciones-zustand";

const HomeScreen = () => {
  const artistas = useArtistasStore((state) => state.artistas);
  const getArtistas = useArtistasStore((state) => state.getArtistas);
  const [artistaElegido, setArtistaElegido] = useState(null);

  useEffect(() => {
    getArtistas();
  }, [getArtistas]);

  return (
    <div>
      <h1 className="text-center text-3xl text-gray-700">Lista de canciones</h1>
      <div className="grid grid-cols-6 justify-center">
        {artistas.map((artista) => (
          <div
            key={artista.id}
            className={`col-span-1 ${artistaElegido && "col-span-6"}`}
          >
            <p>{artista.name}</p>
            <img src={artista.picture_small} alt={artista.name} />
            <button onClick={() => setArtistaElegido(artista.id)}>
              ver mas
            </button>
            {artistaElegido === artista.id && (
              <ul>
                {artista.tracklist.map((cancion) => (
                  <li key={cancion.id}>
                    {cancion.title}

                    <iframe src={cancion.preview} frameborder="0"></iframe>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
