import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import connectDB from '@/config/db';

export async function POST(request) {
    try {
        await connectDB();

        const { productId, colorName, variantName, colorCode, quantities } = await request.json();

        // Support both old (colorName) and new (variantName) parameters
        const name = variantName || colorName;

        // Validation
        if (!productId || !name || !colorCode) {
            return NextResponse.json({
                success: false,
                message: 'Product ID, variant name, and color code are required'
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

        // Check if variant already exists
        if (product.inventory.some(item => item.variant.name.toLowerCase() === name.toLowerCase())) {
            return NextResponse.json({
                success: false,
                message: `Variant "${name}" already exists for this product`
            }, { status: 400 });
        }

        // Define available pack sizes for glossary shop
        const availablePackSizes = ['Unit', 'Pack', '500g', '1kg', 'Bundle', 'Box'];

        // Create new variant object
        const newVariant = {
            variant: {
                name: name.trim(),
                code: colorCode,
                image: ''
            },
            packStock: availablePackSizes.map(packSize => ({
                packSize,
                quantity: parseInt(quantities?.[packSize]) || 0,
                lowStockThreshold: 5,
                lastRestocked: new Date()
            }))
        };

        // Add variant to inventory
        product.inventory.push(newVariant);

        // Recalculate total stock
        product.totalStock = product.inventory.reduce((total, variantData) => {
            return total + variantData.packStock.reduce((variantTotal, packData) => {
                return variantTotal + packData.quantity;
            }, 0);
        }, 0);

        // Update available colors/variants
        product.availableColors = product.inventory
            .filter(item => item.packStock.some(pack => pack.quantity > 0))
            .map(item => item.variant.name);
        product.availableVariants = product.availableColors;

        // Update available sizes/pack sizes
        product.availableSizes = [...new Set(product.inventory.flatMap(item =>
            item.packStock.filter(pack => pack.quantity > 0).map(pack => pack.packSize)
        ))];
        product.availablePackSizes = product.availableSizes;

        // Update backward compatibility fields
        product.color = product.inventory.map(item => ({
            color: item.variant.name,
            stock: item.packStock.reduce((total, pack) => total + pack.quantity, 0)
        }));
        product.stock = product.totalStock;

        // Save product
        await product.save();

        //console.log(`✅ New color "${colorName}" added to product: ${productId}`);

        return NextResponse.json({
            success: true,
            message: `Variant "${name}" added successfully!`,
            product: {
                id: product._id,
                totalStock: product.totalStock,
                availableColors: product.availableColors,
                availableVariants: product.availableVariants,
                inventory: product.inventory
            }
        });

    } catch (error) {
        console.error('❌ Error adding color:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to add color: ' + error.message
        }, { status: 500 });
    }
}
