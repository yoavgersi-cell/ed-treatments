import Link from "next/link";
import type { Expert } from "@/lib/config";

function initials(name: string) {
  const words = name.replace(/^The\s+/i, "").split(/\s+/).filter(Boolean);
  const letters = words.length >= 2 ? words[0][0] + words[words.length - 1][0] : (words[0]?.slice(0, 2) ?? "");
  return letters.toUpperCase();
}

// Inline credibility byline: [avatar] Written by <Name>.
// `label` sets the framing ("Written by", "Reviewed by"). Role suffix is off by
// default (set showRole to re-enable the trailing "· <role>").
export function ExpertByline({
  expert,
  label = "Written by",
  href = "/about",
  showRole = false,
}: {
  expert: Expert;
  label?: string;
  href?: string;
  showRole?: boolean;
}) {
  const credit = expert.credentials ? `${expert.name}, ${expert.credentials}` : expert.name;

  return (
    <Link href={href} className="group inline-flex items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#111111]/10 text-[12px] font-bold text-[#111111]">
        {expert.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={expert.avatar} alt={expert.name} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        ) : (
          initials(expert.name)
        )}
      </span>
      <span className="text-[14px] leading-tight text-gray-400">
        {label}{" "}
        <span className="font-bold text-[#191919] group-hover:text-[#111111]">{credit}</span>
        {showRole && <span className="ml-1 font-medium text-gray-400">· {expert.role}</span>}
      </span>
    </Link>
  );
}
