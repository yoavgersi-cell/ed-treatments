import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { ComparisonCard } from "@/components/comparison-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { ExpertByline } from "@/components/expert-byline";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED } from "@/lib/config";
import { STATES, STATE_BY_SLUG, type StateInfo } from "@/lib/states";

export const revalidate = 60;

const SITE_URL = "https://www.edtreatmenthub.com";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = STATE_BY_SLUG.get(state);
  if (!s) return {};
  const url = `${SITE_URL}/online-ed-treatment/${s.slug}`;
  const title = `Online ED Treatment in ${s.name} (2026)`;
  const description =
    `Compare licensed online ED treatment providers serving ${s.name}. Discreet delivery to every ${s.abbr} ZIP code - from generic sildenafil & tadalafil to compounded options like Quad by MEDVi.`;
  return {
    title: { absolute: `${title} | ED Treatment` },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = STATE_BY_SLUG.get(state);
  if (!s) return notFound();

  const config = await getConfig();
  const { positions } = config.ranking;

  // Providers available in this state = ranking order, minus any that exclude it.
  const availableIds = config.ranking.providerOrder.filter((id) => {
    const p = config.providers.find((pr) => pr.id === id);
    return p && !(p.excludedStates ?? []).includes(s.abbr);
  });

  const displayList = availableIds
    .map((id, index) => {
      const provider = config.providers.find((p) => p.id === id)!;
      const position = positions[index] || positions[positions.length - 1];
      return {
        id: provider.id,
        name: provider.name,
        tagline: provider.tagline,
        logo: provider.logo,
        highlights: provider.highlights,
        affiliateUrl: provider.affiliateUrl,
        ctaText: provider.ctaText,
        rank: index + 1,
        rating: position.score,
        ratingLabel: position.label,
        starRating: position.starRating,
        badge: position.badge,
      };
    });

  const topName = displayList[0]?.name ?? "our top-rated provider";
  const [c0, c1, c2] = s.cities;
  const citiesPhrase = s.cities.length >= 3 ? `${c0}, ${c1}, and ${c2}` : s.cities.join(" and ");

  const faqs = [
    {
      question: `Is online ED treatment available in ${s.name}?`,
      answer: `Yes. Licensed telehealth providers can evaluate and, when appropriate, prescribe ED medication for residents across ${s.name} - from ${citiesPhrase} to smaller towns and rural ZIP codes. A licensed clinician reviews your intake before anything is prescribed.`,
    },
    {
      question: `Do I need to visit a clinic in ${s.name} in person?`,
      answer: `Usually not. Most men in ${s.name} can complete the entire process online - a confidential health questionnaire, a licensed clinician's review, and discreet home delivery - without an in-person visit. Some complex cases may still be referred for in-person care.`,
    },
    {
      question: `How discreet is delivery in ${s.name}?`,
      answer: `Treatments ship in plain, unbranded packaging to any address in ${s.name}. You enter your ZIP code at checkout to confirm delivery, which is available statewide.`,
    },
    {
      question: `How much does online ED treatment cost in ${s.name}?`,
      answer: `Pricing depends on the provider, the medication (generic, brand, or compounded), and whether it's a subscription or per-dose plan - not on where you live in ${s.name}. Compare current pricing on each provider's own site before you decide.`,
    },
  ];

  const author = config.experts?.[0];
  const reviewer = config.experts?.[1];
  const url = `${SITE_URL}/online-ed-treatment/${s.slug}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Online ED Treatment in ${s.name} (2026)`,
    description: `Compare licensed online ED treatment providers serving ${s.name}, with discreet statewide delivery.`,
    url,
    inLanguage: "en-US",
    dateModified: CONTENT_LAST_UPDATED,
    isPartOf: { "@type": "WebSite", name: "ED Treatment", url: SITE_URL },
    about: { "@type": "Thing", name: `Erectile dysfunction treatment in ${s.name}` },
    ...(author && { author: { "@type": "Organization", name: author.name, url: `${SITE_URL}/about` } }),
    ...(reviewer && { reviewedBy: { "@type": "Organization", name: reviewer.name } }),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Online ED Treatment by State", item: `${SITE_URL}/online-ed-treatment` },
      { "@type": "ListItem", position: 3, name: s.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <HeroSection
        backgroundImageUrl=""
        imageAlt=""
        updatedLabel="Last Updated: September 2026"
        h1={`Online ED Treatment in ${s.name}`}
        h2={`Compare licensed telehealth ED providers serving ${s.name}`}
        description={`Discreet, doctor-reviewed ED treatment delivered to any ZIP code in ${s.name} - from generic pills to compounded options. Compare your options below.`}
      />

      {(author || reviewer) && (
        <section className="mx-auto max-w-[1200px] px-4 pt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {author && <ExpertByline expert={author} label="Written by" />}
            {reviewer && <ExpertByline expert={reviewer} label="Reviewed by" />}
          </div>
        </section>
      )}

      {/* Breadcrumb */}
      <section className="mx-auto max-w-[1200px] px-4 pt-4">
        <nav className="text-[13px] text-gray-500">
          <Link href="/" className="hover:text-[#111111] hover:underline">Home</Link>
          <span className="px-1.5">/</span>
          <Link href="/online-ed-treatment" className="hover:text-[#111111] hover:underline">By State</Link>
          <span className="px-1.5">/</span>
          <span className="text-[#191919]">{s.name}</span>
        </nav>
      </section>

      {/* Provider comparison */}
      <section className="mx-auto max-w-[900px] px-4 pt-6 pb-6">
        <div className="space-y-4">
          {displayList.map((product) => (
            <ComparisonCard key={product.id} product={product} socialProof={config.cardSocialProof} />
          ))}
        </div>
      </section>

      {/* Valuable, state-specific editorial */}
      <div className="mx-auto max-w-[1200px] px-4 pb-12 text-[16px] leading-[1.7] text-gray-800">
        <hr className="mb-8 border-gray-200" />

        <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
          Getting ED Treatment in {s.name}
        </h2>
        <p className="mb-4">
          If you live in {s.name} - whether in {citiesPhrase}, or a smaller community across {s.region} -
          you no longer have to book an in-person appointment to get help with erectile dysfunction. Licensed
          online providers can evaluate you, and where appropriate prescribe treatment, entirely online, then
          ship it discreetly to your door. Below is how it works, what ships to {s.name}, and how to choose.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          How Online ED Treatment Works in {s.name}
        </h2>
        <ol className="mb-4 ml-5 list-decimal space-y-2">
          <li><strong>Complete a confidential intake.</strong> You answer a private health questionnaire online - no waiting room.</li>
          <li><strong>A licensed clinician reviews it.</strong> Providers work with clinicians licensed to treat patients in {s.name}; they decide whether treatment is safe and appropriate for you.</li>
          <li><strong>Your treatment ships to you.</strong> If prescribed, your medication is delivered in discreet, unbranded packaging to your {s.name} address.</li>
        </ol>
        <p className="mb-4">
          Not sure where to start? {topName} is our current top pick - see the full{" "}
          <Link href="/" className="font-semibold text-[#111111] hover:underline">comparison</Link>{" "}
          and our{" "}
          <Link href="/reviews" className="font-semibold text-[#111111] hover:underline">in-depth reviews</Link>.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Shipping &amp; Delivery Across {s.name}
        </h2>
        <p className="mb-4">
          The providers we compare ship to <strong>every ZIP code in {s.name}</strong> - from busy metros like{" "}
          {c0} to rural addresses far from the nearest pharmacy. You simply enter your {s.abbr} ZIP code at
          checkout to confirm delivery. Orders arrive in plain, unmarked packaging for privacy, and most
          providers offer free, discreet shipping and easy refills so you never run out. For many men in{" "}
          {s.name}, having treatment delivered is the single biggest advantage over a local clinic: no
          pharmacy counter, no awkward pickup, no time off work.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Is Online ED Treatment Legal in {s.name}?
        </h2>
        <p className="mb-4">
          Yes. Telehealth is an established, legal way to receive care in {s.name} when a licensed clinician is
          involved. ED medications are prescription-only, so a clinician licensed for {s.name} must review your
          information before anything can be prescribed - that safeguard is a feature, not a hurdle. Availability
          of a specific provider can vary by state, so the comparison above reflects options that serve {s.name}.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          {s.name} vs. Visiting a Clinic Near You
        </h2>
        <p className="mb-4">
          Searching &quot;ED treatment near me&quot; in {s.name} will surface local urologists and men&apos;s-health
          clinics, and those are a good fit for complex cases or if you prefer to be seen in person. But for most
          men, online treatment is faster, more private, and often less expensive - you skip the wait for an
          appointment and the trip across town. We break the trade-offs down in our guide to{" "}
          <Link href="/articles/ed-treatment-near-me" className="font-semibold text-[#111111] hover:underline">
            ED treatment near you vs online
          </Link>.
        </p>

        <p className="mt-8 text-[13.5px] text-gray-500">
          This page is general information, not medical advice. Erectile-dysfunction treatments are prescription
          medications; whether one is right for you is a decision for you and a licensed clinician. Always confirm
          current pricing, availability, and terms directly with the provider.
        </p>
      </div>

      <FaqAccordion items={faqs} />
    </>
  );
}
