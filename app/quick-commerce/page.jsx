import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is quick commerce delivery?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Quick commerce delivery is ultra-fast delivery of daily essentials, usually within a short time window."
            }
        },
        {
            "@type": "Question",
            name: "What can I order from Renuka Department?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can order groceries, staples, snacks, personal care, and household essentials."
            }
        },
        {
            "@type": "Question",
            name: "Is quick commerce good for daily shopping?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Quick commerce is ideal for urgent top-up purchases and daily needs."
            }
        },
        {
            "@type": "Question",
            name: "How do I place an order quickly?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Open the website, add products to cart, checkout, and track your order in a few steps."
            }
        },
        {
            "@type": "Question",
            name: "Can I track my order after checkout?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, you can track your order from the track order page after placing it."
            }
        }
    ]
};

export const metadata = {
    title: "Quick Commerce Delivery in Minutes | Renuka Department",
    description: "Get groceries and daily essentials delivered fast with Renuka Department. Quick commerce made simple, affordable, and reliable.",
    keywords: "quick commerce delivery, instant grocery delivery, fast delivery app, hyperlocal grocery delivery, 10 minute grocery delivery",
    alternates: {
        canonical: "/quick-commerce"
    },
    openGraph: {
        title: "Quick Commerce Delivery in Minutes | Renuka Department",
        description: "Fast delivery for groceries and daily essentials from Renuka Department.",
        url: "/quick-commerce",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Quick Commerce Delivery in Minutes | Renuka Department",
        description: "Fast delivery for groceries and daily essentials from Renuka Department."
    }
};

export default function QuickCommercePage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-24 pb-12">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8 md:p-12 shadow-sm">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">Quick Commerce Delivery in Minutes</h1>
                        <p className="mt-4 text-orange-50 text-base md:text-lg max-w-3xl">
                            Need groceries right now? Renuka Department helps you order daily essentials fast, with a simple and reliable quick commerce experience.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Link href="/all-products" className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full text-center hover:bg-orange-50">
                                Shop Now
                            </Link>
                            <Link href="/track-order" className="border border-white text-white font-semibold px-6 py-3 rounded-full text-center hover:bg-orange-500">
                                Track Order
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24 mt-10 grid md:grid-cols-3 gap-4">
                    <article className="bg-white rounded-xl border border-gray-200 p-5">
                        <h2 className="font-semibold text-gray-900">Faster Daily Deliveries</h2>
                        <p className="text-gray-600 text-sm mt-2">Order urgent essentials in minutes with a checkout flow designed for speed.</p>
                    </article>
                    <article className="bg-white rounded-xl border border-gray-200 p-5">
                        <h2 className="font-semibold text-gray-900">Fresh, Reliable Products</h2>
                        <p className="text-gray-600 text-sm mt-2">Browse high-demand groceries and essentials for your daily routine.</p>
                    </article>
                    <article className="bg-white rounded-xl border border-gray-200 p-5">
                        <h2 className="font-semibold text-gray-900">Simple Reordering</h2>
                        <p className="text-gray-600 text-sm mt-2">Use your order history to reorder frequently used items without friction.</p>
                    </article>
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24 mt-10">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How Quick Commerce Works</h2>
                        <ol className="list-decimal list-inside mt-4 space-y-2 text-gray-700">
                            <li>Open <span className="font-medium">Renuka Department</span> and browse essentials.</li>
                            <li>Add products to your cart with smart filters and search.</li>
                            <li>Checkout in a few steps and confirm your delivery details.</li>
                            <li>Track your order live from the tracking page.</li>
                        </ol>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24 mt-10">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">FAQ</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">What is quick commerce delivery?</h3>
                                <p className="text-gray-700 mt-1">Quick commerce delivery is ultra-fast delivery of daily essentials, usually within a short time window.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">What can I order from Renuka Department?</h3>
                                <p className="text-gray-700 mt-1">You can order groceries, staples, snacks, personal care, and household essentials.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Can I track my order after checkout?</h3>
                                <p className="text-gray-700 mt-1">Yes, use the <Link href="/track-order" className="text-orange-600 underline">Track Order</Link> page after placing your order.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
