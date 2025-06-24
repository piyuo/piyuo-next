"use client";

import Image from 'next/image';

interface DownloadViewProps {
  downloadText: string;
}

interface DownloadButtonProps {
  imagePath: string;
  url?: string;
  qrCodePath?: string;
  description?: string;
  groupLink?: string;
  onTap?: () => void;
}

function DownloadButton({
  imagePath,
  url,
  qrCodePath,
  description,
  groupLink,
  onTap
}: DownloadButtonProps) {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    } else if (onTap) {
      onTap();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Main Platform Image */}
      <div
        className={`w-full max-w-xs cursor-pointer transition-transform hover:scale-105 ${url ? 'hover:opacity-90' : ''}`}
        onClick={handleClick}
      >
        <Image
          src={`/images/${imagePath}`}
          alt="Download Platform"
          width={300}
          height={100}
          className="w-full h-auto"
        />
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs md:text-sm text-white/90 text-center max-w-xs leading-relaxed">
          {description}
        </p>
      )}

      {/* QR Code */}
      {qrCodePath && (
        <div className="w-full max-w-xs">
          <Image
            src={`/images/${qrCodePath}`}
            alt="QR Code"
            width={300}
            height={300}
            className="w-full h-auto rounded-2xl"
          />
        </div>
      )}

      {/* Coming Soon Message */}
      {!url && !description && (
        <p className="text-xs md:text-sm text-white/70 text-center">
          Coming soon.
        </p>
      )}

      {/* Group Link */}
      {groupLink && (
        <a
          href={groupLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:text-blue-200 underline text-lg font-medium transition-colors"
        >
          {groupLink}
        </a>
      )}
    </div>
  );
}

export function DownloadView({ downloadText }: DownloadViewProps) {
  const androidTesterDesc = "Our Android app is currently in closed testing on the Google Play Store. If you're interested in early access, join our Google Group to participate and download the app";
  const androidGroup = "https://groups.google.com/g/piyuo-counter-beta-testers";

  return (
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
        {downloadText}
      </h2>

      {/* Mobile: Stack vertically */}
      <div className="block md:hidden space-y-8">
        <DownloadButton
          imagePath="apple.webp"
          qrCodePath="store-apple.svg"
          url="https://apps.apple.com/app/piyuo-counter/id6743642606"
        />

        <DownloadButton
          imagePath="google.webp"
          description={androidTesterDesc}
          groupLink={androidGroup}
        />

        <DownloadButton
          imagePath="windows.webp"
          qrCodePath="store-microsoft.svg"
          url="https://apps.microsoft.com/detail/9nz6vcxrjjzd"
        />
      </div>

      {/* Desktop: Side by side */}
      <div className="hidden md:grid md:grid-cols-3 gap-8 items-start">
        <DownloadButton
          imagePath="apple.webp"
          qrCodePath="store-apple.svg"
          url="https://apps.apple.com/app/piyuo-counter/id6743642606"
        />

        <DownloadButton
          imagePath="google.webp"
          description={androidTesterDesc}
          groupLink={androidGroup}
        />

        <DownloadButton
          imagePath="windows.webp"
          qrCodePath="store-microsoft.svg"
          url="https://apps.microsoft.com/detail/9nz6vcxrjjzd"
        />
      </div>
    </div>
  );
}
