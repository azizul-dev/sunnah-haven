type ArchFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ArchFrame({ children, className = "" }: ArchFrameProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-t-full border border-gold/60 bg-gradient-to-b from-emerald-deep to-emerald-night text-gold ${className}`}
    >
      {children}
    </div>
  );
}
