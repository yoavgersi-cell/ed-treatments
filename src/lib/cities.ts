// City-level dataset powering /online-ed-treatment/[state]/[city] pages. These
// target high-intent local queries ("ed treatment in oklahoma city", "generic
// viagra illinois" etc.) that the state pages don't capture by name. Each entry
// carries real neighborhood and nearby-city detail so the page is genuinely
// specific to the metro, not a thin duplicate of its state page.

export interface CityInfo {
  name: string;
  slug: string;
  stateName: string;
  stateSlug: string;
  stateAbbr: string;
  region: string;
  /** 3 recognizable neighborhoods/districts, for content variation. */
  neighborhoods: string[];
  /** 3 nearby cities/suburbs in the same metro. */
  nearby: string[];
  /** One-line, metro-specific descriptor used in the intro. */
  blurb: string;
}

export const CITIES: CityInfo[] = [
  {
    name: "Oklahoma City",
    slug: "oklahoma-city",
    stateName: "Oklahoma",
    stateSlug: "oklahoma",
    stateAbbr: "OK",
    region: "the South",
    neighborhoods: ["Bricktown", "Midtown", "Nichols Hills"],
    nearby: ["Edmond", "Norman", "Moore"],
    blurb: "Oklahoma's capital and largest metro",
  },
  {
    name: "Houston",
    slug: "houston",
    stateName: "Texas",
    stateSlug: "texas",
    stateAbbr: "TX",
    region: "the South",
    neighborhoods: ["Downtown", "The Heights", "Montrose"],
    nearby: ["Sugar Land", "The Woodlands", "Katy"],
    blurb: "the largest city in Texas",
  },
  {
    name: "Dallas",
    slug: "dallas",
    stateName: "Texas",
    stateSlug: "texas",
    stateAbbr: "TX",
    region: "the South",
    neighborhoods: ["Uptown", "Deep Ellum", "Oak Lawn"],
    nearby: ["Fort Worth", "Plano", "Arlington"],
    blurb: "the heart of the Dallas-Fort Worth metroplex",
  },
  {
    name: "Chicago",
    slug: "chicago",
    stateName: "Illinois",
    stateSlug: "illinois",
    stateAbbr: "IL",
    region: "the Midwest",
    neighborhoods: ["the Loop", "Lincoln Park", "Wicker Park"],
    nearby: ["Naperville", "Aurora", "Evanston"],
    blurb: "the Midwest's largest city",
  },
  {
    name: "Los Angeles",
    slug: "los-angeles",
    stateName: "California",
    stateSlug: "california",
    stateAbbr: "CA",
    region: "the West Coast",
    neighborhoods: ["Downtown", "Hollywood", "Santa Monica"],
    nearby: ["Long Beach", "Glendale", "Pasadena"],
    blurb: "the largest city on the West Coast",
  },
  {
    name: "Miami",
    slug: "miami",
    stateName: "Florida",
    stateSlug: "florida",
    stateAbbr: "FL",
    region: "the Southeast",
    neighborhoods: ["Brickell", "Wynwood", "Coral Gables"],
    nearby: ["Hialeah", "Fort Lauderdale", "Miami Beach"],
    blurb: "South Florida's largest metro",
  },
];

// Keyed by "<stateSlug>/<citySlug>" so the nested route can look a city up and
// confirm it belongs to the state in the URL.
export const CITY_BY_PATH = new Map<string, CityInfo>(
  CITIES.map((c) => [`${c.stateSlug}/${c.slug}`, c])
);

export const citiesForState = (stateSlug: string): CityInfo[] =>
  CITIES.filter((c) => c.stateSlug === stateSlug);
