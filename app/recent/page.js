import { getRecentEpisodes } from "../../lib/consumet";
import Link from "next/link";

export default async function RecentPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const itemsPerPage = 12;
  const apiPageSize = 40; // Based on our check

  const apiPage = Math.ceil((page * itemsPerPage) / apiPageSize);
  const startIndex = ((page - 1) * itemsPerPage) % apiPageSize;
  const endIndex = startIndex + itemsPerPage;

  const data = await getRecentEpisodes(apiPage);

  // Handle case where API might return fewer items than expected
  const recentAnime = data.results
    ? data.results.slice(startIndex, endIndex)
    : [];

  const hasNextPage =
    data.hasNextPage || (data.results && endIndex < data.results.length);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 font-sans">
      <main className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Recent Anime - Page {page}
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentAnime.map((anime) => (
            <Link
              key={anime.id}
              href={`/watch/${anime.id}`}
              className="group relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow block">
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
                    {anime.sub > 0
                      ? `Ep ${anime.sub}`
                      : anime.episodes > 0
                      ? `Ep ${anime.episodes}`
                      : "Ep ?"}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <h2
                  className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2"
                  title={anime.title}>
                  {anime.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {recentAnime.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No more episodes found.
          </p>
        )}

        <div className="flex justify-center items-center gap-6 mt-12">
          <Link
            href={page > 1 ? `/recent?page=${page - 1}` : "#"}
            className={`px-6 py-2 rounded-md border transition-colors ${
              page > 1
                ? "bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 text-black dark:text-white"
                : "bg-gray-100 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed"
            }`}
            aria-disabled={page <= 1}>
            Previous
          </Link>

          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Page {page}
          </span>

          <Link
            href={hasNextPage ? `/recent?page=${page + 1}` : "#"}
            className={`px-6 py-2 rounded-md transition-colors ${
              hasNextPage
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                : "bg-gray-300 dark:bg-zinc-800 text-gray-500 cursor-not-allowed"
            }`}
            aria-disabled={!hasNextPage}>
            Next
          </Link>
        </div>
      </main>
    </div>
  );
}
