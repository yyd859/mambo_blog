import type { Metadata } from "next";
import "../globals.css";
import { TopBar } from "@/components/TopBar";
import { fontVariables } from "@/lib/fonts";

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
    <html lang="zh-CN" className={fontVariables}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('mb.theme')||'light';document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
      <body className="blog-body">
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
