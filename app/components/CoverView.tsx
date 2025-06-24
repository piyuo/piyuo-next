import Image from 'next/image';

interface CoverViewProps {
  appDesc: string;
}

export function CoverView({ appDesc }: CoverViewProps) {
  const appName = 'Piyuo Counter';

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
      {/* Content Column */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
        {/* Icon */}
        <div className="w-32 md:w-40 mb-6">
          <Image
            src="/images/icon.webp"
            alt="Piyuo Counter Icon"
            width={160}
            height={160}
            className="w-full h-auto"
          />
        </div>

        {/* App Name */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {appName}
        </h1>

        {/* Description - Hidden on mobile when we have side-by-side layout */}
        <div className="lg:hidden mb-6">
          <Image
            src="/images/app.webp"
            alt="App Screenshot"
            width={400}
            height={600}
            className="w-full max-w-md mx-auto rounded-lg"
          />
        </div>

        {/* App Description */}
        <p className="text-sm md:text-base text-white/90 max-w-md leading-relaxed">
          {appDesc}
        </p>
      </div>

      {/* Image Column - Desktop only */}
      <div className="hidden lg:block lg:w-80 xl:w-96">
        <Image
          src="/images/app.webp"
          alt="App Screenshot"
          width={400}
          height={600}
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}
