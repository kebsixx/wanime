const { ANIME } = require('@consumet/extensions');

const run = async () => {
    const animeProvider = new ANIME.Hianime();
    try {
        const data = await animeProvider.fetchRecentlyUpdated();
        console.log('Results length:', data.results.length);
    } catch (err) {
        console.error(err);
    }
};

run();
