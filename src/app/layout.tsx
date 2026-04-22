import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import NavBar from "@/components/NavBar";
import HeartbeatAutoRunner from "@/components/HeartbeatAutoRunner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      <body className={`${inter.className} min-h-screen antialiased`}>
        <AuthProvider>
          <HeartbeatAutoRunner />
          <NavBar />
          <main>{children}</main>
          <footer className="border-t border-[var(--card-border)] mt-20">
            <div className="mx-auto max-w-5xl px-5 py-8 flex items-center justify-between text-sm text-[var(--muted)]">
              <span>Naibour — Turn what you have into what you need</span>
              <span>Next heartbeat: 06:00 CET</span>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
