export default function GeometricDivider() {
  return (
    <div className="mx-auto flex max-w-xs items-center gap-3 py-10" aria-hidden="true">
      <span className="h-px flex-1 bg-gold/50" />
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path
          d="M12 1l2.6 6.4L21 4.8l-2.6 6.6L23 13l-6.6 1.6L19 21l-6.4-2.6L11 23l-1.6-4.6L3 21l2.6-6.4L1 13l6.4-1.6L5 4.8l6.4 2.6z"
          fill="none"
          stroke="#c9a24b"
          strokeWidth="1.2"
        />
      </svg>
      <span className="h-px flex-1 bg-gold/50" />
    </div>
  );
}
