type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8 text-center">
      <h2 className="font-heading text-2xl font-bold text-emerald-deep dark:text-gold sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-text-muted dark:text-cream/70">
          {subtitle}
        </p>
      )}
    </div>
  );
}
