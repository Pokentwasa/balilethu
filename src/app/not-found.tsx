import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-28 pb-20">
      <p className="eyebrow text-clay">404</p>
      <h1 className="mt-4 text-5xl sm:text-7xl">This page has wandered off.</h1>
      <p className="mt-5 max-w-lg text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved. Current stock is a click away.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/livestock" className="btn btn-primary">View Livestock</Link>
        <Link href="/" className="btn btn-outline text-forest">Home</Link>
      </div>
    </section>
  );
}
