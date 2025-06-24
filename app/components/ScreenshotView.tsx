interface ScreenshotViewProps {
  title: string;
  description: string;
}

export function ScreenshotView({ title, description }: ScreenshotViewProps) {
  return (
    <div className="text-center">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
        {title}
      </h2>
      <p className="text-sm md:text-base text-white/90 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
