export function SectionHeading({
  title,
  intro,
  id,
  as: Tag = "h2",
  tone = "dark",
  align = "left",
  className = "",
  children,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
  tone?: "dark" | "light";
  align?: "left" | "split";
  className?: string;
  children?: React.ReactNode;
}) {
  const introColor = tone === "light" ? "text-bone/75" : "text-muted";
  return (
    <div
      className={`${align === "split" ? "grid gap-6 md:grid-cols-12 md:items-end" : "max-w-3xl"} ${className}`}
      data-reveal
    >
      <div className={align === "split" ? "md:col-span-7" : ""}>
        <Tag id={id} className="text-[2.15rem] leading-[1.05] font-normal sm:text-5xl lg:text-[3.6rem]">
          {title}
        </Tag>
      </div>
      {(intro || children) && (
        <div className={align === "split" ? "md:col-span-5 md:pb-2" : "mt-5"}>
          {intro && <p className={`max-w-xl text-base leading-relaxed sm:text-lg ${introColor}`}>{intro}</p>}
          {children}
        </div>
      )}
    </div>
  );
}
