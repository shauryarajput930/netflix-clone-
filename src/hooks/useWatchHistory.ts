import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useWatchHistory() {
  const [history, setHistory] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setHistory([]); setLoading(false); return; }

    const { data } = await supabase
      .from("watch_history")
      .select("movie_id")
      .eq("user_id", session.user.id)
      .order("watched_at", { ascending: false });

    setHistory(data?.map((r) => r.movie_id) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHistory();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchHistory();
    });
    return () => subscription.unsubscribe();
  }, [fetchHistory]);

  const recordWatch = useCallback(async (movieId: number) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase
      .from("watch_history")
      .upsert(
        { user_id: session.user.id, movie_id: movieId, watched_at: new Date().toISOString() },
        { onConflict: "user_id,movie_id" }
      );

    setHistory((prev) => {
      const filtered = prev.filter((id) => id !== movieId);
      return [movieId, ...filtered];
    });
  }, []);

  const removeFromHistory = useCallback(async (movieId: number) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase
      .from("watch_history")
      .delete()
      .eq("user_id", session.user.id)
      .eq("movie_id", movieId);

    setHistory((prev) => prev.filter((id) => id !== movieId));
  }, []);

  const clearHistory = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase
      .from("watch_history")
      .delete()
      .eq("user_id", session.user.id);

    setHistory([]);
  }, []);

  return { history, recordWatch, removeFromHistory, clearHistory, loading };
}
