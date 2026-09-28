/**
 * Shown where no photograph exists yet: a plain catalogue plate with the
 * name set in type, rather than decorative artwork or a repeated photo.
 */
export function Plate({ text, className = "" }: { text?: string; className?: string }) {
  return (
    <div className={`absolute inset-0 flex flex-col justify-between bg-sand p-5 text-ink/80 sm:p-6 ${className}`} aria-hidden="true">
      <span className="label-sm text-muted">Photo to follow</span>
      {text && <span className="font-serif text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.02]">{text}</span>}
    </div>
  );
}
