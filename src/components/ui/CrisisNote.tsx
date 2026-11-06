import { crisis } from "../../site";

/* Booking runs on WhatsApp, which isn't monitored around the clock, so every
   clinical page says where to go when someone can't wait. */
export default function CrisisNote({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-label="If you need help now"
      className={`rounded-[20px] border border-forest/10 bg-tint-parents p-5 text-[0.95rem] text-ink ${className}`}
    >
      <b className="font-bold text-forest">If you need help now:</b> WhatsApp booking isn't an emergency service. If you
      or someone else is in immediate danger in Lebanon, call {crisis.emergencyNumbers}. For confidential emotional
      support, call{" "}
      <a
        href={crisis.lifelineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-forest underline underline-offset-2"
      >
        {crisis.lifeline}
      </a>
      , Lebanon's national lifeline, available 24/7.
    </aside>
  );
}
