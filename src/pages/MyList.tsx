import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import PageTransition from "@/components/PageTransition";
import { useMyList } from "@/lib/authStore";
import { movieCategories, featuredMovie } from "@/lib/movieData";

const allMovies = [featuredMovie, ...movieCategories.flatMap((c) => c.movies)];

const MyList = () => {
  const { list } = useMyList();
  const movies = allMovies.filter((m) => list.includes(m.id));

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 md:pt-24 px-4 md:px-12 pb-12">
          <motion.h1
            className="text-foreground font-display text-2xl md:text-4xl mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            My List
          </motion.h1>
          {movies.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-20 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-muted-foreground text-base md:text-lg mb-4">
                Your list is empty. Browse movies and add them to your list!
              </p>
              <Link to="/" className="btn-netflix text-sm px-6 py-2 hover:scale-105 active:scale-95 transition-transform">
                Browse Movies
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
              {movies.map((movie, i) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default MyList;
