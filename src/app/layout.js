import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "My Piano Repertoire | chrisvogt.me",
  description: "The piano repertoire of Chris Vogt from San Francisco. Find more on www.chrisvogt.me.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-800 text-white h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Top Bar */}
        <header className="bg-gray-850 py-5 shadow-md border-b border-gray-700">
          <div className="container mx-auto">
            <h1 className="text-4xl mb-2 font-bold text-center">
              My Piano Repertoire
            </h1>
            <a
              className="text-center underline block text-sm text-gray-300 hover:text-gray-100"
              href="https://docs.google.com/spreadsheets/d/1IRqgQCXxQ0KEqAdV119wN3FdhwVe_vtVjjPaowS5vFA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source on Google Sheets
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="container mx-auto h-full p-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
