import { Play, Plus, Check, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Movie } from "@/lib/movieData";
import { useMyList } from "@/lib/authStore";
import MovieRating from "./MovieRating";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const { toggle, isInList } = useMyList();
  const inList = isInList(movie.id);

  return (
    <div
      className="movie-card flex-shrink-0 w-[130px] sm:w-[160px] md:w-[200px] group/card"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="relative aspect-[2/3]">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover rounded transition-[filter] duration-300 group-hover/card:brightness-75"
          loading="lazy"
        />
        <div className="card-gradient absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-y-3 group-hover/card:translate-y-0">
          <div className="flex items-center gap-1 mb-2">
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}`); }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/80 hover:scale-110 active:scale-90 transition-all duration-200"
            >
              <Play className="w-3 h-3 sm:w-4 sm:h-4 text-background fill-current" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggle(movie.id); }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-foreground/50 flex items-center justify-center hover:border-foreground hover:scale-110 active:scale-90 transition-all duration-200"
            >
              {inList ? <Check className="w-3 h-3 sm:w-4 sm:h-4 text-foreground" /> : <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-foreground" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}`); }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-foreground/50 flex items-center justify-center hover:border-foreground hover:scale-110 active:scale-90 transition-all duration-200 ml-auto"
            >
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-foreground" />
            </button>
          </div>
          <p className="text-foreground text-xs font-medium truncate">{movie.title}</p>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs truncate">{movie.genre} • ⭐ {movie.rating}</p>
            <MovieRating movieId={movie.id} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
