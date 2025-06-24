import Image from 'next/image';

interface DesktopViewProps {
  title: string;
  description: string;
  imagePath: string;
}

export function DesktopView({ title, description, imagePath }: DesktopViewProps) {
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

      {/* Image Column */}
      <div className="flex-1 max-w-md lg:max-w-none">
        <Image
          src={`/images/${imagePath}`}
          alt={title}
          width={600}
          height={400}
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}
