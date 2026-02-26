import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import User from "@/models/User";

export async function POST(request) {
    try {
        //console.log("⭐ Starting stock update API route");

        // Authenticate user
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'Authentication required'
            }, { status: 401 });
        }

        await connectDB();

        // Parse request data
        const { productId, updates } = await request.json();

        if (!productId || !updates || !Array.isArray(updates)) {
            return NextResponse.json({
                success: false,
                message: 'Invalid request data'
            }, { status: 400 });
        }

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({
                success: false,
                message: 'Product not found'
            }, { status: 404 });
        }

        // Check if user owns this product (in production, add proper seller auth)
        if (product.userId !== userId) {
            return NextResponse.json({
                success: false,
                message: 'Not authorized to update this product'
            }, { status: 403 });
        }

        // Process updates
        let stockUpdated = false;

        updates.forEach(update => {
            const { variantIndex, packIndex, colorIndex, sizeIndex, quantity, lowStockThreshold } = update;
            
            // Support both old (colorIndex/sizeIndex) and new (variantIndex/packIndex) parameters
            const vIdx = variantIndex !== undefined ? variantIndex : colorIndex;
            const pIdx = packIndex !== undefined ? packIndex : sizeIndex;

            if (
                vIdx >= 0 &&
                vIdx < product.inventory.length &&
                pIdx >= 0 &&
                pIdx < product.inventory[vIdx].packStock.length
            ) {
                if (quantity !== undefined) {
                    product.inventory[vIdx].packStock[pIdx].quantity = Math.max(0, parseInt(quantity));
                    product.inventory[vIdx].packStock[pIdx].lastRestocked = new Date();
                    stockUpdated = true;
                }

                if (lowStockThreshold !== undefined) {
                    product.inventory[vIdx].packStock[pIdx].lowStockThreshold = Math.max(0, parseInt(lowStockThreshold));
                }
            }
        });

        if (stockUpdated) {
            // Recalculate total stock
            product.totalStock = product.inventory.reduce((total, variantData) => {
                return total + variantData.packStock.reduce((variantTotal, packData) => {
                    return variantTotal + packData.quantity;
                }, 0);
            }, 0);

            // Update backward compatibility fields
            product.color = product.inventory.map(item => ({
                color: item.variant.name,
                stock: item.packStock.reduce((total, pack) => total + pack.quantity, 0)
            }));

            product.stock = product.totalStock;

            // Update available colors/variants and sizes
            product.availableColors = product.inventory
                .filter(item => item.packStock.some(pack => pack.quantity > 0))
                .map(item => item.variant.name);

            product.availableVariants = product.availableColors;

            product.availableSizes = [...new Set(product.inventory.flatMap(item =>
                item.packStock.filter(pack => pack.quantity > 0).map(pack => pack.packSize)
            ))];

            product.availablePackSizes = product.availableSizes;

            await product.save();

            //console.log("✅ Stock updated successfully for product:", productId);

            return NextResponse.json({
                success: true,
                message: 'Stock updated successfully',
                product: {
                    id: product._id,
                    totalStock: product.totalStock,
                    availableColors: product.availableColors,
                    availableSizes: product.availableSizes
                }
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'No valid updates provided'
            }, { status: 400 });
        }

    } catch (error) {
        console.error("❌ Error updating stock:", error);
        return NextResponse.json({
            success: false,
            message: 'Failed to update stock: ' + error.message
        }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        // Get stock levels for a specific product
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json({
                success: false,
                message: 'Product ID is required'
            }, { status: 400 });
        }

        await connectDB();

        const product = await Product.findById(productId, 'inventory totalStock availableColors availableSizes stockSettings');

        if (!product) {
            return NextResponse.json({
                success: false,
                message: 'Product not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            inventory: product.inventory,
            totalStock: product.totalStock,
            availableColors: product.availableColors,
            availableSizes: product.availableSizes,
            stockSettings: product.stockSettings
        });

    } catch (error) {
        console.error("❌ Error fetching stock data:", error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch stock data'
        }, { status: 500 });
    }
}