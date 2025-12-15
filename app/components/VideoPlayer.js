'use client';

import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';

export default function VideoPlayer({ url, isEmbed = false }) {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  if (!hasWindow) return null;

  if (isEmbed) {
      return (
        <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
            <iframe 
                src={url}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
        </div>
      );
  }

  return (
    <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        url={url}
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        controls={true}
        playing={false}
        config={{
            file: {
                forceHLS: true,
            }
        }}
      />
    </div>
  );
}
