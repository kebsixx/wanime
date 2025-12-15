import { searchAnime } from '../../lib/consumet';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = q || '';
  
  let results = [];
  if (query) {
    const data = await searchAnime(query);
    results = data.results || [];
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 font-sans">
      <main className="max-w-6xl mx-auto">
        

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Search Results for "{query}"
          </h1>
        </div>
        
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((anime) => (
              <Link key={anime.id} href={`/watch/${anime.id}`} className="group relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow block">
                <div className="aspect-[2/3] relative">
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
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-sm font-medium">
                      {anime.sub > 0 ? `Ep ${anime.sub}` : (anime.episodes > 0 ? `Ep ${anime.episodes}` : (anime.type || 'Anime'))}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2" title={anime.title}>
                    {anime.title}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">{anime.releaseDate}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No results found for "{query}"</p>
            <p className="text-gray-400 mt-2">Try searching for something else.</p>
          </div>
        )}
      </main>
    </div>
  );
}
