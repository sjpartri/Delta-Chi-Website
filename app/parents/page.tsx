import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parents | Delta Chi Alberta | Delta Chi Alberta, Canada",
  description:
    "Information for parents about Delta Chi Fraternity at the University of Alberta. Learn about our values, safety, and support for students. Delta Chi Alberta, Canada.",
  openGraph: {
    title: "Parents | Delta Chi Alberta",
    description: "Information for parents about Delta Chi Fraternity. Delta Chi Alberta, Canada.",
  },
};

export default function ParentsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-delta-navy dark:text-white sm:text-4xl">
        Dear Parents,
      </h1>

      <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          My name is Paul Welke and I held the position of "BB", which is the Alumnus Advisor to the Alberta Chapter of the Delta Chi Fraternity.
        </p>

        <p>
          I want to thank you for taking the time to learn more about The Delta Chi Fraternity. Here at the Alberta Chapter, we want you to be as excited and comfortable with your son's interest in the Fraternity as he is. It is our wish to enable your son to meet and exceed the changing expectations that are placed on university students, as well as to be a successful member after convocation. The Fraternity provides support to our chapters and individual members through leadership programs, written and online programming, and staff coaching to all chapters on a regular basis.
        </p>

        <p>
          Alumni volunteers are engaged to supervise the operations of the chapters, and minimum standards for all Delta Chi chapters are in place to ensure all brothers are having a quality fraternity experience, which is where I come in.
        </p>

        <p>
          I initiated into the Delta Chi Fraternity in 1999 and have been involved in one capacity or another ever since. My current role is to ensure that the undergraduate members of the Chapter are free to explore and grow, but also to make sure that they are safe and living Delta Chi's cardinal values of promoting friendship, developing character, promoting justice, and assisting in the acquisition of a sound education.
        </p>

        <p>
          I am many things. I am a father, son, partner, brother, lawyer, and friend. I strongly believe that being a Delta Chi has helped me to be better at all of these things. I volunteer my time to this organization because I've benefited from our position that we take great men and make them better. I would consider it my privilege to be able to share this opportunity with your son.
        </p>

        <p>
          If you have any questions about Delta Chi or fraternity life, please do not hesitate to email me at{" "}
          <a
            href="mailto:paul.r.welke@gmail.com"
            className="font-medium text-delta-red hover:underline"
          >
            paul.r.welke@gmail.com
          </a>
          .
        </p>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <p className="text-gray-600 dark:text-gray-400">
          Sincerely,
        </p>
        <p className="mt-2 font-semibold text-delta-navy dark:text-white">
          Paul R. Welke, Alberta '04
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/values"
          className="inline-flex items-center rounded-lg bg-delta-navy px-6 py-3 font-semibold text-white hover:bg-delta-navy/90 dark:bg-delta-navy"
        >
          Learn More About Us
        </Link>
        <a
          href="https://app.chapterbuilder.com/forms/8129/view/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNDEyMTE1MiwianRpIjoiNjUyNzg4ZTgtM2MwYi00YmE2LWE1NGYtOGQ2ZjYyYmI1NTJjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ODEyOSwibmJmIjoxNzI0MTIxMTUyLCJjbGFpbXNfdHlwZSI6ImZvcm0ifQ.hpqK22OAu13z5pD2woiQf6YSnvUDzyCggWZ7VzGyD3I&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZnRzaAPpHa1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadgHQatH40mL0IYcd9UKgxamLJLYxZ4UdelzRBcHIGbRhlrQ7Ks0ZdNXSR26A_aem_DDYD09QqFtexnKCk0A749A"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border border-delta-navy px-6 py-3 font-semibold text-delta-navy hover:bg-delta-navy/5 dark:border-gray-400 dark:text-white dark:hover:bg-white/10"
        >
          Join Delta Chi
        </a>
      </div>
    </div>
  );
}

