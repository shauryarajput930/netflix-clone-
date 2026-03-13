import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/authStore";
import PageTransition from "@/components/PageTransition";
import authBg from "@/assets/auth-bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const err = await login(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
    } else {
      navigate("/");
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen flex items-center justify-center">
        <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />

        <motion.div
          className="absolute top-6 left-6 md:left-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-primary font-display text-3xl md:text-4xl tracking-wider hover:opacity-80 transition-opacity">NETFLIX</Link>
        </motion.div>

        <motion.div
          className="relative z-10 w-full max-w-md bg-background/80 backdrop-blur-md rounded-lg p-8 md:p-12 mx-4"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-foreground font-display text-4xl mb-8">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address" required
              className="w-full bg-muted text-foreground rounded px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground transition-shadow duration-200"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            />
            <motion.input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" required
              className="w-full bg-muted text-foreground rounded px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground transition-shadow duration-200"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            />
            {error && (
              <motion.p className="text-destructive text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {error}
              </motion.p>
            )}
            <motion.button
              type="submit"
              disabled={submitting}
              className="btn-netflix w-full py-3 text-base hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {submitting ? "Signing in…" : "Sign In"}
            </motion.button>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-primary" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-muted-foreground hover:underline">Need help?</Link>
            </div>
          </form>
          <p className="text-muted-foreground mt-12 text-base">
            New to Netflix?{" "}
            <Link to="/signup" className="text-foreground hover:underline font-medium">Sign up now</Link>.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Login;
