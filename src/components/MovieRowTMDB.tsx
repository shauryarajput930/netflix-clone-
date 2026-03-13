import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TMDBMovie } from "@/lib/tmdb";
import MovieCardTMDB from "./MovieCardTMDB";
import SkeletonRow from "./SkeletonRow";

interface MovieRowTMDBProps {
  title: string;
  movies: TMDBMovie[] | undefined;
  isLoading: boolean;
}

const MovieRowTMDB = ({ title, movies, isLoading }: MovieRowTMDBProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.8;
    rowRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (isLoading) return <SkeletonRow />;
  if (!movies?.length) return null;

  return (
    <div className="mb-8 group/row">
      <h2 className="text-foreground font-display text-xl md:text-2xl tracking-wide px-4 md:px-12 mb-2">
        {title}
      </h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-background/50 opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-8 h-8 text-foreground" />
        </button>

        <div ref={rowRef} className="flex gap-2 overflow-x-auto scrollbar-hide px-4 md:px-12 py-4">
          {movies.map((movie) => (
            <MovieCardTMDB key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-background/50 opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-8 h-8 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default MovieRowTMDB;
