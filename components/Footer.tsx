import Link from "next/link";

const footerLinks = {
  main: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/events", label: "Events" },
    { href: "/join", label: "Join" },
    { href: "/parents", label: "Parents" },
    { href: "/philanthropy", label: "Philanthropy" },
    { href: "/values", label: "Values" },
  ],
  international: [
    { href: "https://deltachi.org", label: "Delta Chi International", external: true },
    { href: "http://www.mydchi.org", label: "MyDChi", external: true },
  ],
};

const social = [
  { href: "https://www.instagram.com/uofadchi/", label: "Instagram" },
  { href: "https://www.facebook.com/deltachifraternity", label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-delta-navy text-gray-300 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-white">
              ΔΧ <span className="text-delta-red">Alberta</span>
            </p>
            <p className="mt-2 text-sm">
              Delta Chi Fraternity at the University of Alberta. Brotherhood of a lifetime. Delta Chi Alberta, Canada.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.main.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">International</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.international.map(({ href, label, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-sm hover:text-white hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Stay Connected</h3>
            <ul className="mt-4 flex flex-wrap gap-4">
              {social.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Delta Chi Alberta. The Delta Chi Fraternity, Inc. ™</p>
          <p className="mt-1">
            <a href="https://deltachi.org" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
              deltachi.org
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
