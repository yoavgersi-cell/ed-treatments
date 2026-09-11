import Link from "next/link";

const treatmentRows: [string, string, string][] = [
  ["Oral PDE5 inhibitors", "Sildenafil (generic Viagra), tadalafil (generic Cialis), vardenafil", "The first-line, most-prescribed ED treatment - taken as needed or, for tadalafil, daily"],
  ["Compounded / combination", "Multi-ingredient blends such as Quad by MEDVi (dissolvable troches/tablets)", "Combine more than one active in a single dose - an option some men try when a single generic underperforms"],
  ["Lifestyle & underlying causes", "Exercise, sleep, cardiovascular and hormone health", "ED is often a symptom of another issue; addressing the root cause can improve results"],
];

function TreatmentTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[600px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">Approach</th>
            <th className="px-4 py-3 font-bold text-[#191919]">Examples</th>
            <th className="px-4 py-3 font-bold text-[#191919]">What to know</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map(([k, a, b], i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
              <td className="px-4 py-3 align-top font-medium text-[#191919]">{k}</td>
              <td className="px-4 py-3 align-top text-gray-600">{a}</td>
              <td className="px-4 py-3 align-top text-gray-600">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EditorialContent({ midSlot }: { midSlot?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-800">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        The Best ED Treatments, Compared
      </h2>
      <p className="mb-4">
        To find the best erectile-dysfunction treatment, we compare leading online providers on the
        factors that actually matter. Choosing the right option involves more than picking a pill -
        treatment choice, pricing, clinical support, discretion and long-term value can vary a lot
        between providers. Not sure where to start? Read our{" "}
        <Link href="/articles/best-ed-treatments-compared" className="font-semibold text-[#111111] hover:underline">
          guide to the best ED treatments
        </Link>{" "}
        for the full breakdown.
      </p>
      <p className="mb-8">
        Our goal is to help you identify the provider that best fits your needs, budget and treatment
        preferences - with honest, independent comparisons. Read our{" "}
        <Link href="/reviews" className="font-semibold text-[#111111] hover:underline">
          in-depth provider reviews
        </Link>{" "}
        or jump to a head-to-head like{" "}
        <Link href="/quad-vs-hims" className="font-semibold text-[#111111] hover:underline">
          Quad by MEDVi vs Hims
        </Link>.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        ED Treatment Options in 2026
      </h2>
      <p className="mb-4">
        Most erectile dysfunction is treated with oral medications, with a few other routes depending
        on the cause. Here is how the main options compare - always confirm what is appropriate for you
        with a licensed clinician.
      </p>
      <TreatmentTable rows={treatmentRows} />
      <p className="mb-8 text-[13.5px] text-gray-500">
        This table is general information, not medical advice. What&apos;s right for you depends on your
        health history and a clinician&apos;s judgment. Learn more in{" "}
        <Link href="/articles/latest-ed-treatments" className="font-semibold text-[#111111] hover:underline">
          the latest ED treatments
        </Link>.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How to Choose an Online ED Provider
      </h2>
      <p className="mb-3">
        Every legitimate online ED clinic shares the same backbone - a licensed clinician reviews your
        health intake before anything is prescribed. Beyond that, five checks separate the best
        providers from the rest:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li><strong>Real clinical review</strong> - a licensed prescriber, not an instant &quot;guaranteed&quot; script off a form</li>
        <li><strong>Clear, upfront pricing</strong> - what you actually pay per dose or per month, before checkout</li>
        <li><strong>Treatment choice</strong> - generic pills, daily options, and compounded formulas where appropriate</li>
        <li><strong>Support you&apos;ll actually use</strong> - dosing help, side-effect guidance, a human to reach</li>
        <li><strong>Discreet, reliable delivery</strong> - private packaging and dependable refills</li>
      </ul>
      <p className="mb-8">
        Our{" "}
        <Link href="/how-we-rank" className="font-semibold text-[#111111] hover:underline">
          full ranking methodology
        </Link>{" "}
        explains how we score each of these.
      </p>

      {/* Mid-content slot */}
      {midSlot && <div className="mb-8">{midSlot}</div>}

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Is There a Permanent Cure for ED?
      </h2>
      <p className="mb-8">
        It&apos;s the most-searched ED question - and the honest answer matters. ED is usually
        <strong> managed and treated</strong> rather than permanently &quot;cured&quot; by a pill. When ED has a
        reversible cause - such as certain lifestyle factors, low testosterone, or a medication side
        effect - treating that cause can meaningfully improve or resolve symptoms. For most men,
        effective on-demand or daily treatment restores function reliably. We break this down in{" "}
        <Link href="/articles/best-ed-medicine" className="font-semibold text-[#111111] hover:underline">
          best ED medicine: what actually works
        </Link>{" "}
        and{" "}
        <Link href="/articles/what-causes-erectile-dysfunction" className="font-semibold text-[#111111] hover:underline">
          what causes ED
        </Link>.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How We Evaluated Providers
      </h2>
      <p className="mb-3">Our rankings are based on a combination of factors including:</p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>Treatment options and flexibility</li>
        <li>Pricing transparency</li>
        <li>Clinical oversight</li>
        <li>Customer experience and discretion</li>
        <li>Overall value</li>
      </ul>
      <p>
        We continuously review and update our recommendations to help you{" "}
        <Link href="/reviews" className="font-semibold text-[#111111] hover:underline">
          compare leading ED treatments
        </Link>{" "}
        with confidence. Browse all{" "}
        <Link href="/articles" className="font-semibold text-[#111111] hover:underline">
          ED guides
        </Link>{" "}
        for more research.
      </p>
    </div>
  );
}
