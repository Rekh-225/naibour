import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naibour — AI-Powered Exchange Network",
  description:
    "Turn what you have into what you need. An AI-powered Budapest community exchange that discovers multi-party trade rings to match your skills with your neighbours' needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <nav className="border-b border-[var(--card-border)] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="mx-auto max-w-5xl px-5 py-3.5 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                N
              </div>
              <span className="font-semibold text-lg tracking-tight relative">
                <span className="group-hover:opacity-0 transition-opacity duration-200">Naibour</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[var(--primary)]">Szomszéd</span>
              </span>
            </a>
            <div className="flex items-center gap-1">
              <a
                href="/marketplace"
                className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
              >
                Marketplace
              </a>
              <a
                href="/post"
                className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
              >
                Post a Need
              </a>
              <a
                href="/matches"
                className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
              >
                Trade Rings
              </a>
              <a
                href="/trust"
                className="px-3.5 py-2 rounded-lg text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-all"
              >
                Trust
              </a>
              <a
                href="/onboarding"
                className="ml-2 btn-primary text-sm !py-2 !px-4"
              >
                Join Naibour
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-[var(--card-border)] mt-20">
          <div className="mx-auto max-w-5xl px-5 py-8 flex items-center justify-between text-sm text-[var(--muted)]">
            <span>Naibour — Turn what you have into what you need</span>
            <span>Next heartbeat: 06:00 CET</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
