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
    <header className="pt-28 pb-12 md:pt-36 md:pb-16">
      <div className="container-x">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h1 className="text-[2.75rem] leading-[0.98] font-light sm:text-6xl lg:text-[5.5rem]">{title}</h1>
          </div>
          {intro && <div className="text-lg leading-relaxed text-muted md:col-span-4 md:pb-2">{intro}</div>}
        </div>
        {children}
      </div>
    </header>
  );
}
