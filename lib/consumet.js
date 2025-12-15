import { ANIME } from "@consumet/extensions";
import { load } from "cheerio";

// Create a new instance of the Hianime provider (formerly Zoro)
const animeProvider = new ANIME.Hianime();

export const searchAnime = async (query) => {
  try {
    const results = await animeProvider.search(query);
    return results;
  } catch (err) {
    console.error("Error searching anime:", err);
    return { results: [] };
  }
};

export const getAnimeInfo = async (id) => {
  try {
    const info = await animeProvider.fetchAnimeInfo(id);
    return info;
  } catch (err) {
    console.error("Error fetching anime info:", err);
    return null;
  }
};

export const getRecentEpisodes = async (page = 1) => {
  try {
    // Hianime uses fetchRecentlyUpdated for latest episode updates
    const recent = await animeProvider.fetchRecentlyUpdated(page);
    return recent;
  } catch (err) {
    console.error("Error fetching recent episodes:", err);
    return { results: [] };
  }
};

export const getEpisodeSources = async (episodeId) => {
  try {
    const sources = await animeProvider.fetchEpisodeSources(episodeId);
    return sources;
  } catch (err) {
    console.error("Error fetching episode sources:", err);
    return null;
  }
};

export const getEpisodeEmbedUrl = async (episodeId) => {
  try {
    const baseUrl = animeProvider.baseUrl;
    const watchId = episodeId
      .replace("$episode$", "?ep=")
      .replace(/\$auto|\$sub|\$dub/gi, "");

    const epParam = watchId.split("?ep=")[1];
    if (!epParam) return null;

    const ajaxUrl = `${baseUrl}/ajax/v2/episode/servers?episodeId=${epParam}`;
    const res = await fetch(ajaxUrl);
    const data = await res.json();

    const $ = load(data.html);

    // Try to find HD-1 (VidStreaming) or HD-2 (VidCloud)
    // Usually the first one in 'sub' category is good
    let serverId = $(
      ".ps_-block.ps_-block-sub.servers-sub > .ps__-list .server-item"
    )
      .first()
      .attr("data-id");

    if (!serverId) {
      // Fallback to dub if no sub
      serverId = $(
        ".ps_-block.ps_-block-sub.servers-dub > .ps__-list .server-item"
      )
        .first()
        .attr("data-id");
    }

    if (!serverId) return null;

    const sourceUrl = `${baseUrl}/ajax/v2/episode/sources?id=${serverId}`;
    const sourceRes = await fetch(sourceUrl);
    const sourceData = await sourceRes.json();

    return sourceData.link;
  } catch (err) {
    console.error("Error fetching embed URL:", err);
    return null;
  }
};
