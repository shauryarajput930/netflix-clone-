import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TMDB_BASE = 'https://api.themoviedb.org/3';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const TMDB_API_KEY = Deno.env.get('TMDB_API_KEY');
  if (!TMDB_API_KEY) {
    return new Response(JSON.stringify({ error: 'TMDB_API_KEY not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint') || 'trending/movie/week';
    const page = url.searchParams.get('page') || '1';
    const query = url.searchParams.get('query') || '';

    // Determine if key is a v3 API key (32 chars) or v4 bearer token (longer)
    const isBearer = TMDB_API_KEY.length > 40;

    const separator = endpoint.includes('?') ? '&' : '?';
    let tmdbUrl = `${TMDB_BASE}/${endpoint}${separator}page=${page}`;
    if (!isBearer) {
      tmdbUrl += `&api_key=${TMDB_API_KEY}`;
    }
    if (query) tmdbUrl += `&query=${encodeURIComponent(query)}`;

    const fetchHeaders: Record<string, string> = {};
    if (isBearer) {
      fetchHeaders['Authorization'] = `Bearer ${TMDB_API_KEY}`;
      fetchHeaders['accept'] = 'application/json';
    }

    const response = await fetch(tmdbUrl, { headers: fetchHeaders });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`TMDB API error [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('TMDB proxy error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
