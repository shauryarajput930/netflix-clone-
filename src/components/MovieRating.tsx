import { ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";
import { useMovieRating } from "@/hooks/useMovieRating";
import { useAuth } from "@/lib/authStore";

interface MovieRatingProps {
  movieId: number;
  size?: "sm" | "md";
}

const MovieRating = ({ movieId, size = "md" }: MovieRatingProps) => {
  const { rating, rate } = useMovieRating(movieId);
  const { user } = useAuth();

  if (!user) return null;

  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  const btnSize = size === "sm"
    ? "w-7 h-7 sm:w-8 sm:h-8"
    : "w-9 h-9 sm:w-10 sm:h-10";

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={(e) => { e.stopPropagation(); rate("up"); }}
        className={`${btnSize} rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          rating === "up"
            ? "border-primary bg-primary/20 text-primary"
            : "border-foreground/50 text-foreground hover:border-foreground"
        }`}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        title="Thumbs up"
      >
        <ThumbsUp className={`${iconSize} ${rating === "up" ? "fill-current" : ""}`} />
      </motion.button>
      <motion.button
        onClick={(e) => { e.stopPropagation(); rate("down"); }}
        className={`${btnSize} rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          rating === "down"
            ? "border-destructive bg-destructive/20 text-destructive"
            : "border-foreground/50 text-foreground hover:border-foreground"
        }`}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        title="Thumbs down"
      >
        <ThumbsDown className={`${iconSize} ${rating === "down" ? "fill-current" : ""}`} />
      </motion.button>
    </div>
  );
};

export default MovieRating;
