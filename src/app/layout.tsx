import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Prompt({ subsets: ["thai"], weight: "500" });

export const metadata: Metadata = {
  title: "HStudio",
  description: "บอทเพลงที่สร้างมาเพื่อทุกคน!",
  icons: ["/favicon.ico"],
  keywords: ["บอท", "บอทเพลง", "บอทเพลงดิส", "บอทเพลงดิสคอร์ด", "บอทเพลง Discord", "Discord", "Discord Bot", "discord bot", "discord music bot", "bot music", "bot music discord", "บอทเปิดเพลงในดิส", "บอทเพลง ดิส", "บอทเพลง ดิสคอร์ด", "บอทเพลง Dis", "บอทเปิดเพลงในไทย", "บอทเพลงไทย", "บอทเพลงดิสไทย"],
  publisher: "HewkawAr",
  openGraph: {
    title: "HStudio",
    url: "https://hstudio.hewkawar.xyz/",
    images: "https://hstudio.hewkawar.xyz/HStudio.profile.banner.png",
    locale: "th",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#5c9ae0"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`bg-[#282828] h-screen w-screen ${inter.className}`}>
        <Nav />
        <main className="flex flex-col items-center justify-center text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
