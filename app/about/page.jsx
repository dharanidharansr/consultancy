import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: 'About Us | Glossary Mart',
    description: 'Learn about Glossary Mart, your neighbourhood grocery store for fresh produce, daily essentials, and household items.',
    keywords: 'about us, glossary mart, grocery store, fresh produce, online grocery, daily essentials',
    openGraph: {
        title: 'About Us | Glossary Mart',
        description: 'Learn about Glossary Mart, your neighbourhood grocery store for fresh produce, daily essentials, and household items.',
        url: '/about',
        images: [
            {
                url: '/logo.svg',
                width: 1200,
                height: 630,
                alt: 'Glossary Mart Logo',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us | Glossary Mart',
        description: 'Learn about Glossary Mart, your neighbourhood grocery store for fresh produce, daily essentials, and household items.',
        images: ['/logo.svg'],
        creator: '@glossarymart',
        site: '@glossarymart',
    }
};

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative max-w-6xl mx-auto px-6 md:px-16 lg:px-32 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Freshness Delivered, <br /><span className="text-yellow-300">Every Single Day</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto">
                            Your trusted neighbourhood partner for farm-fresh produce and daily household essentials.
                        </p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-32">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                                <p className="text-lg text-gray-600 mb-6">
                                    Glossary Mart started with a simple mission: to make fresh, high-quality groceries accessible to everyone in our community. We believe that good food is the foundation of a happy home.
                                </p>
                                <p className="text-lg text-gray-600 mb-6">
                                    From sourcing directly from local farmers to ensuring lightning-fast delivery to your doorstep, we have reimagined the grocery shopping experience. No more long queues, heavy bags, or compromised quality.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <span className="text-2xl">🚜</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Farm to Table</h3>
                                        <p className="text-gray-600">Direct sourcing for maximum freshness</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl text-white shadow-xl">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold mb-2">50k+</div>
                                        <div className="text-sm opacity-90">Happy Families</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold mb-2">2000+</div>
                                        <div className="text-sm opacity-90">Daily Products</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold mb-2">30mins</div>
                                        <div className="text-sm opacity-90">Avg. Delivery</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold mb-2">100%</div>
                                        <div className="text-sm opacity-90">Quality Guarantee</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-16 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-32">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Shop With Us?</h2>
                            <p className="text-xl text-gray-600">The Glossary Mart difference in every order</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Fresh Guarantee */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-2xl">🥦</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Freshness Guarantee</h3>
                                <p className="text-gray-600">
                                    We carefully inspect every item. If you're not satisfied with the freshness, we'll replace it, no questions asked.
                                </p>
                            </div>

                            {/* Speedy Delivery */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast Delivery</h3>
                                <p className="text-gray-600">
                                    Our optimized logistics network ensures your groceries reach you in record time, while they're still fresh.
                                </p>
                            </div>

                            {/* Wide Selection */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-2xl">🛒</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Wide Assortment</h3>
                                <p className="text-gray-600">
                                    From local staples to international gourmet brands, find everything you need under one roof.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Values */}
                <div className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-32">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Feeding our community with integrity, sustainability, and care.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
                                    🌱
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Sustainable Sourcing</h3>
                                <p className="text-sm text-gray-600">Supporting eco-friendly farming practices</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-yellow-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
                                    🤝
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Community First</h3>
                                <p className="text-sm text-gray-600">Supporting local farmers and producers</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
                                    🛡️
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Quality & Safety</h3>
                                <p className="text-sm text-gray-600">Rigorous hygiene checks at every step</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
                                    ❤️
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Customer Love</h3>
                                <p className="text-sm text-gray-600">We serve you with a smile, always</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="py-16 bg-orange-50">
                    <div className="max-w-4xl mx-auto px-6 md:px-16 lg:px-32 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Stock Up Your Pantry Today!</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Experience the convenience of online grocery shopping with Glossary Mart.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/all-products"
                                className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
