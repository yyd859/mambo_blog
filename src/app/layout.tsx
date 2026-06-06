import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/TopBar";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mambo blog",
  description: "记录身边有趣的、值得学习的地方 — 技术、设计、读书、思考方式",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${newsreader.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('mb.theme')||'light';document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
      <body>
        <TopBar />
        <main>{children}</main>
        <footer className="foot">
          <span>© 2024 Mambo · blog</span>
          <span>thinking and understanding cannot be replaced</span>
        </footer>
      </body>
    </html>
  );
}
