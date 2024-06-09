import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Prompt({ subsets: ["thai"], weight: "500" });

export const metadata: Metadata = {
  title: "HStudio",
  description: "บอทเพลงที่สร้างมาสำหรับทุกคน ! | บอท, บอทเพลง, บอทเพลงดิส, บอทเพลงดิสคอร์ด, บอทเพลง Discord, Discord, Discord Bot, discord bot, discord music bot, bot music, bot music discord, บอทเปิดเพลงในดิส, บอทเพลง ดิส, บอทเพลง ดิสคอร์ด, บอทเพลง Dis, บอทเปิดเพลงในไทย, บอทเพลงไทย, บอทเพลงดิสไทย",
};

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
