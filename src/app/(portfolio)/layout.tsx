import type { Metadata } from "next";
import "../globals.css";
import { PortfolioBar } from "@/components/PortfolioBar";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "Portfolio",
    template: "%s | Yingdong Yang",
  },
  description: "English portfolio, resume, and selected work for Yingdong Yang.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('mb.theme')||'light';document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
      <body className="portfolio-body">
        <PortfolioBar />
        <main className="portfolio-main">{children}</main>
        <footer className="foot foot--portfolio">
          <span>Yingdong Yang</span>
          <span>Portfolio, resume, and selected work in English.</span>
        </footer>
      </body>
    </html>
  );
}
