import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Events | Delta Chi Alberta | Delta Chi Alberta, Canada",
  description:
    "Upcoming events and activities at Delta Chi Alberta. Stay connected with our fraternity events. Delta Chi Alberta, Canada.",
  openGraph: {
    title: "Events | Delta Chi Alberta",
    description: "Upcoming events and activities at Delta Chi Alberta. Delta Chi Alberta, Canada.",
  },
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-delta-navy dark:text-white sm:text-4xl">
        Upcoming Events
      </h1>
      <div className="mt-6">
        <Image
          src="/images/formal.jpg"
          alt="Upcoming Events"
          width={1200}
          height={800}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}

