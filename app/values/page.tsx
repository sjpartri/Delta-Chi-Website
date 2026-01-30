import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Values | Delta Chi Alberta – Promote Friendship, Develop Character",
  description:
    "Delta Chi values: Promoting Friendship, Developing Character, Advancing Justice, Assisting in a Sound Education. Delta Chi Alberta and Delta Chi Alberta, Canada.",
  openGraph: {
    title: "Values | Delta Chi Alberta",
    description: "Our core values and Eleven Basic Expectations. Delta Chi Alberta, Canada.",
  },
};

const values = [
  {
    title: "Promote Friendship",
    body: "Delta Chi exists to promote friendship in its members. The close association of college and university men produces life-long friends. The experience of seeing your own son initiated into Delta Chi decades after you were can bring generations closer through the shared experience of our Ritual.",
  },
  {
    title: "Develop Character",
    body: "Character is good sportsmanship, academic success and integrity, and holding yourself and others to a higher standard. In Delta Chi, character is a core value and the cornerstone of the Fraternity. Challenging yourself to take a leadership role or to live according to the values of the Ritual helps develop your individual character.",
  },
  {
    title: "Advance Justice",
    body: "Originally founded as a law fraternity, Delta Chi still holds as its cardinal principle the perpetuation of justice in society. A Delta Chi is always concerned with doing the right thing, even when it might not be the popular thing to do.",
  },
  {
    title: "Assist in the Acquisition of a Sound Education",
    body: "Delta Chi can provide a support network around your college experience—study groups, note files, mentoring by upperclassmen, and advice from the chapter's faculty advisor. The Delta Chi Educational Foundation also provides members with scholarship opportunities based on academic success and campus involvement.",
  },
];

const preamble =
  "We, the members of The Delta Chi Fraternity, believing that great advantages are to be derived from a brotherhood of college and university men, appreciating that close association may promote friendship, develop character, advance justice, and assist in the acquisition of a sound education, do ordain and establish this Constitution.";

export default function ValuesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-delta-navy dark:text-white sm:text-4xl">
        Our Values
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Delta Chi Alberta and Delta Chi Alberta, Canada are built on the same core values that define 
        The Delta Chi Fraternity worldwide.
      </p>

      <div className="mt-12 space-y-12">
        {values.map((v) => (
          <section key={v.title}>
            <h2 className="text-xl font-semibold text-delta-navy dark:text-white">
              {v.title}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{v.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-delta-navy dark:text-white">
          Preamble of the Delta Chi Constitution
        </h2>
        <p className="mt-4 italic text-gray-600 dark:text-gray-400">&ldquo;{preamble}&rdquo;</p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-delta-navy dark:text-white">
          Eleven Basic Expectations
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Delta Chi has developed the Eleven Basic Expectations of each member as a way to embody 
          and employ these values. These include striving for academic achievement and integrity, 
          respecting the dignity of all persons, protecting health and safety, meeting financial 
          obligations, and sustaining commitment to the fraternity throughout life.
        </p>
        <a
          href="https://deltachi.org/values/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-medium text-delta-red hover:underline"
        >
          Read the full Eleven Basic Expectations at deltachi.org →
        </a>
      </section>

      <div className="mt-12">
        <a
          href="https://app.chapterbuilder.com/forms/8129/view/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNDEyMTE1MiwianRpIjoiNjUyNzg4ZTgtM2MwYi00YmE2LWE1NGYtOGQ2ZjYyYmI1NTJjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ODEyOSwibmJmIjoxNzI0MTIxMTUyLCJjbGFpbXNfdHlwZSI6ImZvcm0ifQ.hpqK22OAu13z5pD2woiQf6YSnvUDzyCggWZ7VzGyD3I&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZnRzaAPpHa1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadgHQatH40mL0IYcd9UKgxamLJLYxZ4UdelzRBcHIGbRhlrQ7Ks0ZdNXSR26A_aem_DDYD09QqFtexnKCk0A749A"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-delta-red px-6 py-3 font-semibold text-white hover:bg-delta-red/90"
        >
          Join Delta Chi Alberta
        </a>
      </div>
    </div>
  );
}
