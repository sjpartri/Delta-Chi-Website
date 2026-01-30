import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Philanthropy | Delta Chi Alberta – The V Foundation – Delta Chi Alberta, Canada",
  description:
    "Delta Chi Alberta philanthropy and giving back. Partnership with The V Foundation for Cancer Research. Delta Chi Alberta, Canada raises millions for cancer research.",
  openGraph: {
    title: "Philanthropy | Delta Chi Alberta",
    description: "Giving back with The V Foundation. Delta Chi Alberta, Canada.",
  },
};

export default function PhilanthropyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-delta-navy dark:text-white sm:text-4xl">
        Philanthropy & Giving Back
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Delta Chi Alberta and Delta Chi Alberta, Canada are committed to giving back. Our international 
        fraternity has a strong partnership with The V Foundation for Cancer Research.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-delta-navy dark:text-white">
          The V Foundation for Cancer Research
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Since 2006, collegiate and alumni members of Delta Chi have joined hands in fighting 
          cancer together with The V Foundation for Cancer Research. Each year, our chapters 
          host various fundraising events and educate their members and campus communities on 
          the importance of philanthropic giving to cancer research. Our strong partnership 
          allows each donor to make a greater impact on finding cures for cancer than he or 
          she could ever do on his or her own.
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Delta Chi has raised over $2 million for The V Foundation. Delta Chi Alberta is 
          proud to contribute to this mission.
        </p>
        <a
          href="https://deltachi.org/giving-back/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-medium text-delta-red hover:underline"
        >
          Learn more at deltachi.org →
        </a>
      </section>

      <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-delta-navy dark:text-white">
          Get Involved
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Want to support our philanthropy efforts? Reach out to Delta Chi Alberta or participate 
          in chapter events. You can also learn about the Delta Chi Educational Foundation and 
          other giving opportunities through the international fraternity.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block font-medium text-delta-red hover:underline"
        >
          Contact us →
        </Link>
      </section>
    </div>
  );
}
