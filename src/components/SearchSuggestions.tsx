import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { movieCategories, featuredMovie, Movie } from "@/lib/movieData";

const allMovies: Movie[] = [featuredMovie, ...movieCategories.flatMap((c) => c.movies)];
// Deduplicate by title
const uniqueMovies = allMovies.filter((m, i, arr) => arr.findIndex((x) => x.title === m.title) === i);

interface SearchSuggestionsProps {
  query: string;
  onSelect: () => void;
}

const SearchSuggestions = ({ query, onSelect }: SearchSuggestionsProps) => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    // Better search logic - search in title and genre
    const q = query.toLowerCase().trim();
    const filtered = uniqueMovies.filter((m) => {
      const titleMatch = m.title.toLowerCase().includes(q);
      const genreMatch = m.genre.toLowerCase().includes(q);
      return titleMatch || genreMatch;
    }).slice(0, 8); // Show more results
    
    setResults(filtered);
  }, [query]);

  const handleMovieSelect = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
    onSelect();
  };

  return (
    <AnimatePresence>
      {results.length > 0 && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto"
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2">
            <p className="text-xs text-muted-foreground px-2 py-1 font-medium">
              {results.length} {results.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
          {results.map((movie) => (
            <button
              key={movie.id}
              onClick={() => handleMovieSelect(movie)}
              className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-accent transition-colors group"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-10 h-14 object-cover rounded flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground truncate font-medium">{movie.title}</p>
                <p className="text-xs text-muted-foreground">{movie.genre} • ⭐ {movie.rating}</p>
              </div>
              <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchSuggestions;
