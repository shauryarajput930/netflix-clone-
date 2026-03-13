import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { movieCategories, Movie } from "@/lib/movieData";
import { useWatchHistory } from "@/hooks/useWatchHistory";
import { useAuth } from "@/lib/authStore";

const allMovies: Movie[] = movieCategories.flatMap((c) => c.movies);

const Index = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";
  const { history, removeFromHistory, clearHistory } = useWatchHistory();
  const { user } = useAuth();

  const continueWatchingMovies = history
    .map((id) => allMovies.find((m) => m.id === id))
    .filter(Boolean) as Movie[];

  const filteredCategories = search
    ? [{
        title: "Results",
        movies: allMovies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase())),
      }]
    : filter === "movies"
    ? movieCategories.map((c) => ({
        ...c,
        movies: c.movies.filter((m) => !m.genre.toLowerCase().includes("tv")),
      })).filter((c) => c.movies.length > 0)
    : filter === "tv"
    ? movieCategories.map((c) => ({
        ...c,
        movies: c.movies.filter((m) => m.genre.toLowerCase().includes("tv") || m.genre.toLowerCase().includes("series")),
      })).filter((c) => c.movies.length > 0)
    : movieCategories;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        {!search && !filter && <HeroCarousel />}
        <div className={search || filter ? "pt-20 md:pt-24" : "-mt-12 md:-mt-16 relative z-10"}>
          {search && (
            <p className="text-muted-foreground text-sm px-4 md:px-12 mb-4">
              Search results for: <span className="text-foreground">"{search}"</span>
            </p>
          )}
          {!search && !filter && user && continueWatchingMovies.length > 0 && (
            <MovieRow
              title="Continue Watching"
              movies={continueWatchingMovies}
              onRemoveMovie={removeFromHistory}
              onClearAll={clearHistory}
            />
          )}
          {filteredCategories.map((cat) => (
            <MovieRow key={cat.title} title={cat.title} movies={cat.movies} />
          ))}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
