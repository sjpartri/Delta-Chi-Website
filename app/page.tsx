import Link from "next/link";
import Image from "next/image";
import { HeroCarousel } from "@/components/HeroCarousel";
import { InstagramFeed } from "@/components/InstagramFeed";
import { InstagramStories } from "@/components/InstagramStories";

export default function HomePage() {
  return (
    <>
      {/* Hero – carousel background (home_1–6.jpg), Delta Chi Alberta / Delta Chi Alberta, Canada */}
      <HeroCarousel />

      {/* Instagram Stories – above the fold, mobile-friendly */}
      <InstagramStories />

      {/* History – Delta Chi Alberta */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-delta-navy dark:text-white sm:text-3xl">
          Our History
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            In the early 1990&apos;s, the University of Alberta decided to expand its Fraternity System. Delta Chi was
            invited to the U of A campus and colonized in 1995.
          </p>
          <p>
            Our founding members worked diligently and were able to complete all the required steps to obtain our
            Charter and become a full chapter of the Delta Chi Fraternity in 1997.
          </p>
          <p>
            Since its founding in 1995, Delta Chi Alberta has been a mainstay of Greek Life at the U of A. We have
            over 300 Alumni and Student members and continue to grow.
          </p>
        </div>
        <Link href="/about" className="mt-6 inline-block font-medium text-delta-red hover:underline">
          Learn more about us →
        </Link>
      </section>

      {/* Quick Facts – from deltachi.org */}
      <section className="bg-delta-gold py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-12 text-center text-2xl font-bold text-delta-navy sm:text-3xl">
            Quick Facts
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {/* Total Members */}
            <div className="relative overflow-hidden rounded-xl bg-delta-red p-8 text-center shadow-lg">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="mb-4 flex justify-center">
                  <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-white sm:text-5xl">137,135</div>
                <div className="mt-2 text-lg font-semibold text-white/90">Total Members</div>
              </div>
            </div>

            {/* Chapters */}
            <div className="relative overflow-hidden rounded-xl bg-delta-red p-8 text-center shadow-lg">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="mb-4 flex justify-center">
                  <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    <path d="M19 10h2v2h-2zm0-4h2v2h-2zm0 8h2v2h-2z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-white sm:text-5xl">106</div>
                <div className="mt-2 text-lg font-semibold text-white/90">Chapters</div>
              </div>
            </div>

            {/* Average Chapter Size */}
            <div className="relative overflow-hidden rounded-xl bg-delta-red p-8 text-center shadow-lg">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="mb-4 flex justify-center">
                  <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-white sm:text-5xl">54</div>
                <div className="mt-2 text-lg font-semibold text-white/90">Average Chapter Size</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed – webpage and mobile friendly */}
      <InstagramFeed />

      {/* Upcoming Events */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-delta-navy dark:text-white sm:text-3xl">
          Upcoming Events
        </h2>
        <div className="mt-6">
          <Image
            src="/images/formal.jpg"
            alt="Upcoming Events"
            width={1200}
            height={800}
            className="rounded-lg object-cover"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-delta-red text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Be a Man of Action. Be a Delta Chi.
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Join the brotherhood at the University of Alberta.
          </p>
          <a
            href="https://app.chapterbuilder.com/forms/8129/view/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNDEyMTE1MiwianRpIjoiNjUyNzg4ZTgtM2MwYi00YmE2LWE1NGYtOGQ2ZjYyYmI1NTJjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ODEyOSwibmJmIjoxNzI0MTIxMTUyLCJjbGFpbXNfdHlwZSI6ImZvcm0ifQ.hpqK22OAu13z5pD2woiQf6YSnvUDzyCggWZ7VzGyD3I&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZnRzaAPpHa1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadgHQatH40mL0IYcd9UKgxamLJLYxZ4UdelzRBcHIGbRhlrQ7Ks0ZdNXSR26A_aem_DDYD09QqFtexnKCk0A749A"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-delta-red hover:bg-gray-100"
          >
            Join Now
          </a>
        </div>
      </section>
    </>
  );
}
