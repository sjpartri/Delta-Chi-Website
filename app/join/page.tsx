import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Join Delta Chi Alberta | Rush & Recruitment – Delta Chi Alberta, Canada",
  description:
    "Join Delta Chi at the University of Alberta. Be a Man of Action. Rush and recruitment information for Delta Chi Alberta and Delta Chi Alberta, Canada.",
  openGraph: {
    title: "Join Delta Chi Alberta | Delta Chi Alberta, Canada",
    description: "Rush and recruitment. Be a Delta Chi. University of Alberta.",
  },
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-delta-navy dark:text-white sm:text-4xl">
        Join Delta Chi Alberta
      </h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
        Be a Man of Action. Be a Delta Chi.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-delta-navy dark:text-white">
          Why Delta Chi?
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-400">
          <li>Brotherhood that lasts a lifetime</li>
          <li>Leadership and character development</li>
          <li>Academic support and scholarship opportunities</li>
          <li>Philanthropy and giving back (e.g. The V Foundation)</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-delta-navy dark:text-white">
          Rush & Recruitment
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Interested in joining Delta Chi at the University of Alberta? Reach out to us for
          rush events, meet-the-brothers nights, and recruitment information. We look forward
          to meeting you.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-delta-red/30 bg-delta-red/5 p-6 dark:bg-delta-red/10">
        <h2 className="text-xl font-semibold text-delta-navy dark:text-white">
          Get in Touch
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Contact us for recruitment and rush information. Follow us on Instagram for events
          and updates.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-delta-red px-6 py-3 font-semibold text-white hover:bg-delta-red/90"
          >
            Contact Us
          </Link>
          <a
            href="https://www.instagram.com/uofadchi/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-delta-navy px-6 py-3 font-semibold text-delta-navy hover:bg-delta-navy/5 dark:border-gray-400 dark:text-white dark:hover:bg-white/10"
          >
            Instagram
          </a>
        </div>
      </section>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
        For international membership resources, visit{" "}
        <a href="https://deltachi.org/join-now/" target="_blank" rel="noopener noreferrer" className="text-delta-red hover:underline">
          deltachi.org/join-now
        </a>
        .
      </p>
    </div>
  );
}
