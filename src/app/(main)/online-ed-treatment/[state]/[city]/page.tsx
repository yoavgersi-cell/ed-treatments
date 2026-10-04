import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { ComparisonCard } from "@/components/comparison-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { ExpertByline } from "@/components/expert-byline";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED } from "@/lib/config";
import { CITIES, CITY_BY_PATH } from "@/lib/cities";

export const revalidate = 60;

const SITE_URL = "https://www.edtreatmenthub.com";

export function generateStaticParams() {
  return CITIES.map((c) => ({ state: c.stateSlug, city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const c = CITY_BY_PATH.get(`${state}/${city}`);
  if (!c) return {};
  const url = `${SITE_URL}/online-ed-treatment/${c.stateSlug}/${c.slug}`;
  const title = `Online ED Treatment in ${c.name}, ${c.stateAbbr} (2026)`;
  const description =
    `Compare licensed online ED treatment providers serving ${c.name}, ${c.stateAbbr}. Discreet delivery to every ${c.name} ZIP code - from ${c.neighborhoods[0]} to ${c.neighborhoods[2]} - including generic sildenafil, tadalafil and compounded options like Quad by MEDVi.`;
  return {
    title: { absolute: `${title} | ED Treatment Hub` },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const c = CITY_BY_PATH.get(`${state}/${city}`);
  if (!c) return notFound();

  const config = await getConfig();
  const { positions } = config.ranking;

  // Providers available here = ranking order, minus any that exclude this state.
  const availableIds = config.ranking.providerOrder.filter((id) => {
    const p = config.providers.find((pr) => pr.id === id);
    return p && !(p.excludedStates ?? []).includes(c.stateAbbr);
  });

  const displayList = availableIds.map((id, index) => {
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
  const topSlug = displayList[0]?.id ?? "";
  const [n0, n1, n2] = c.neighborhoods;
  const neighborhoodsPhrase = `${n0}, ${n1}, and ${n2}`;
  const nearbyPhrase = c.nearby.length >= 3 ? `${c.nearby[0]}, ${c.nearby[1]} and ${c.nearby[2]}` : c.nearby.join(" and ");

  const faqs = [
    {
      question: `Is online ED treatment available in ${c.name}?`,
      answer: `Yes. Licensed telehealth providers can evaluate and, when appropriate, prescribe ED medication for men across ${c.name} and the surrounding ${c.stateName} metro - from ${neighborhoodsPhrase} to nearby ${nearbyPhrase}. A licensed clinician reviews your intake before anything is prescribed.`,
    },
    {
      question: `Do I need to visit a clinic in ${c.name} in person?`,
      answer: `Usually not. Most men in ${c.name} complete the entire process online - a confidential health questionnaire, a licensed clinician's review, and discreet home delivery - without stepping into a clinic. Some complex cases may still be referred for in-person care.`,
    },
    {
      question: `How fast is delivery to ${c.name}?`,
      answer: `After a clinician approves treatment, orders ship in plain, unbranded packaging to any ${c.name} ZIP code, typically within a few business days. Most providers offer free, discreet shipping and automatic refills so you never run out.`,
    },
    {
      question: `How much does online ED treatment cost in ${c.name}?`,
      answer: `Pricing depends on the provider, the medication (generic, brand, or compounded), and whether it's a subscription or per-dose plan - not on where you live in ${c.name}. Compare current pricing on each provider's own site before you decide.`,
    },
  ];

  const author = config.experts?.[0];
  const reviewer = config.experts?.[1];
  const url = `${SITE_URL}/online-ed-treatment/${c.stateSlug}/${c.slug}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Online ED Treatment in ${c.name}, ${c.stateAbbr} (2026)`,
    description: `Compare licensed online ED treatment providers serving ${c.name}, ${c.stateName}, with discreet local delivery.`,
    url,
    inLanguage: "en-US",
    dateModified: CONTENT_LAST_UPDATED,
    isPartOf: { "@type": "WebSite", name: "ED Treatment Hub", url: SITE_URL },
    about: { "@type": "Thing", name: `Erectile dysfunction treatment in ${c.name}, ${c.stateAbbr}` },
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
      { "@type": "ListItem", position: 3, name: c.stateName, item: `${SITE_URL}/online-ed-treatment/${c.stateSlug}` },
      { "@type": "ListItem", position: 4, name: c.name, item: url },
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
        updatedLabel="Last Updated: October 2026"
        h1={`Online ED Treatment in ${c.name}`}
        h2={`Compare licensed telehealth ED providers serving ${c.name}, ${c.stateAbbr}`}
        description={`Discreet, doctor-reviewed ED treatment delivered anywhere in ${c.name} - from ${n0} to ${n2} - from generic pills to compounded options. Compare your options below.`}
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
          <Link href={`/online-ed-treatment/${c.stateSlug}`} className="hover:text-[#111111] hover:underline">{c.stateName}</Link>
          <span className="px-1.5">/</span>
          <span className="text-[#191919]">{c.name}</span>
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

      {/* Valuable, city-specific editorial */}
      <div className="mx-auto max-w-[1200px] px-4 pb-12 text-[16px] leading-[1.7] text-gray-800">
        <hr className="mb-8 border-gray-200" />

        <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
          Getting ED Treatment in {c.name}
        </h2>
        <p className="mb-4">
          Whether you&apos;re in {neighborhoodsPhrase}, or anywhere across {c.blurb}, you no longer have to book an
          in-person appointment to get help with erectile dysfunction. Licensed online providers can evaluate you,
          and where appropriate prescribe treatment, entirely online - then ship it discreetly to your {c.name}{" "}
          address. Below is how it works, what ships to {c.name}, and how to choose.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          How Online ED Treatment Works in {c.name}
        </h2>
        <ol className="mb-4 ml-5 list-decimal space-y-2">
          <li><strong>Complete a confidential intake.</strong> You answer a private health questionnaire online - no waiting room, no clinic across town.</li>
          <li><strong>A licensed clinician reviews it.</strong> Providers work with clinicians licensed to treat patients in {c.stateName}; they decide whether treatment is safe and appropriate for you.</li>
          <li><strong>Your treatment ships to you.</strong> If prescribed, your medication is delivered in discreet, unbranded packaging anywhere in {c.name} - and to nearby {nearbyPhrase}.</li>
        </ol>
        <p className="mb-4">
          Not sure where to start? {topName} is our current top pick - read our{" "}
          {topSlug ? (
            <Link href={`/reviews/${topSlug}`} className="font-semibold text-[#111111] hover:underline">
              full {topName} review
            </Link>
          ) : (
            <Link href="/reviews" className="font-semibold text-[#111111] hover:underline">in-depth reviews</Link>
          )}
          , see the full{" "}
          <Link href="/" className="font-semibold text-[#111111] hover:underline">ED treatment comparison</Link>, or
          browse our{" "}
          <Link href="/articles/best-ed-treatments-compared" className="font-semibold text-[#111111] hover:underline">
            best ED treatments compared
          </Link>{" "}
          guide.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Shipping &amp; Delivery Across {c.name}
        </h2>
        <p className="mb-4">
          The providers we compare ship to <strong>every ZIP code in {c.name}</strong> - from {n0} and {n1} to the
          surrounding suburbs like {nearbyPhrase}. You simply enter your ZIP code at checkout to confirm delivery.
          Orders arrive in plain, unmarked packaging for privacy, and most providers offer free, discreet shipping
          and easy refills so you never run out. For many men in {c.name}, having treatment delivered is the single
          biggest advantage over a local clinic: no pharmacy counter, no traffic, no time off work.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Online vs. a Clinic Near You in {c.name}
        </h2>
        <p className="mb-4">
          Searching &quot;ED treatment near me&quot; in {c.name} will surface local urologists and men&apos;s-health
          clinics, and those are a good fit for complex cases or if you prefer to be seen in person. But for most
          men, online treatment is faster, more private, and often less expensive - you skip the wait for an
          appointment and the drive across {c.name}. We break the trade-offs down in our guide to{" "}
          <Link href="/articles/ed-treatment-near-me" className="font-semibold text-[#111111] hover:underline">
            ED treatment near you vs online
          </Link>, and you can also see every option statewide on our{" "}
          <Link href={`/online-ed-treatment/${c.stateSlug}`} className="font-semibold text-[#111111] hover:underline">
            {c.stateName} ED treatment
          </Link>{" "}
          page.
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
