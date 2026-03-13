import { useState, useEffect, useCallback } from "react";
import { useMockAuth } from "./mockAuthStore";

export function useAuth() {
  return useMockAuth();
}

export function useMyList() {
  const [list, setList] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchList = useCallback(async () => {
    // Mock implementation - in real app, this would fetch from Supabase
    const storedList = localStorage.getItem(`netflix_list_${user?.email}`);
    setList(storedList ? JSON.parse(storedList) : []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const toggle = useCallback(async (id: number) => {
    if (!user) return;

    const inList = list.includes(id);
    let newList;
    if (inList) {
      newList = list.filter((x) => x !== id);
    } else {
      newList = [...list, id];
    }
    
    setList(newList);
    localStorage.setItem(`netflix_list_${user.email}`, JSON.stringify(newList));
  }, [list, user]);

  const isInList = useCallback((id: number) => list.includes(id), [list]);

  return { list, toggle, isInList, loading };
}
