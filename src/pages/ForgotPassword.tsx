import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import PageTransition from "@/components/PageTransition";
import authBg from "@/assets/auth-bg.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (err) {
        setError(err.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <PageTransition>
        <div className="relative min-h-screen flex items-center justify-center">
          <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />

          <motion.div
            className="relative z-10 w-full max-w-md bg-background/80 backdrop-blur-md rounded-lg p-8 md:p-12 mx-4"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-foreground font-display text-3xl mb-4">Check your email</h1>
            <p className="text-muted-foreground mb-6">
              We've sent a password reset link to <strong>{email}</strong>. Click the link in the email to reset your password.
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              If you don't see the email, check your spam folder.
            </p>
            <Link
              to="/login"
              className="btn-netflix w-full py-3 text-base text-center block hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Back to Sign In
            </Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

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
          <h1 className="text-foreground font-display text-4xl mb-8">Reset Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full bg-muted text-foreground rounded px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground transition-shadow duration-200"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
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
              transition={{ delay: 0.3 }}
            >
              {submitting ? "Sending…" : "Send Reset Link"}
            </motion.button>
          </form>
          <p className="text-muted-foreground mt-12 text-base">
            Remember your password?{" "}
            <Link to="/login" className="text-foreground hover:underline font-medium">Sign in</Link>.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ForgotPassword;
