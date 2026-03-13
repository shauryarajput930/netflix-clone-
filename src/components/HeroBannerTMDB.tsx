import { Play, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMovieCategory, backdropUrl, CATEGORIES } from "@/lib/tmdb";
import { HeroSkeleton } from "./SkeletonRow";
import heroBannerFallback from "@/assets/hero-banner.jpg";

const HeroBannerTMDB = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useMovieCategory(CATEGORIES[0]);

  if (isLoading) return <HeroSkeleton />;

  const movie = data?.results?.[0];
  if (!movie) return null;

  const bgImage = movie.backdrop_path ? backdropUrl(movie.backdrop_path) : heroBannerFallback;

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <img src={bgImage} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-gradient-left absolute inset-0" />

      <div className="relative z-10 flex flex-col justify-end h-full pb-32 px-4 md:px-12 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-display text-foreground text-shadow mb-4 animate-slide-up">
          {movie.title}
        </h1>
        <p className="text-foreground/80 text-sm md:text-base leading-relaxed mb-6 animate-slide-up line-clamp-3" style={{ animationDelay: "0.1s" }}>
          {movie.overview}
        </p>
        <div className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="btn-netflix flex items-center gap-2 text-lg px-8 py-3"
          >
            <Play className="w-5 h-5 fill-current" /> Play
          </button>
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="btn-netflix-outline flex items-center gap-2 text-lg px-8 py-3 bg-foreground/20 backdrop-blur-sm"
          >
            <Info className="w-5 h-5" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerTMDB;
