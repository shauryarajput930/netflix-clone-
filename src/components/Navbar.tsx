import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/authStore";
import ThemeToggle from "./ThemeToggle";
import SearchSuggestions from "./SearchSuggestions";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/?filter=tv", label: "TV Shows" },
  { to: "/?filter=movies", label: "Movies" },
  { to: "/mylist", label: "My List" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load avatar from localStorage to sync with AccountSettings
    if (user) {
      const storedAvatar = localStorage.getItem(`netflix_avatar_${user.email}`);
      setAvatarUrl(storedAvatar);
    } else {
      setAvatarUrl(null);
    }

    // Listen for storage changes to sync avatar in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `netflix_avatar_${user?.email}`) {
        setAvatarUrl(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const trimmedQuery = searchQuery.trim();
      navigate(`/?search=${encodeURIComponent(trimmedQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-3">
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/" className="text-primary font-display text-2xl md:text-4xl tracking-wider hover:opacity-80 transition-opacity">
            NETFLIX
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.form
                key="search"
                onSubmit={handleSearch}
                className="relative flex items-center bg-card border border-border rounded-lg px-3 py-2 shadow-lg"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0 mr-2" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search movies, genres..."
                  className="bg-transparent border-none outline-none text-foreground text-sm placeholder:text-muted-foreground w-32 md:w-64"
                />
                <button type="button" onClick={closeSearch} className="ml-2">
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
                <SearchSuggestions query={searchQuery} onSelect={closeSearch} />
              </motion.form>
            ) : (
              <motion.button
                key="search-icon"
                onClick={() => setSearchOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-5 h-5 text-foreground" />
              </motion.button>
            )}
          </AnimatePresence>

          <ThemeToggle />

          <Bell className="w-5 h-5 text-foreground hidden md:block cursor-pointer hover:text-muted-foreground transition-colors" />

          {user ? (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-1">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover hover:ring-2 hover:ring-primary/50 transition-all" />
                ) : (
                  <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm hover:ring-2 hover:ring-primary/50 transition-all">
                    {user.name[0].toUpperCase()}
                  </div>
                )}
                <motion.div animate={{ rotate: menuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 text-foreground hidden md:block" />
                </motion.div>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-3 border-b border-border flex items-center gap-3">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                          {user.name[0].toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/account"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full text-left px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors duration-200 border-b border-border"
                    >
                      Account Settings
                    </Link>
                    <button
                      onClick={async () => { await logout(); setMenuOpen(false); navigate("/login"); }}
                      className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="btn-netflix text-xs md:text-sm py-1.5 px-3 md:px-4 hover:scale-105 active:scale-95 transition-transform">
              Sign In
            </Link>
          )}

          <motion.button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col px-4 py-4 gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground text-base hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
