import "server-only";

import { awards, type Award } from "@/data/awards";
import { journey, type JourneyEntry } from "@/data/experience";
import { internationalExperiences, type InternationalExperience } from "@/data/international";
import { getCopy, type Locale } from "@/data/locale";
import { isGitHubContentConfigured, readRepositoryFile } from "@/lib/github/content-client";
import { repositoryMediaUrl } from "@/lib/content/repository-media";

export type HomeContent = {
  hero: { identity: string; intro: string; supporting: string };
  about: { lead: string; paragraphs: string[] };
  currently: { items: string[] };
  story: { description: string; steps: [string, string, string][] };
  journey: JourneyEntry[];
  international: InternationalExperience[];
  awards: Award[];
  contact: { title: string; description: string };
  footer: { note: string };
};

export function defaultHomeContent(locale: Locale): HomeContent {
  const copy = getCopy(locale);
  return {
    hero: { identity: copy.hero.identity, intro: copy.hero.intro, supporting: copy.hero.supporting },
    about: { lead: copy.about.lead, paragraphs: [...copy.about.paragraphs] },
    currently: { items: [...copy.currently.items] },
    story: { description: copy.story.description, steps: copy.story.steps.map((step) => [...step] as [string, string, string]) },
    journey: structuredClone(journey),
    international: structuredClone(internationalExperiences),
    awards: structuredClone(awards),
    contact: { title: copy.contact.title, description: copy.contact.description },
    footer: { note: copy.footer.note },
  };
}

export async function getPublicHomeContent(locale: Locale): Promise<HomeContent> {
  const fallback = defaultHomeContent(locale);
  if (!isGitHubContentConfigured()) return fallback;
  try {
    const file = await readRepositoryFile(`content/site/home.${locale}.json`);
    const parsed = JSON.parse(file.content) as Partial<HomeContent>;
    const journeyItems = Array.isArray(parsed.journey)
      ? parsed.journey.map((entry) => ({
          ...entry,
          logos: entry.logos?.map((logo) => ({ ...logo, src: repositoryMediaUrl(logo.src) ?? logo.src })),
        }))
      : fallback.journey;
    const internationalItems = Array.isArray(parsed.international)
      ? parsed.international.map((entry) => ({ ...entry, image: repositoryMediaUrl(entry.image) ?? entry.image }))
      : fallback.international;

    return {
      ...fallback,
      ...parsed,
      hero: { ...fallback.hero, ...parsed.hero },
      about: { ...fallback.about, ...parsed.about },
      currently: { ...fallback.currently, ...parsed.currently },
      story: { ...fallback.story, ...parsed.story },
      contact: { ...fallback.contact, ...parsed.contact },
      footer: { ...fallback.footer, ...parsed.footer },
      journey: journeyItems,
      international: internationalItems,
      awards: Array.isArray(parsed.awards) ? parsed.awards : fallback.awards,
    };
  } catch { return fallback; }
}
