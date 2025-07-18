import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '../../lib/config';
import Image from 'next/image';
import {
  getAboutBreadcrumbs,
  generateStructuredStaticBreadcrumbs,
} from '../../lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'About Luka Gray',
  description:
    'Learn about "Looks Good, Now What" and author Luka Gray - a comprehensive guide to strategic design thinking for students and educators.',
  keywords: [
    'about Luka Gray',
    'author bio',
    'design thinking author',
    'strategic design expert',
    'Leo Burnett',
    'creative director',
    'looks good now what',
    'luka',
    'gray',
    'author',
    'bio',
    'about',
    'expert',
    'director',
    'looks',
    'good',
    'now',
    'what',
  ],
  openGraph: {
    title: 'About the Book and Author - Looks Good, Now What',
    description: 'Learn about "Looks Good, Now What" and author Luka Gray',
    url: `${siteConfig.primaryDomain}/about`,
    type: 'article',
    images: [
      {
        url: '/profile_photo.jpg',
        width: 1200,
        height: 630,
        alt: 'About Luka Gray',
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.primaryDomain}/about`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'content-language': 'en',
    'revisit-after': '7 days',
  },
};

export default function AboutPage() {
  const breadcrumbs = getAboutBreadcrumbs();
  const structuredBreadcrumbs =
    generateStructuredStaticBreadcrumbs(breadcrumbs);
  return (
    <div className="min-h-screen bg-[#dfdfdf]" style={{ paddingTop: '40px' }}>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredBreadcrumbs),
        }}
      />
      <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-40px)] gap-0 m-0 px-0">
        {}
        <div
          className="rounded-none shadow basis-[20%] lg:basis-[40%] h-[20vh] lg:h-auto max-h-[20vh] lg:max-h-none relative overflow-hidden"
          style={{ backgroundColor: '#dfdfdf' }}
        >
          <Image
            src="/profile_photo.jpg"
            alt="About Luka Gray"
            fill
            sizes="(max-width: 1024px) 20vw, 40vw"
            className="object-cover object-center"
            style={{ objectPosition: 'center 30%' }}
            priority={false}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
          />
        </div>

        {}
        <div className="flex-1 bg-white rounded-none shadow-lg p-6 overflow-y-auto basis-[80%] lg:basis-[60%] flex flex-col m-0">
          <div className="prose prose-sm md:prose-base max-w-none w-4/5 mx-auto">
            <h1>About The Author</h1>

            <div style={{ height: '20px' }}></div>

            <p>
              <strong>Luka Gray</strong> – Associate Creative Director at Leo
              Burnett.
            </p>

            <div style={{ height: '20px' }}></div>

            <p>
              I acquired my design fundamentals at Fort Hays State University,
              and then learned how brands truly behave by building them in the
              field. Since then, I&apos;ve developed work for prominent clients
              such as Samsung, Kellogg, Bridgestone, Dunkin&apos;, Miller-Coors,
              Altria, Echo, and the United Nations, aligning consumer insights,
              business needs, and disciplined design practices.
            </p>

            <div style={{ height: '20px' }}></div>

            <p>
              For the past several years, I&apos;ve lectured at the University
              of Nebraska–Lincoln and traveled to colleges across the Midwest,
              challenging students to tie every creative decision to a clear
              strategic purpose. Whether the brief calls for packaging,
              short-form film, or an interactive prototype, the goal remains the
              same: to create work that earns its place by solving a real
              problem.
            </p>

            <div style={{ height: '20px' }}></div>

            <h2>Why I Wrote This Book</h2>

            <div style={{ height: '20px' }}></div>

            <p>
              Most design books lose me in one of two places; they either stall
              in theory or skip straight to shiny case studies. Neither helps
              when you are staring at a blank artboard and a hazy brief. I wrote
              this book to fill that space in the middle.
            </p>

            <div style={{ height: '20px' }}></div>

            <p>
              By the end, you should be able to crack any problem down to its
              human truth, frame it in plain language, and make design decisions
              that line up with that truth. No buzzwords, no hand-waving, just a
              process you can defend.
            </p>

            <div style={{ height: '20px' }}></div>

            <p>
              Treat these pages like studio time with a mentor, not a lecture
              hall. Read, try, question, repeat. This is how I see our field:
              take what works, leave what doesn&apos;t, and build your approach.
            </p>

            <div style={{ height: '20px' }}></div>

            <p>
              And before you hit export, pause. Ask who feels the impact, good
              or bad. Design is our way of pointing art and language at real
              people; let&apos;s use that power with purpose.
            </p>

            <div style={{ height: '20px' }}></div>

            <h2>Essential Reading</h2>

            <div style={{ height: '20px' }}></div>

            <h3>FOUNDATIONS</h3>

            <div style={{ height: '20px' }}></div>

            <ul>
              <li>
                <strong>
                  <em>The Design of Everyday Things</em>
                </strong>{' '}
                by Don Norman – User-centred design basics.
              </li>
              <li>
                <strong>
                  <em>Positioning</em>
                </strong>{' '}
                by Al Ries & Jack Trout – Carving out market space.
              </li>
            </ul>

            <div style={{ height: '30px' }}></div>

            <h3>CONCEPT & STRATEGY</h3>

            <div style={{ height: '20px' }}></div>

            <ul>
              <li>
                <strong>
                  <em>A Smile in the Mind</em>
                </strong>{' '}
                by Beryl McAlhone & David Stuart – Idea generation that hits.
              </li>
              <li>
                <strong>
                  <em>Designing Brand Identity</em>
                </strong>{' '}
                by Alina Wheeler – Building and managing brand systems.
              </li>
              <li>
                <strong>
                  <em>Made to Stick</em>
                </strong>{' '}
                by Chip Heath & Dan Heath – Turning messages into stories that
                stay.
              </li>
            </ul>

            <div style={{ height: '30px' }}></div>

            <h3>PROCESS & CRAFT</h3>

            <div style={{ height: '20px' }}></div>

            <ul>
              <li>
                <strong>
                  <em>Sprint</em>
                </strong>{' '}
                by Jake Knapp – A five-day framework for solving product
                problems.
              </li>
              <li>
                <strong>
                  <em>Lean UX</em>
                </strong>{' '}
                by Jeff Gothelf – Rapid, test-driven product design.
              </li>
              <li>
                <strong>
                  <em>The Field Study Handbook</em>
                </strong>{' '}
                by Jan Chipchase – In-the-wild research playbook.
              </li>
            </ul>

            <div style={{ height: '30px' }}></div>

            <h3>SYSTEMS, FUTURES & ETHICS</h3>

            <div style={{ height: '20px' }}></div>

            <ul>
              <li>
                <strong>
                  <em>Dark Matter & Trojan Horses</em>
                </strong>{' '}
                by Dan Hill – Using design to shift policy and systems.
              </li>
              <li>
                <strong>
                  <em>The Politics of Design</em>
                </strong>{' '}
                by Ruben Pater – Spotting bias in colour, type, and imagery.
              </li>
              <li>
                <strong>
                  <em>Design Justice</em>
                </strong>{' '}
                by Sasha Costanza-Chock – Equity first design practice.
              </li>
            </ul>

            <div style={{ height: '200px' }}></div>
          </div>
        </div>
      </div>

      {}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Looks Good, Now What',
            description:
              'About the book "Looks Good, Now What" and author Luka Gray',
            mainEntity: {
              '@type': 'Book',
              name: 'Looks Good, Now What',
              author: {
                '@type': 'Person',
                name: 'Luka Gray',
              },
              description:
                'A comprehensive guide to strategic design thinking for students and educators',
              genre: 'Design, Education, Business',
              audience: {
                '@type': 'Audience',
                audienceType: 'Students and Educators in Design',
              },
            },
            url: `${siteConfig.primaryDomain}/about`,
          }),
        }}
      />
    </div>
  );
}
