const { ANIME, StreamingServers } = require('@consumet/extensions');
const axios = require('axios');
const cheerio = require('cheerio');

const run = async () => {
    const animeProvider = new ANIME.Hianime();
    const episodeId = 'one-piece-100$episode$160189'; // From previous debug
    const baseUrl = 'https://hianime.to';

    try {
        // 1. Construct watch URL (logic from hianime.js)
        const watchId = episodeId
            .replace('$episode$', '?ep=')
            .replace(/\$auto|\$sub|\$dub/gi, '');
        
        const ajaxUrl = `${baseUrl}/ajax/v2/episode/servers?episodeId=${watchId.split('?ep=')[1]}`;
        console.log('Ajax URL:', ajaxUrl);

        const { data } = await axios.get(ajaxUrl);
        const $ = cheerio.load(data.html);

        // 2. Find Server ID for VidStreaming (index 4) or VidCloud (index 1)
        // Logic from retrieveServerId in hianime.js
        // .ps_-block.ps_-block-sub.servers-sub > .ps__-list .server-item
        // data-server-id attribute
        
        // Let's print all servers found
        $('.server-item').each((i, el) => {
            console.log(`Server: ${$(el).text().trim()}, ID: ${$(el).attr('data-id')}, Type: ${$(el).attr('data-type')}`);
        });

        // Try to pick one (VidStreaming is usually preferred for embeds)
        // VidStreaming is often labeled "Vidstreaming" or "HD-1"
        // In hianime.js: VidStreaming -> index 4.
        // But let's just pick the first one for now or look for specific data-id
        
        // Let's assume we want the one with data-id that corresponds to VidCloud or VidStreaming
        // In the library, it selects based on index passed to retrieveServerId.
        // VidCloud: index 1
        // VidStreaming: index 4
        
        // Let's try to find the element that matches the library's selector for VidStreaming (sub)
        // retrieveServerId($, 4, 'sub')
        // selector: `.ps_-block.ps_-block-sub.servers-sub > .ps__-list .server-item`
        // filter by data-id matching the index? No, the library logic is:
        // $(selector).each((i, el) => { if (+$(el).attr('data-id') == index) ... }) -> WAIT NO
        
        // Let's look at retrieveServerId implementation again in hianime.js
        /*
        this.retrieveServerId = ($, index, subOrDub) => {
            const rawOrSubOrDub = (raw) => $(`.ps_-block.ps_-block-sub.servers-${raw ? 'raw' : subOrDub} > .ps__-list .server-item`)
            // ...
             // It seems it finds the item where data-server-id == index? No.
             // Actually I need to read the code carefully.
        }
        */
       
       // Let's just grab the first available server ID for 'sub'
       const serverId = $('.ps_-block.ps_-block-sub.servers-sub > .ps__-list .server-item').first().attr('data-id');
       console.log('Selected Server ID:', serverId);

       if (serverId) {
           const sourceUrl = `${baseUrl}/ajax/v2/episode/sources?id=${serverId}`;
           console.log('Source API URL:', sourceUrl);
           
           const sourceRes = await axios.get(sourceUrl);
           console.log('Embed URL (link):', sourceRes.data.link);
       }

    } catch (err) {
        console.error(err);
    }
};

run();
