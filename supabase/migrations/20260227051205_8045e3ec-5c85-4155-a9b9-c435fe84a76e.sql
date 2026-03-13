
-- Create user_lists table to persist My List
CREATE TABLE public.user_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  movie_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, movie_id)
);

-- Enable RLS
ALTER TABLE public.user_lists ENABLE ROW LEVEL SECURITY;

-- Users can only see their own list
CREATE POLICY "Users can view their own list"
  ON public.user_lists FOR SELECT
  USING (auth.uid() = user_id);

-- Users can add to their own list
CREATE POLICY "Users can add to their own list"
  ON public.user_lists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can remove from their own list
CREATE POLICY "Users can delete from their own list"
  ON public.user_lists FOR DELETE
  USING (auth.uid() = user_id);
