import Link from "next/link";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";

const points = [
  "Copied from KV Web Starter into an independent public repo.",
  "Built with staged branches so recruiters can follow the implementation path.",
  "Focused on booking and availability to show a different product category.",
  "Designed with a lighter scheduling identity instead of reusing the darker portfolio styles.",
];

export default function CaseStudyPage() {
  return (
    <MarketingPageShell>
      <main className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Case study
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
            ReserveFlow proves the boilerplate can become a booking product.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            This project uses the same foundation as the other portfolio builds, then
            specializes it around appointment requests, service operations, and admin
            workflow. The goal is to make the progression readable in GitHub.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point} className="border bg-card p-5 text-sm leading-6 text-muted-foreground">
              {point}
            </div>
          ))}
        </div>
        <div>
          <Button asChild>
            <Link href="/booking">Explore booking flow</Link>
          </Button>
        </div>
      </main>
    </MarketingPageShell>
  );
}
