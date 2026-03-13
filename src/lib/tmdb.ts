import { useQuery } from "@tanstack/react-query";

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

interface TMDBResponse {
  results: TMDBMovie[];
  page: number;
  total_pages: number;
}

const IMG_BASE = "https://image.tmdb.org/t/p";

export function posterUrl(path: string | null, size = "w500") {
  return path ? `${IMG_BASE}/${size}${path}` : "/placeholder.svg";
}

export function backdropUrl(path: string | null) {
  return path ? `${IMG_BASE}/original${path}` : "/placeholder.svg";
}

async function fetchTMDB(endpoint: string, query?: string): Promise<TMDBResponse> {
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const url = new URL(`https://${projectId}.supabase.co/functions/v1/tmdb-proxy`);
  url.searchParams.set("endpoint", endpoint);
  if (query) url.searchParams.set("query", query);

  const res = await fetch(url.toString(), {
    headers: { "apikey": anonKey, "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error(`TMDB fetch failed: ${res.status}`);
  return res.json();
}

export interface MovieCategory {
  title: string;
  endpoint: string;
}

export const CATEGORIES: MovieCategory[] = [
  { title: "Trending Now", endpoint: "trending/movie/week" },
  { title: "Netflix Originals", endpoint: "discover/movie?with_networks=213" },
  { title: "Top Rated", endpoint: "movie/top_rated" },
  { title: "Action Movies", endpoint: "discover/movie?with_genres=28" },
  { title: "Comedy Movies", endpoint: "discover/movie?with_genres=35" },
  { title: "Sci-Fi Adventures", endpoint: "discover/movie?with_genres=878" },
];

export function useMovieCategory(category: MovieCategory) {
  return useQuery({
    queryKey: ["movies", category.endpoint],
    queryFn: () => fetchTMDB(category.endpoint),
    staleTime: 1000 * 60 * 10,
  });
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchTMDB("search/movie", query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });
}

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const url = `https://${projectId}.supabase.co/functions/v1/tmdb-proxy?endpoint=movie/${id}&append_to_response=videos`;
      const res = await fetch(url, {
        headers: { "apikey": anonKey, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Failed to fetch movie ${id}`);
      return res.json();
    },
    staleTime: 1000 * 60 * 10,
  });
}
