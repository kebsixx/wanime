import { getAnimeInfo, getEpisodeEmbedUrl } from "../../../lib/consumet";
import VideoPlayer from "../../components/VideoPlayer";
import Link from "next/link";

export default async function WatchPage({ params, searchParams }) {
  const { id } = await params;
  const { ep } = await searchParams;

  const info = await getAnimeInfo(id);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-black dark:text-white">
        <p>Anime not found.</p>
      </div>
    );
  }

  // Determine episode to play
  // If ep is provided, find it. If not, default to the LAST episode (most recent)
  let currentEpisode = null;
  if (ep) {
    currentEpisode = info.episodes.find((e) => e.id === ep);
  }

  if (!currentEpisode && info.episodes.length > 0) {
    // Default to the last episode if no specific episode selected
    currentEpisode = info.episodes[info.episodes.length - 1];
  }

  let embedUrl = null;
  if (currentEpisode) {
    embedUrl = await getEpisodeEmbedUrl(currentEpisode.id);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 font-sans text-black dark:text-white">
      <main className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-500 hover:underline mb-4 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-2xl font-bold">{info.title}</h1>
          {currentEpisode && (
            <p className="text-gray-600 dark:text-gray-400">
              Playing: Episode {currentEpisode.number}
            </p>
          )}
        </div>

        {/* Video Player Section */}
        <div className="mb-8">
          {embedUrl ? (
            <VideoPlayer url={embedUrl} isEmbed={true} />
          ) : (
            <div className="aspect-video bg-gray-200 dark:bg-zinc-800 flex items-center justify-center rounded-lg">
              <p>Video source not available or loading...</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {/* Anime Info */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
                <img
                  src={info.image}
                  alt={info.title}
                  className="w-full rounded-md object-cover shadow-sm"
                />
              </div>
              <div className="grow">
                <div className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm mb-4">
                  <p>
                    <span className="font-semibold">Type:</span> {info.type}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span> {info.status}
                  </p>
                  <p>
                    <span className="font-semibold">Episodes:</span>{" "}
                    {info.totalEpisodes || info.episodes.length}
                  </p>
                  <p>
                    <span className="font-semibold">Genres:</span>{" "}
                    {info.genres?.join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Description</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {info.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Episodes</h2>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md max-h-150 overflow-y-auto">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {info.episodes
                  ?.slice()
                  .reverse()
                  .map((episode) => (
                    <Link
                      key={episode.id}
                      href={`/watch/${id}?ep=${episode.id}`}
                      className={`p-2 text-center rounded-md text-sm transition-colors ${
                        currentEpisode?.id === episode.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
                      }`}>
                      Ep {episode.number}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
