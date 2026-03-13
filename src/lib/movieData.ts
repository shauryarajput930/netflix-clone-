export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  releaseDate: string;
  genre: string;
  trailerUrl?: string;
}

const posters = [
  "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
  "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
  "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
  "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
  "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
  "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
  "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDhRkZoW0b4dIzW.jpg",
  "https://image.tmdb.org/t/p/w500/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
];

const titles = [
  "The Dark Frontier", "Shadow Protocol", "Neon Horizons", "Crimson Tide Rising",
  "The Last Signal", "Quantum Break", "Midnight Storm", "Eclipse Rising",
  "Zero Hour", "The Architect", "Phantom Code", "Steel Dawn",
  "Void Runners", "Circuit Breaker", "The Remnant", "Binary Star",
  "Iron Will", "Dark Waters", "Signal Lost", "The Forgotten"
];

const overviews = [
  "In a world torn apart by war, one hero must rise to save what remains of humanity.",
  "A covert agent discovers a conspiracy that threatens the very fabric of society.",
  "In the neon-lit streets of tomorrow, a detective hunts a killer with impossible abilities.",
  "When the ocean reveals its darkest secret, a team of scientists must race against time.",
  "The last transmission from deep space carries a warning no one expected.",
  "A quantum physicist accidentally tears a hole in reality, unleashing chaos.",
  "During the worst storm in history, a small town discovers it's not alone.",
  "As darkness falls across the globe, a team of unlikely heroes must find the source.",
  "With only hours left, a lone operative must prevent global catastrophe.",
  "A brilliant architect discovers their buildings are gateways to another dimension.",
];

function generateMovies(count: number, startId: number): Movie[] {
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    title: titles[i % titles.length],
    overview: overviews[i % overviews.length],
    posterUrl: posters[i % posters.length],
    backdropUrl: posters[i % posters.length],
    rating: parseFloat((6 + Math.random() * 3.5).toFixed(1)),
    releaseDate: `${2020 + (i % 5)}-0${1 + (i % 9)}-${10 + (i % 20)}`,
    genre: ["Action", "Sci-Fi", "Thriller", "Drama", "Comedy"][i % 5],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  }));
}

export const movieCategories = [
  { title: "Trending Now", movies: generateMovies(10, 1) },
  { title: "Netflix Originals", movies: generateMovies(10, 11) },
  { title: "Top Rated", movies: generateMovies(10, 21) },
  { title: "Action Movies", movies: generateMovies(10, 31) },
  { title: "Comedy Movies", movies: generateMovies(10, 41) },
  { title: "Sci-Fi Adventures", movies: generateMovies(10, 51) },
];

export const featuredMovie: Movie = {
  id: 0,
  title: "The Dark Frontier",
  overview: "In a world ravaged by an unknown force, one hero stands at the edge of civilization. Armed with nothing but courage and determination, they must venture into the forbidden zone to uncover the truth that could save — or destroy — everything.",
  posterUrl: posters[0],
  backdropUrl: posters[0],
  rating: 9.2,
  releaseDate: "2025-12-15",
  genre: "Sci-Fi",
  trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
};
