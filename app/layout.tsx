import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevOverflow",
  description: "A community-driven platform for asking and answering programming questions. get help, share knowledge",
  icons: {
    icon: '/public/assets/images/jsm-logo-dark.svg'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'primary-gradient',
          footerActionLink: 'primary-text-gradient hover:text-primary-500'
        }
      }}
    >
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
