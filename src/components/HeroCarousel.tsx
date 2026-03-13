import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { movieCategories, featuredMovie, Movie } from "@/lib/movieData";

const carouselMovies: Movie[] = [
  featuredMovie,
  ...movieCategories[0].movies.slice(0, 4),
];

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % carouselMovies.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + carouselMovies.length) % carouselMovies.length, -1);
  }, [current, goTo]);

  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  const movie = carouselMovies[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] w-full overflow-hidden">
      <AnimatePresence custom={direction} mode="wait">
        <motion.img
          key={movie.id}
          src={movie.backdropUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="hero-gradient absolute inset-0" />
      <div className="hero-gradient-left absolute inset-0" />

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center hover:bg-background/60 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center hover:bg-background/60 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full pb-16 sm:pb-24 md:pb-32 px-4 md:px-12 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display text-foreground text-shadow mb-3 md:mb-4">
              {movie.title}
            </h1>
            <p className="text-foreground/80 text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-6 line-clamp-2 sm:line-clamp-3">
              {movie.overview}
            </p>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="btn-netflix flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 hover:scale-105 active:scale-95 transition-transform"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                Play
              </button>
              <button
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="btn-netflix-outline flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-foreground/20 backdrop-blur-sm hover:scale-105 active:scale-95 transition-transform"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                More Info
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselMovies.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-3 bg-foreground/40 hover:bg-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
