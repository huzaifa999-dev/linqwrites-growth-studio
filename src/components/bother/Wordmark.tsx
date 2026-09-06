interface WordmarkProps {
  /** pixel height of the wordmark cap */
  size?: number;
  className?: string;
}

/**
 * BOTHER wordmark, drawn in code.
 * The "O" is an arc with one controlled gap: the interruption.
 */
export function Wordmark({ size = 24, className = "" }: WordmarkProps) {
  const gap = Math.max(2, size * 0.1);
  return (
    <span
      className={`inline-flex items-baseline font-display font-bold leading-none tracking-[0.06em] ${className}`}
      style={{ fontSize: size, color: "currentColor" }}
      aria-label="BOTHER"
    >
      <span aria-hidden>B</span>
      <span
        aria-hidden
        className="relative inline-block"
        style={{ width: size * 0.72, height: size * 0.72, marginInline: size * 0.06 }}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            border: `${Math.max(2, size * 0.13)}px solid currentColor`,
            clipPath: `polygon(0 0, 100% 0, 100% 38%, 62% 38%, 62% 62%, 100% 62%, 100% 100%, 0 100%)`,
          }}
        />
        <span
          className="absolute rounded-full"
          style={{
            width: gap,
            height: gap,
            background: "var(--ochre-ink)",
            right: -gap * 0.2,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </span>
      <span aria-hidden>THER</span>
    </span>
  );
}
