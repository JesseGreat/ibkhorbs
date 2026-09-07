import type { ReactNode } from "react";

export function PageHeader({
  marker,
  title,
  lede,
  aside,
}: {
  marker: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="shell pt-20 pb-12 md:pt-28 md:pb-16">
      <p className="marker mb-6">{marker}</p>
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <h1 className="display d1 max-w-[12ch] text-[clamp(2.75rem,9vw,7rem)]">{title}</h1>
        {lede ? <p className="lede lg:pb-3">{lede}</p> : null}
      </div>
      {aside ? <div className="mt-10">{aside}</div> : null}
    </header>
  );
}
