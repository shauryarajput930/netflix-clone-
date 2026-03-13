import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/authStore";
import PageTransition from "@/components/PageTransition";
import authBg from "@/assets/auth-bg.jpg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setError("");
    setSubmitting(true);
    const err = await signup(name, email, password);
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
          <h1 className="text-foreground font-display text-4xl mb-8">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { type: "text", value: name, set: setName, placeholder: "Name", delay: 0.2 },
              { type: "email", value: email, set: setEmail, placeholder: "Email address", delay: 0.25 },
              { type: "password", value: password, set: setPassword, placeholder: "Password", delay: 0.3 },
              { type: "password", value: confirm, set: setConfirm, placeholder: "Confirm Password", delay: 0.35 },
            ].map((field) => (
              <motion.input
                key={field.placeholder}
                type={field.type}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                placeholder={field.placeholder}
                required
                className="w-full bg-muted text-foreground rounded px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground transition-shadow duration-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: field.delay }}
              />
            ))}
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
              {submitting ? "Creating account…" : "Sign Up"}
            </motion.button>
          </form>
          <p className="text-muted-foreground mt-12 text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-foreground hover:underline font-medium">Sign in</Link>.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Signup;
