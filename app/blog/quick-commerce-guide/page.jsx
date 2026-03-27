import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is quick commerce in simple terms?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Quick commerce is ultra-fast delivery of essential products, usually in 10 to 30 minutes."
            }
        },
        {
            "@type": "Question",
            name: "How is quick commerce different from ecommerce?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Quick commerce focuses on urgent, smaller baskets and faster delivery, while traditional ecommerce supports larger planned orders with longer delivery windows."
            }
        },
        {
            "@type": "Question",
            name: "Is quick commerce only for groceries?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "It mainly serves groceries and essentials, but also includes personal care and household products."
            }
        },
        {
            "@type": "Question",
            name: "How can I save money with quick commerce?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Compare final checkout costs, use offers, avoid impulse additions, and use quick commerce for top-up orders."
            }
        },
        {
            "@type": "Question",
            name: "When should I use quick commerce?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Use quick commerce for immediate needs and frequent daily top-ups where speed is the priority."
            }
        }
    ]
};

export const metadata = {
    title: "What Is Quick Commerce? Complete India Guide",
    description: "Learn what quick commerce is, how it works, and how to save on instant grocery delivery in India with practical shopping tips.",
    keywords: "what is quick commerce, quick commerce in India, quick commerce vs ecommerce, instant grocery delivery",
    alternates: {
        canonical: "/blog/quick-commerce-guide"
    },
    openGraph: {
        title: "What Is Quick Commerce? Complete India Guide",
        description: "Understand quick commerce in India with practical examples, tips, and buying strategies.",
        url: "/blog/quick-commerce-guide",
        type: "article"
    },
    twitter: {
        card: "summary_large_image",
        title: "What Is Quick Commerce? Complete India Guide",
        description: "Understand quick commerce in India with practical examples, tips, and buying strategies."
    }
};

export default function QuickCommerceGuidePage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-24 pb-12">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
                    <header className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
                        <p className="text-sm text-orange-600 font-medium">Quick Commerce Guide</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">What Is Quick Commerce? A Complete Guide for Indian Shoppers</h1>
                        <p className="text-gray-700 mt-4">
                            Quick commerce is transforming online grocery behavior by offering ultra-fast delivery for urgent needs. This guide explains how it works, where it helps, and how to use it efficiently.
                        </p>
                    </header>

                    <section className="mt-6 bg-orange-50 border border-orange-100 rounded-xl p-5">
                        <h2 className="text-xl font-semibold text-gray-900">Quick Answer</h2>
                        <p className="text-gray-700 mt-2">
                            Quick commerce is a hyperlocal delivery model that fulfills small, urgent orders in about 10 to 30 minutes using nearby inventory hubs and optimized last-mile logistics.
                        </p>
                    </section>

                    <section className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900">Why Quick Commerce Is Growing in India</h2>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                            <li>Urban consumers prefer convenience and speed.</li>
                            <li>Small, frequent top-up orders fit modern routines.</li>
                            <li>Mobile-first shopping behavior supports instant ordering.</li>
                            <li>App offers and bundles improve perceived value.</li>
                        </ul>
                    </section>

                    <section className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900">Quick Commerce vs Traditional Ecommerce</h2>
                        <div className="overflow-x-auto mt-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 text-left">
                                        <th className="py-2 pr-4 font-semibold text-gray-900">Factor</th>
                                        <th className="py-2 pr-4 font-semibold text-gray-900">Quick Commerce</th>
                                        <th className="py-2 font-semibold text-gray-900">Traditional Ecommerce</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2 pr-4">Delivery time</td>
                                        <td className="py-2 pr-4">10–30 minutes</td>
                                        <td className="py-2">1–3 days</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2 pr-4">Order type</td>
                                        <td className="py-2 pr-4">Urgent, smaller baskets</td>
                                        <td className="py-2">Planned, larger baskets</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 pr-4">Best use case</td>
                                        <td className="py-2 pr-4">Daily top-ups</td>
                                        <td className="py-2">Monthly stock-ups</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900">Practical Tips to Save More</h2>
                        <h3 className="text-lg font-semibold text-gray-900 mt-4">1) Compare final checkout value</h3>
                        <p className="text-gray-700 mt-1">Review delivery fee, handling fee, and discounts before payment.</p>

                        <h3 className="text-lg font-semibold text-gray-900 mt-4">2) Use quick commerce for urgent items only</h3>
                        <p className="text-gray-700 mt-1">Keep quick commerce for immediate needs, and reserve bulk shopping for planned orders.</p>

                        <h3 className="text-lg font-semibold text-gray-900 mt-4">3) Reorder from your order history</h3>
                        <p className="text-gray-700 mt-1">Use <Link href="/my-orders" className="text-orange-600 underline">My Orders</Link> to reduce repeat cart setup time.</p>
                    </section>

                    <section className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900">Related Links</h2>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                            <li><Link href="/quick-commerce" className="text-orange-600 underline">Quick Commerce Landing Page</Link></li>
                            <li><Link href="/all-products" className="text-orange-600 underline">Browse All Products</Link></li>
                            <li><Link href="/track-order" className="text-orange-600 underline">Track Your Order</Link></li>
                            <li><Link href="/contact" className="text-orange-600 underline">Contact Support</Link></li>
                        </ul>
                    </section>

                    <section className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
                        <div className="mt-4 space-y-4 text-gray-700">
                            <div>
                                <h3 className="font-semibold text-gray-900">What is quick commerce in simple terms?</h3>
                                <p className="mt-1">It is ultra-fast delivery of essentials, usually in 10 to 30 minutes.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">How is quick commerce different from ecommerce?</h3>
                                <p className="mt-1">Quick commerce is speed-first and top-up focused, while traditional ecommerce is broader and slower.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">How can I save money with quick commerce?</h3>
                                <p className="mt-1">Compare final checkout, use offers, and avoid impulse additions.</p>
                            </div>
                        </div>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    );
}
