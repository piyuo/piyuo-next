"use client";

import Image from 'next/image';

interface DesktopViewProps {
  title: string;
  description: string;
  videoPath?: string;
  imagePath?: string;
}

export function DesktopView({ title, description, videoPath, imagePath }: DesktopViewProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Content Column */}
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-sm md:text-base text-white/90 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Media Column */}
      <div className="flex-1 max-w-md lg:max-w-none">
        {videoPath ? (
          <video
            className="w-full h-auto rounded-lg shadow-2xl"
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
          >
            <source src={`/videos/${videoPath}.webm`} type="video/webm" />
            <source src={`/videos/${videoPath}.mp4`} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={`/images/${imagePath}`}
            alt={title}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        )}
      </div>
    </div>
  );
}
