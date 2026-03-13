import { useState, useRef, useCallback } from "react";
import { Play, Plus, Check, Star, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TMDBMovie, posterUrl } from "@/lib/tmdb";
import { useMyList } from "@/lib/authStore";
import { AnimatePresence, motion } from "framer-motion";

interface HoverPreviewProps {
  movie: TMDBMovie;
  anchorRect: DOMRect;
  onClose: () => void;
}

const HoverPreview = ({ movie, anchorRect, onClose }: HoverPreviewProps) => {
  const navigate = useNavigate();
  const { toggle, isInList } = useMyList();
  const inList = isInList(movie.id);

  const left = Math.max(16, Math.min(anchorRect.left - 60, window.innerWidth - 340));
  const top = Math.max(16, anchorRect.top - 40 + window.scrollY);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="fixed z-[60] w-[320px] bg-card rounded-lg shadow-2xl overflow-hidden"
      style={{ left, top: anchorRect.top - 40 }}
      onMouseLeave={onClose}
    >
      <div className="relative aspect-video">
        <img src={posterUrl(movie.backdrop_path || movie.poster_path, "w780")} alt={movie.title} className="w-full h-full object-cover" />
        <div className="card-gradient absolute inset-0" />
        <button onClick={onClose} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/70 flex items-center justify-center">
          <X className="w-4 h-4 text-foreground" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/80 transition-colors"
          >
            <Play className="w-4 h-4 text-background fill-current" />
          </button>
          <button
            onClick={() => toggle(movie.id)}
            className="w-9 h-9 rounded-full border-2 border-foreground/40 flex items-center justify-center hover:border-foreground transition-colors"
          >
            {inList ? <Check className="w-4 h-4 text-foreground" /> : <Plus className="w-4 h-4 text-foreground" />}
          </button>
        </div>
        <h3 className="text-foreground font-medium text-sm mb-1">{movie.title}</h3>
        <div className="flex items-center gap-2 text-xs mb-2">
          <span className="flex items-center gap-1 text-primary"><Star className="w-3 h-3 fill-current" />{movie.vote_average.toFixed(1)}</span>
          <span className="text-muted-foreground">{movie.release_date?.slice(0, 4)}</span>
        </div>
        <p className="text-muted-foreground text-xs line-clamp-2">{movie.overview}</p>
      </div>
    </motion.div>
  );
};

interface MovieCardTMDBProps {
  movie: TMDBMovie;
}

const MovieCardTMDB = ({ movie }: MovieCardTMDBProps) => {
  const navigate = useNavigate();
  const { toggle, isInList } = useMyList();
  const inList = isInList(movie.id);
  const [showPreview, setShowPreview] = useState(false);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (cardRef.current) {
        setCardRect(cardRef.current.getBoundingClientRect());
        setShowPreview(true);
      }
    }, 800);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className="movie-card flex-shrink-0 w-[160px] md:w-[200px] group/card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <div className="relative aspect-[2/3]">
          <img
            src={posterUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover rounded"
            loading="lazy"
          />
          <div className="card-gradient absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 mb-1">
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}`); }}
                className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center"
              >
                <Play className="w-3 h-3 text-background fill-current" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggle(movie.id); }}
                className="w-7 h-7 rounded-full border-2 border-foreground/50 flex items-center justify-center"
              >
                {inList ? <Check className="w-3 h-3 text-foreground" /> : <Plus className="w-3 h-3 text-foreground" />}
              </button>
            </div>
            <p className="text-foreground text-xs font-medium truncate">{movie.title}</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPreview && cardRect && (
          <HoverPreview movie={movie} anchorRect={cardRect} onClose={() => setShowPreview(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieCardTMDB;
