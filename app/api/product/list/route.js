import Product from "@/models/Product";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        await connectDB();

        // Get total count for pagination info
        const totalProducts = await Product.countDocuments({});
        const totalPages = Math.ceil(totalProducts / limit);

        // Get paginated products
        const rawProducts = await Product.find({})
            .sort({ date: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit);

        const products = rawProducts.map(product => product.toObject());

        // Build global facet counts across full catalog (not just current page)
        const [categoryFacetRows, brandFacetRows] = await Promise.all([
            Product.aggregate([
                { $match: { category: { $exists: true, $ne: null } } },
                { $group: { _id: "$category", count: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ]),
            Product.aggregate([
                { $match: { brand: { $exists: true, $ne: null } } },
                { $group: { _id: "$brand", count: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ])
        ]);

        const categoryCounts = categoryFacetRows.reduce((acc, row) => {
            if (row?._id) acc[row._id] = row.count;
            return acc;
        }, {});

        const brandCounts = brandFacetRows.reduce((acc, row) => {
            if (row?._id) acc[row._id] = row.count;
            return acc;
        }, {});

        const brands = Object.keys(brandCounts).sort();

        return NextResponse.json({
            success: true,
            products,
            facets: {
                categoryCounts,
                brandCounts,
                brands
            },
            pagination: {
                total: totalProducts,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}
