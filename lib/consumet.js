import { ANIME } from '@consumet/extensions';

// Create a new instance of the Hianime provider (formerly Zoro)
const animeProvider = new ANIME.Hianime();

export const searchAnime = async (query) => {
  try {
    const results = await animeProvider.search(query);
    return results;
  } catch (err) {
    console.error('Error searching anime:', err);
    return { results: [] };
  }
};

export const getAnimeInfo = async (id) => {
  try {
    const info = await animeProvider.fetchAnimeInfo(id);
    return info;
  } catch (err) {
    console.error('Error fetching anime info:', err);
    return null;
  }
};

export const getRecentEpisodes = async () => {
    try {
        // Hianime uses fetchRecentlyUpdated for latest episode updates
        const recent = await animeProvider.fetchRecentlyUpdated();
        return recent;
    } catch (err) {
        console.error('Error fetching recent episodes:', err);
        return { results: [] };
    }
}
