import { useEffect, useState } from "react";

export interface VideoFrameProps {
  src: string;
  poster: string;
  caption?: string;
  className?: string;
  ratio?: string;
}

/**
 * Treated footage frame. Raw stock is desaturated and washed with teal/ink so it
 * reads as BOTHER material rather than pasted-in office video.
 */
export function VideoFrame({ src, poster, caption, className = "", ratio = "4 / 3" }: VideoFrameProps) {
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setMotionOk(!mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  return (
    <figure className={className}>
      <div
        className="relative overflow-hidden border border-rule bg-[var(--paper-2)]"
        style={{ aspectRatio: ratio }}
      >
        {motionOk ? (
          /* Footage: Mixkit Free License (free for commercial use, no attribution required). */
          <video
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(0.85) contrast(1.05)" }}
          />
        ) : (
          <img
            src={poster}
            alt={caption ?? ""}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(0.85) contrast(1.05)" }}
          />
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--teal-deep)", mixBlendMode: "multiply", opacity: 0.35 }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(23,19,29,0.18) 0%, rgba(23,19,29,0) 45%, rgba(23,19,29,0.28) 100%)",
          }}
        />
      </div>
      {caption && <figcaption className="t-label mt-3 text-ink-soft">{caption}</figcaption>}
    </figure>
  );
}

export const HERO_CLIP =
  "https://assets.mixkit.co/active_storage/video_items/99890/1717186770/99890-video-720.mp4";
export const PROCESS_CLIP =
  "https://assets.mixkit.co/active_storage/video_items/99909/1717715134/99909-video-720.mp4";
