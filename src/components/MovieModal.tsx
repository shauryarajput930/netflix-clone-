import { X, Play, Plus, Check, Star } from "lucide-react";
import { Movie } from "@/lib/movieData";
import { useMyList } from "@/lib/authStore";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const { toggle, isInList } = useMyList();
  const inList = isInList(movie.id);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-3xl bg-card rounded-lg overflow-hidden shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="relative aspect-video">
          {movie.trailerUrl ? (
            <iframe
              src={movie.trailerUrl}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={movie.title}
            />
          ) : (
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
          )}
          <div className="hero-gradient absolute inset-0 pointer-events-none" />
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-foreground font-display text-3xl md:text-4xl mb-2">{movie.title}</h2>
          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="flex items-center gap-1 text-primary">
              <Star className="w-4 h-4 fill-current" /> {movie.rating}
            </span>
            <span className="text-muted-foreground">{movie.releaseDate}</span>
            <span className="px-2 py-0.5 border border-muted-foreground/30 text-muted-foreground text-xs rounded">
              {movie.genre}
            </span>
          </div>
          <p className="text-foreground/80 text-sm leading-relaxed mb-6">{movie.overview}</p>
          <div className="flex gap-3">
            <button className="btn-netflix flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" /> Play
            </button>
            <button onClick={() => toggle(movie.id)} className="btn-netflix-outline flex items-center gap-2">
              {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {inList ? "In My List" : "My List"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
