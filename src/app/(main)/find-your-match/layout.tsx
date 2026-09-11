import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Best ED Treatment Provider Match - Free Quiz",
  description:
    "Answer a few quick questions and get a personalized ED treatment provider recommendation. Compare online providers based on your needs, budget, and location.",
  alternates: {
    canonical: "https://www.edtreatmenthub.com/find-your-match",
  },
  openGraph: {
    title: "Find Your Best ED Treatment Provider Match",
    description:
      "Take our free quiz and get matched with the best ED treatment provider for your needs and budget.",
    url: "https://www.edtreatmenthub.com/find-your-match",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="sr-only">Find Your Best ED Treatment Provider Match</h1>
      {children}
    </>
  );
}
