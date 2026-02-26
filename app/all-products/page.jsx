import { Suspense } from "react";
import AllProductsContent from "./AllProductsContent";

export const metadata = {
    title: 'All Products',
    description: 'Browse our complete collection of fresh groceries, household essentials, and daily needs.',
    openGraph: {
        title: 'All Products | Glossary Mart',
        description: 'Browse our complete collection of fresh groceries, household essentials, and daily needs.',
    }
}

export default function Page() {
    return (
        <Suspense fallback={<div className="w-full text-center py-20">Loading products...</div>}>
            <AllProductsContent />
        </Suspense>
    );
}
