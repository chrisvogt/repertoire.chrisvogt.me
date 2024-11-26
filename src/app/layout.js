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
        className={`bg-gray-900 text-white h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Top Bar */}
        <header className="bg-gray-800 p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold text-center">
              My Piano Repertoire
            </h1>
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
