import { getRecentEpisodes } from '../lib/consumet';

export default async function Home() {
  const data = await getRecentEpisodes();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 font-sans">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">Recent Anime Releases</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.results?.map((anime) => (
            <div key={anime.id} className="group relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-2/3 relative">
                {anime.image ? (
                  <img 
                    src={anime.image} 
                    alt={anime.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-sm font-medium">
                    {anime.sub > 0 ? `Ep ${anime.sub}` : (anime.episodes > 0 ? `Ep ${anime.episodes}` : 'Ep ?')}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2" title={anime.title}>
                  {anime.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
        
        {(!data.results || data.results.length === 0) && (
          <p className="text-center text-gray-500 mt-10">No recent episodes found or API error.</p>
        )}
      </main>
    </div>
  );
}
