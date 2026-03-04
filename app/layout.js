import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  metadataBase: new URL('https://glossary-mart.vercel.app'),
  title: {
    template: '%s | Glossary Mart',
    default: 'Glossary Mart - Your Neighbourhood Grocery Store',
  },
  description: "Shop fresh groceries, daily essentials, and household items at Glossary Mart. Fast delivery, great prices, and a wide selection of quality products.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Glossary Mart - Your Neighbourhood Grocery Store",
    description: "Shop fresh groceries, daily essentials, and household items at Glossary Mart. Fast delivery, great prices, and a wide selection of quality products.",
    url: 'https://glossary-mart.vercel.app',
    siteName: 'Glossary Mart',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Glossary Mart Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glossary Mart - Your Neighbourhood Grocery Store',
    description: 'Shop fresh groceries, daily essentials, and household items at Glossary Mart.',
    images: ['/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              // Default options
              duration: 3000,
              className: 'app-toast',
              style: {
                background: '#fff',
                color: '#363636',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                maxWidth: '500px',
              },
              // Success toast style
              success: {
                duration: 3000,
                style: {
                  background: '#10b981',
                  color: '#fff',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#10b981',
                },
              },
              // Error toast style
              error: {
                duration: 4000,
                style: {
                  background: '#ef4444',
                  color: '#fff',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#ef4444',
                },
              },
              // Loading toast style
              loading: {
                style: {
                  background: '#3b82f6',
                  color: '#fff',
                },
              },
            }}
          />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
