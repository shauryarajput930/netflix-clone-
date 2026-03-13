import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type RatingValue = "up" | "down" | null;

export function useMovieRating(movieId: number) {
  const [rating, setRating] = useState<RatingValue>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setRating(null); setLoading(false); return; }

      const { data } = await supabase
        .from("movie_ratings")
        .select("rating")
        .eq("user_id", session.user.id)
        .eq("movie_id", movieId)
        .maybeSingle();

      setRating((data?.rating as RatingValue) ?? null);
      setLoading(false);
    };
    load();
  }, [movieId]);

  const rate = useCallback(async (value: "up" | "down") => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    if (rating === value) {
      // Toggle off
      await supabase
        .from("movie_ratings")
        .delete()
        .eq("user_id", session.user.id)
        .eq("movie_id", movieId);
      setRating(null);
    } else {
      // Upsert
      await supabase
        .from("movie_ratings")
        .upsert(
          { user_id: session.user.id, movie_id: movieId, rating: value },
          { onConflict: "user_id,movie_id" }
        );
      setRating(value);
    }
  }, [movieId, rating]);

  return { rating, rate, loading };
}
