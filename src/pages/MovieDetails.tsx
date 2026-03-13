import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft, Play, Plus, Check, Star } from "lucide-react";
import MovieRating from "@/components/MovieRating";
import { motion } from "framer-motion";
import { movieCategories, featuredMovie } from "@/lib/movieData";
import { useMyList } from "@/lib/authStore";
import { useWatchHistory } from "@/hooks/useWatchHistory";
import PageTransition from "@/components/PageTransition";

const allMovies = [featuredMovie, ...movieCategories.flatMap((c) => c.movies)];

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggle, isInList } = useMyList();

  const { recordWatch } = useWatchHistory();
  const trailerRef = useRef<HTMLDivElement>(null);

  const movie = allMovies.find((m) => m.id === Number(id));

  // Record watch history when visiting a movie page
  useEffect(() => {
    if (movie) recordWatch(movie.id);
  }, [movie?.id]);

  const scrollToTrailer = () => {
    trailerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!movie) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-foreground font-display text-3xl md:text-4xl mb-4">Movie Not Found</h1>
            <Link to="/" className="text-primary hover:underline">Go back home</Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  const inList = isInList(movie.id);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
          <motion.img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />
          <div className="hero-gradient absolute inset-0" />
          <div className="hero-gradient-left absolute inset-0" />

          <motion.button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center hover:bg-background/80 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 z-10">
            <motion.h1
              className="text-foreground font-display text-3xl sm:text-5xl md:text-7xl text-shadow mb-3 md:mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {movie.title}
            </motion.h1>
            <motion.div
              className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="flex items-center gap-1 text-primary text-sm sm:text-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> {movie.rating}
              </span>
              <span className="text-muted-foreground text-sm">{movie.releaseDate}</span>
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 border border-muted-foreground/30 text-muted-foreground text-xs sm:text-sm rounded">
                {movie.genre}
              </span>
            </motion.div>
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-12 py-6 md:py-8 max-w-4xl">
          <motion.p
            className="text-foreground/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {movie.overview}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={scrollToTrailer}
              className="btn-netflix flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg px-6 md:px-8 py-2.5 sm:py-3 hover:scale-105 active:scale-95 transition-transform"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> Play Trailer
            </button>
            <button
              onClick={() => toggle(movie.id)}
              className="btn-netflix-outline flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg px-6 md:px-8 py-2.5 sm:py-3 hover:scale-105 active:scale-95 transition-transform"
            >
              {inList ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
              {inList ? "In My List" : "Add to List"}
            </button>
            <MovieRating movieId={movie.id} />
          </motion.div>

          {movie.trailerUrl && (
            <motion.div
              ref={trailerRef}
              className="mt-8 md:mt-12 aspect-video rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <iframe
                src={movie.trailerUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`${movie.title} trailer`}
              />
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default MovieDetails;
