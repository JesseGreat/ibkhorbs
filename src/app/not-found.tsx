import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <p className="marker mb-6">404</p>
      <h1 className="display d1 max-w-[14ch]">
        That frame
        <br />
        <span className="text-ember">didn&apos;t make</span>
        <br />
        the cut.
      </h1>
      <p className="lede mt-8">The page you were after has moved or never existed.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="bg-bone px-7 py-4 text-[0.95rem] text-ink transition-colors hover:bg-ember hover:text-bone"
        >
          Back to the start
        </Link>
        <Link
          href="/work"
          className="border border-bone/25 px-7 py-4 text-[0.95rem] transition-colors hover:border-bone"
        >
          See the work
        </Link>
      </div>
    </section>
  );
}
