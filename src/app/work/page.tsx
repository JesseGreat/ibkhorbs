import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { WorkGrid } from "@/components/work-grid";
import { work } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Wedding films, brand commercials and travel content by IBK Horbs. Filter the portfolio by category and watch the full films.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        marker={`Portfolio · ${String(work.length).padStart(2, "0")} pieces`}
        title={
          <>
            The
            <br />
            work.
          </>
        }
        lede="Weddings, commercials and travel. Filter it down, or scroll the lot. Every piece opens full-size, and the films play in place."
      />
      <div className="shell pb-10">
        <WorkGrid />
      </div>
    </>
  );
}
