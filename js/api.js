/* ============================================
   Animatch - Jikan API Integration Layer
   Handles all communication with Jikan v4 API
   ============================================ */

const JikanAPI = (function () {
  "use strict";

  const BASE_URL = "https://api.jikan.moe/v4";
  const RATE_LIMIT_MS = 350;

  let lastRequestTime = 0;

  async function rateLimitedFetch(url) {
    const now = Date.now();
    const elapsed = now - lastRequestTime;
    if (elapsed < RATE_LIMIT_MS) {
      await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_MS - elapsed));
    }
    lastRequestTime = Date.now();

    const response = await fetch(url);
    if (response.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return rateLimitedFetch(url);
    }
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    return response.json();
  }

  function mapAnimeData(item) {
    const genres = (item.genres || [])
      .concat(item.themes || [])
      .map((g) => g.name);
    return {
      mal_id: item.mal_id,
      title: item.title_english || item.title,
      image: item.images?.webp?.large_image_url || item.images?.jpg?.large_image_url || "",
      description: item.synopsis ? item.synopsis.replace(/\[Written by MAL Rewrite\]/g, "").trim() : "No description available.",
      rating: item.score || 0,
      episodes: item.episodes || "?",
      genres: genres.length > 0 ? genres : ["Unknown"],
      type: item.type || "TV",
      status: item.status || "Unknown",
      url: item.url || "",
    };
  }

  async function getTopAnime(page = 1, limit = 24) {
    const data = await rateLimitedFetch(`${BASE_URL}/top/anime?page=${page}&limit=${limit}`);
    return {
      anime: (data.data || []).map(mapAnimeData),
      pagination: data.pagination || {},
    };
  }

  async function searchAnime(query, page = 1, limit = 12) {
    if (!query || query.trim().length < 2) return { anime: [], pagination: {} };
    const encoded = encodeURIComponent(query.trim());
    const data = await rateLimitedFetch(`${BASE_URL}/anime?q=${encoded}&page=${page}&limit=${limit}&order_by=score&sort=desc`);
    return {
      anime: (data.data || []).map(mapAnimeData),
      pagination: data.pagination || {},
    };
  }

  async function getRandomAnime() {
    const data = await rateLimitedFetch(`${BASE_URL}/random/anime`);
    return data.data ? mapAnimeData(data.data) : null;
  }

  async function getAnimeByGenre(genreId, page = 1, limit = 12) {
    const data = await rateLimitedFetch(`${BASE_URL}/anime?genres=${genreId}&order_by=score&sort=desc&page=${page}&limit=${limit}`);
    return {
      anime: (data.data || []).map(mapAnimeData),
      pagination: data.pagination || {},
    };
  }

  async function getAnimeRecommendations(malId) {
    const data = await rateLimitedFetch(`${BASE_URL}/anime/${malId}/recommendations`);
    return (data.data || []).slice(0, 6).map((rec) => mapAnimeData(rec.entry));
  }

  const GENRE_MAP = {
    Action: 1,
    Adventure: 2,
    Comedy: 4,
    Drama: 8,
    Fantasy: 10,
    Horror: 14,
    Mystery: 7,
    Romance: 22,
    "Sci-Fi": 24,
    "Slice of Life": 36,
    Sports: 30,
    Supernatural: 37,
  };

  return {
    getTopAnime,
    searchAnime,
    getRandomAnime,
    getAnimeByGenre,
    getAnimeRecommendations,
    mapAnimeData,
    GENRE_MAP,
  };
})();
