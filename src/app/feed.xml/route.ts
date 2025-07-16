import { getAllChapters } from '../../lib/chapters';
import { siteConfig } from '../../lib/config';

// Function to escape XML entities
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Map of chapter slugs to unique descriptions
const chapterDescriptions: Record<string, string> = {
  introduction: `A candid look at the gap between creative polish and strategic substance. This introduction sets the stage for why design needs more than just good taste—it needs meaning, coherence, and the ability to answer “why?”`,
  chapterone: `Explores the difference between art and design, and introduces the mental frameworks that give creative work structure, clarity, and purpose. Learn how to build a foundation for design that holds up under scrutiny.`,
  chaptertwo: `Shows how to interrogate briefs, uncover assumptions, and write problem statements that actually matter. Learn to define the real problem before jumping to solutions, and why context and audience are everything.`,
  chapterthree: `Design isn’t decoration—it’s a persuasive argument. This chapter teaches you to defend your choices, build credibility, and balance logic with emotion so your work can withstand critique and pushback.`,
  chapterfour: `How to carve out a meaningful, defensible position in the market. Covers competitive analysis, value proposition development, and translating positioning into design that stands apart.`,
  chapterfive: `Unlocks the power of semiotics and cultural context in design. Learn to interpret signs, symbols, and color, and avoid missteps by understanding how meaning shifts across audiences and cultures.`,
  chaptersix: `How to balance emotional impact with functional requirements. Learn when to prioritize feeling, when to focus on usability, and how to integrate both for designs that connect and perform.`,
  chapterseven: `Strategies for making your work stand out in a crowded market. Covers competitive analysis, brand personality, and how to create and sustain true differentiation through design.`,
  chaptereight: `A practical guide to naming—covering strategy, brainstorming, legal checks, and rollout. Learn how to create names that are memorable, meaningful, and legally sound.`,
  chapternine: `How language shapes brand identity and user experience. Learn to develop a consistent voice, adapt across platforms, and measure the impact of your words.`,
  chapterten: `Builds systems for visual and message consistency. Learn to develop and maintain a central concept, align teams, and keep your work coherent as it grows.`,
  chaptereleven: `When to be literal, when to be suggestive. This chapter explores communication strategies for clarity, emotion, and brand building, and how to blend both for maximum impact.`,
  chaptertwelve: `Move from arbitrary choices to logical, testable design systems. Learn to use hierarchy, information architecture, and visual logic to create work that makes sense and performs.`,
  chapterthirteen: `How to build, adapt, and improve your creative process. Covers ideation, collaboration, time management, and continuous improvement for better, more reliable creative output.`,
  chapterfourteen: `Shows how strategic limits can drive creativity. Learn to use constraints as tools for focus, innovation, and stronger design outcomes.`,
  chapterfifteen: `Bridges the gap between ideas and finished work. Learn how to develop, refine, and present concepts so they survive real-world challenges.`,
  chaptersixteen: `Techniques for surfacing hidden insights, needs, and opportunities in your work. Learn to make the intangible tangible through research, observation, and creative exploration.`,
  chapterseventeen: `How to turn a client brief into breakthrough ideas. Covers reframing, questioning, and pushing past the obvious to find real solutions.`,
  chaptereighteen: `How to back up your design decisions with evidence, not just taste. Learn to use research, testing, and metrics to build trust and credibility.`,
  chapternineteen: `Focuses on building the smallest, strongest version of your idea that people will actually care about. Learn to prioritize, test, and iterate for real impact.`,
  chaptertwenty: `How to use prototyping as a tool for discovery and learning, not just validation. Covers rapid iteration, feedback, and learning from failure.`,
  chaptertwentyone: `How to document, present, and learn from your work. Learn to turn projects into compelling case studies that showcase your thinking and results.`,
  chaptertwentytwo: `A hands-on guide to building persuasive presentations and decks. Learn structure, storytelling, and visual communication for maximum impact.`,
  chaptertwentythree: `Practical strategies for negotiating creative work—internally and with clients. Covers stakeholder management, compromise, and protecting your vision.`,
  chaptertwentyfour: `Why frameworks sometimes fail, and how to adapt when they do. Learn to spot the limits of models and improvise when reality doesn’t fit the template.`,
  chaptertwentyfive: `How to tell the difference between bold creativity and muddled thinking. Learn to self-audit, clarify, and sharpen your work.`,
  chaptertwentysix: `How to stay adaptable without losing your core vision. Covers pivoting, responding to change, and keeping your work relevant.`,
  chaptertwentyseven: `How to make smart compromises without sacrificing quality. Learn to balance competing needs and keep your work strong.`,
  chaptertwentyeight: `How to balance strategic goals with visual style. Learn when to push for strategy, when to let style lead, and how to align both.`,
  chaptertwentynine: `A deep dive into the project triangle—how to balance quality, speed, and cost in real-world creative work.`,
  chapterthirty: `Strategies for navigating uncertainty, making decisions with limited information, and moving forward when the path isn’t clear.`,
};

export async function GET() {
  const chapters = getAllChapters();
  const baseUrl = siteConfig.primaryDomain;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Looks Good, Now What</title>
    <description>${escapeXml('Looks Good, Now What is a practical, honest guide to bridging the gap between creative work and real strategy. This book helps designers, students, and teams move beyond surface-level polish to create work that stands up to critique, context, and business needs. Learn how to frame problems, defend your ideas, and build design that actually matters.')}</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>1440</ttl>
    ${chapters
      .map(
        chapter => `
    <item>
      <title>Chapter ${chapter.order}: ${escapeXml(chapter.chapter)}</title>
      <description>${escapeXml(chapterDescriptions[chapter.slug] || '')}</description>
      <link>${baseUrl}/${chapter.slug}</link>
      <guid>${baseUrl}/${chapter.slug}</guid>
      <pubDate>2024-01-01T00:00:00Z</pubDate>
      <category>Design Education</category>
      <category>Strategic Design</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
