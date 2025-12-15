const { ANIME } = require('@consumet/extensions');

const run = async () => {
    const animeProvider = new ANIME.Hianime();
    try {
        // 1. Get Info
        console.log("Fetching info for 'one-piece-100'...");
        const info = await animeProvider.fetchAnimeInfo('one-piece-100');
        console.log("Info fetched. Total episodes:", info.episodes.length);
        
        if (info.episodes.length > 0) {
            const lastEpisode = info.episodes[info.episodes.length - 1];
            console.log("Last episode ID:", lastEpisode.id);

            // 2. Get Servers
            console.log("Fetching servers for episode:", lastEpisode.id);
            const servers = await animeProvider.fetchEpisodeServers(lastEpisode.id);
            console.log("Servers:", JSON.stringify(servers, null, 2));

            // 3. Get Sources from a specific server (e.g. VidStreaming if available)
            // Note: fetchEpisodeSources usually takes (episodeId, server, category)
            // Let's try to see what happens with default
            console.log("Fetching sources for episode (default):", lastEpisode.id);
            const sources = await animeProvider.fetchEpisodeSources(lastEpisode.id);
            console.log("Sources (default):", JSON.stringify(sources, null, 2));
        }
    } catch (err) {
        console.error(err);
    }
};

run();
