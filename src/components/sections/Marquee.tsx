/* A quiet ticker of the things therapy makes room for. Pauses on hover. */
const WORDS = [
  "Anxiety",
  "Self-esteem",
  "ADHD",
  "Emotional regulation",
  "Trauma",
  "Parenting",
  "Self-confidence",
  "Mood",
  "Stress management",
];

export default function Marquee() {
  const loop = [...WORDS, ...WORDS];
  return (
    <div className="group overflow-hidden border-y border-white/10 bg-forest py-[18px]">
      <div className="flex w-max gap-10 animate-scroll-x group-hover:[animation-play-state:paused]">
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-[1.15rem] text-on-dark">
            {w}
            <span className="text-[0.9rem] text-mint" aria-hidden="true">
              ✿
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
