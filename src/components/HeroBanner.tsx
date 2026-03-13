import { Play, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { featuredMovie } from "@/lib/movieData";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] w-full overflow-hidden">
      <motion.img
        src={heroBanner}
        alt="Hero banner"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      />
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-gradient-left absolute inset-0" />

      <div className="relative z-10 flex flex-col justify-end h-full pb-16 sm:pb-24 md:pb-32 px-4 md:px-12 max-w-2xl">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl font-display text-foreground text-shadow mb-3 md:mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {featuredMovie.title}
        </motion.h1>
        <motion.p
          className="text-foreground/80 text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-6 line-clamp-2 sm:line-clamp-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {featuredMovie.overview}
        </motion.p>
        <motion.div
          className="flex gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <button
            onClick={() => navigate(`/movie/${featuredMovie.id}`)}
            className="btn-netflix flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 hover:scale-105 active:scale-95 transition-transform"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            Play
          </button>
          <button
            onClick={() => navigate(`/movie/${featuredMovie.id}`)}
            className="btn-netflix-outline flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-foreground/20 backdrop-blur-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            More Info
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
