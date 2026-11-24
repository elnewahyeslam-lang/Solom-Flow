import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {Inter} from "next/font/google"
const inter = Inter({subsets:["latin"]})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solom Flow",
  description: "Full Stack Application Solom Flow ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
 <ClerkProvider  
  appearance={{
    variables: {
      colorPrimary: '#06b6d4', 
      colorBackground: '#0b1220', 
      colorForeground: '#ffffff',
      colorInput: '#111827', 
      colorInputForeground: '#ffffff', 
      colorMutedForeground: '#9ca3af',
      colorNeutral:"white"
    },
    elements: {
      card: 'bg-[#0b1220]/90 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] rounded-2xl',
      headerTitle: 'text-white font-bold',
      headerSubtitle: 'text-white',
      socialButtonsBlockButton: 'bg-[#111827] border border-gray-700 hover:bg-gray-800 text-white',
      formButtonPrimary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]',
      footerActionLink: 'text-cyan-400 hover:text-cyan-300',
      userButtonPopUpCard: 'bg-[#0b1220] border border-cyan-500/30 text-white',
      userButtonPopoverActionButton:"text-white hover:bg-white/10",
      userButtonPopoverActionButtonText:"text-white",
      userButtonPopoverActionButtonIcon:"text-white",
      userPreviewMainIdentifier:"text-white",

    }
  }}
>
    <html
      lang="en"
      className={`${inter.className} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
    </ClerkProvider>
  );
}
