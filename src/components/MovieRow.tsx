import { useRef } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Movie } from "@/lib/movieData";
import MovieCard from "./MovieCard";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onRemoveMovie?: (movieId: number) => void;
  onClearAll?: () => void;
}

const MovieRow = ({ title, movies, onRemoveMovie, onClearAll }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.8;
    rowRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (!movies.length) return null;

  return (
    <motion.div
      className="mb-6 md:mb-8 group/row"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-4 md:px-12 mb-2">
        <h2 className="text-foreground font-display text-lg sm:text-xl md:text-2xl tracking-wide">
          {title}
        </h2>
        {onClearAll && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        )}
      </div>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 md:w-12 flex items-center justify-center bg-background/60 backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-background/80"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
        </button>

        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 md:px-12 py-3 md:py-4"
        >
          {movies.map((movie, i) => (
            <motion.div
              key={movie.id}
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              {onRemoveMovie && (
                <button
                  onClick={(e) => { e.stopPropagation(); onRemoveMovie(movie.id); }}
                  className="absolute top-1 right-1 z-30 w-6 h-6 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-background transition-all opacity-0 group-hover/row:opacity-100"
                  title="Remove from history"
                >
                  <span className="text-sm font-bold leading-none">×</span>
                </button>
              )}
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 md:w-12 flex items-center justify-center bg-background/60 backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-background/80"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
        </button>
      </div>
    </motion.div>
  );
};

export default MovieRow;
