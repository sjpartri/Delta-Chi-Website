import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Delta Chi Alberta | Delta Chi Alberta, Canada",
  description:
    "Contact Delta Chi Alberta at the University of Alberta. Get in touch for recruitment, events, and more. Delta Chi Alberta, Canada.",
  openGraph: {
    title: "Contact Delta Chi Alberta",
    description: "Get in touch. Delta Chi Alberta, Canada.",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-delta-navy dark:text-white sm:text-4xl">
        Contact Delta Chi Alberta
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Get in touch for recruitment, events, alumni relations, or general inquiries.
        Delta Chi Alberta, Canada – University of Alberta.
      </p>

      <section className="mt-12">
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-delta-navy dark:text-white">
            Our House
          </h2>
          <div className="mt-4 space-y-3 text-gray-600 dark:text-gray-400">
            <p>
              <strong className="text-delta-navy dark:text-white">Address:</strong>
              <br />
              11054 87 Ave NW
              <br />
              Edmonton, AB T6G 0X6
            </p>
            <p>
              <strong className="text-delta-navy dark:text-white">Email:</strong>
              <br />
              <a href="mailto:president@deltachi.ca" className="text-delta-red hover:underline">
                president@deltachi.ca
              </a>
            </p>
            <p>
              <a
                href="https://share.google/SQGoMT3cbD6IiJKGC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-delta-red hover:underline"
              >
                View Our House on Google Maps →
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-delta-navy dark:text-white">
          Follow Us
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="https://www.instagram.com/uofadchi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-delta-red hover:underline"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/deltachialberta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-delta-red hover:underline"
            >
              Facebook
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-delta-navy dark:text-white">
          Reviews
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          See what people are saying about Delta Chi Alberta. Visit our{" "}
          <a
            href="https://share.google/SQGoMT3cbD6IiJKGC"
            target="_blank"
            rel="noopener noreferrer"
            className="text-delta-red hover:underline"
          >
            Google Maps listing
          </a>{" "}
          to read reviews and see photos of our house.
        </p>
      </section>

      <p className="mt-12 text-gray-600 dark:text-gray-400">
        For rush and recruitment at the University of Alberta, reach out via our social media or email.
      </p>

      <a
        href="https://app.chapterbuilder.com/forms/8129/view/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNDEyMTE1MiwianRpIjoiNjUyNzg4ZTgtM2MwYi00YmE2LWE1NGYtOGQ2ZjYyYmI1NTJjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ODEyOSwibmJmIjoxNzI0MTIxMTUyLCJjbGFpbXNfdHlwZSI6ImZvcm0ifQ.hpqK22OAu13z5pD2woiQf6YSnvUDzyCggWZ7VzGyD3I&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZnRzaAPpHa1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadgHQatH40mL0IYcd9UKgxamLJLYxZ4UdelzRBcHIGbRhlrQ7Ks0ZdNXSR26A_aem_DDYD09QqFtexnKCk0A749A"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block font-medium text-delta-red hover:underline"
      >
        Join Delta Chi →
      </a>
    </div>
  );
}
