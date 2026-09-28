import { Breadcrumbs } from "./Breadcrumbs";

export function PageHeader({
  title,
  intro,
  crumbs,
  children,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container-x">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="text-[3rem] leading-[0.94] sm:text-7xl lg:col-span-8 lg:text-[6rem]" data-reveal>
            {title}
          </h1>
          {intro && <div className="text-lg text-ink-soft lg:col-span-4 lg:col-start-9 lg:pb-2">{intro}</div>}
        </div>
        {children}
      </div>
    </header>
  );
}
