import Image from 'next/image';
import { GlassContainer } from './GlassContainer';

interface FeatureViewProps {
  translations: {
    index_1: string;
    index_1_desc: string;
    index_2: string;
    index_2_desc: string;
    index_3: string;
    index_3_desc: string;
    index_4: string;
    index_4_desc: string;
  };
}

interface FeatureItemProps {
  title: string;
  description: string;
  imagePath: string;
}

function FeatureItem({ title, description, imagePath }: FeatureItemProps) {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
        {title}
      </h3>
      <p className="text-sm md:text-base text-white/90 mb-6 flex-grow text-center leading-relaxed">
        {description}
      </p>
      <div className="mt-auto">
        <Image
          src={`/images/${imagePath}`}
          alt={title}
          width={400}
          height={300}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export function FeatureView({ translations }: FeatureViewProps) {
  const features = [
    {
      title: translations.index_1,
      description: translations.index_1_desc,
      imagePath: 'highlight-1.webp'
    },
    {
      title: translations.index_2,
      description: translations.index_2_desc,
      imagePath: 'highlight-2.webp'
    },
    {
      title: translations.index_3,
      description: translations.index_3_desc,
      imagePath: 'highlight-3.webp'
    },
    {
      title: translations.index_4,
      description: translations.index_4_desc,
      imagePath: 'highlight-4.webp'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Mobile: Stack vertically */}
      <div className="block md:hidden space-y-8">
        {features.map((feature, index) => (
          <GlassContainer key={index} padding="p-6 pb-0">
            <FeatureItem {...feature} />
          </GlassContainer>
        ))}
      </div>

      {/* Desktop: 2x2 Grid */}
      <div className="hidden md:block space-y-8">
        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassContainer padding="p-6 pb-0">
            <FeatureItem {...features[0]} />
          </GlassContainer>
          <GlassContainer padding="p-6 pb-0">
            <FeatureItem {...features[1]} />
          </GlassContainer>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassContainer padding="p-6 pb-0">
            <FeatureItem {...features[2]} />
          </GlassContainer>
          <GlassContainer padding="p-6 pb-0">
            <FeatureItem {...features[3]} />
          </GlassContainer>
        </div>
      </div>
    </div>
  );
}
