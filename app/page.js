import { getRecentEpisodes } from '../lib/consumet';
import Link from 'next/link';
import SearchBar from './components/SearchBar';

export default async function Home() {
  const data = await getRecentEpisodes(1);
  const recentAnime = data.results ? data.results.slice(0, 12) : [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 font-sans">
      <main className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-orange-500 italic">Wanime</h1>
          <div className="w-full md:w-96">
            <SearchBar />
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-black dark:text-white">Recent Anime Releases</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentAnime.map((anime) => (
            <Link key={anime.id} href={`/watch/${anime.id}`} className="group relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow block">
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
            </Link>
          ))}
        </div>
        
        {(!data.results || data.results.length === 0) && (
          <p className="text-center text-gray-500 mt-10">No recent episodes found or API error.</p>
        )}

        <div className="mt-10 flex justify-center">
          <Link 
            href="/recent" 
            className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 font-medium text-lg"
          >
            View All Recent Episodes
          </Link>
        </div>
      </main>
    </div>
  );
}
