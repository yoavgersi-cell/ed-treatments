import type { Metadata } from "next";
import Link from "next/link";
import { STATES } from "@/lib/states";

export const revalidate = 60;

const SITE_URL = "https://www.edtreatmenthub.com";

export const metadata: Metadata = {
  title: { absolute: "Online ED Treatment by State (2026) | ED Treatment" },
  description:
    "Get ED treatment online in your state. Compare licensed telehealth providers with discreet, statewide delivery - pick your state to see options that ship to you.",
  alternates: { canonical: `${SITE_URL}/online-ed-treatment` },
  openGraph: {
    title: "Online ED Treatment by State (2026)",
    description: "Compare licensed online ED treatment providers that ship to your state.",
    url: `${SITE_URL}/online-ed-treatment`,
    type: "website",
  },
};

export default function OnlineEdTreatmentIndex() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-[#191919]">Online ED Treatment by State</h1>
      <p className="mb-4 max-w-2xl text-[16px] leading-[1.7] text-gray-700">
        Erectile-dysfunction treatment is available online in all 50 states through licensed telehealth
        providers - with a confidential intake, a licensed clinician&apos;s review, and discreet delivery to
        your door. Because telehealth is licensed state by state, choose your state below to see the providers
        that serve your area and ship to every ZIP code in it.
      </p>
      <p className="mb-8 max-w-2xl text-[15px] leading-[1.7] text-gray-600">
        Prefer to jump straight in? See our{" "}
        <Link href="/" className="font-semibold text-[#111111] hover:underline">full provider comparison</Link>{" "}
        or read the{" "}
        <Link href="/articles/ed-treatment-near-me" className="font-semibold text-[#111111] hover:underline">
          near-me vs online guide
        </Link>.
      </p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
        {STATES.map((s) => (
          <Link
            key={s.slug}
            href={`/online-ed-treatment/${s.slug}`}
            className="block rounded-md px-3 py-2 text-[15px] text-gray-700 hover:bg-gray-50 hover:text-[#111111]"
          >
            {s.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
