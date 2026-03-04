import Product from "@/models/Product";
import connectDB from "@/config/db";

/**
 * Utility functions for product inventory management
 */

// Check if a product has the new inventory system
export function hasNewInventorySystem(product) {
    return product.inventory && Array.isArray(product.inventory) && product.inventory.length > 0;
}

// Convert old product structure to new inventory system
export function migrateProductToNewInventory(product) {
    if (hasNewInventorySystem(product)) {
        return product; // Already migrated
    }

    // Convert old color/sizes structure to new inventory
    const inventory = [];

    if (product.color && Array.isArray(product.color)) {
        product.color.forEach(colorItem => {
            if (colorItem.color) {
                const variantInventory = {
                    variant: {
                        name: colorItem.color,
                        code: getColorCode(colorItem.color), // Helper function to get color code
                        image: ''
                    },
                    packStock: []
                };

                // Create pack stock for each available size/pack
                if (product.sizes && Array.isArray(product.sizes)) {
                    product.sizes.forEach(size => {
                        variantInventory.packStock.push({
                            packSize: size,
                            quantity: Math.floor((colorItem.stock || 0) / product.sizes.length), // Distribute stock evenly
                            lowStockThreshold: 5,
                            lastRestocked: new Date()
                        });
                    });
                }

                inventory.push(variantInventory);
            }
        });
    }

    // Update product with new inventory structure
    const updatedProduct = {
        ...product,
        inventory,
        totalStock: inventory.reduce((total, variantData) => {
            return total + variantData.packStock.reduce((variantTotal, packData) => {
                return variantTotal + packData.quantity;
            }, 0);
        }, 0),
        availableVariants: inventory
            .filter(item => item.packStock.some(pack => pack.quantity > 0))
            .map(item => item.variant.name),
        availableColors: inventory
            .filter(item => item.packStock.some(pack => pack.quantity > 0))
            .map(item => item.variant.name),
        availablePackSizes: [...new Set(inventory.flatMap(item =>
            item.packStock.filter(pack => pack.quantity > 0).map(pack => pack.packSize)
        ))],
        availableSizes: [...new Set(inventory.flatMap(item =>
            item.packStock.filter(pack => pack.quantity > 0).map(pack => pack.packSize)
        ))],
        stockSettings: {
            trackInventory: true,
            allowBackorders: false,
            globalLowStockThreshold: 10
        }
    };

    return updatedProduct;
}

// Helper function to get color codes (basic mapping)
function getColorCode(colorName) {
    const colorMap = {
        'red': '#FF0000',
        'blue': '#0000FF',
        'green': '#008000',
        'black': '#000000',
        'white': '#FFFFFF',
        'yellow': '#FFFF00',
        'orange': '#FFA500',
        'purple': '#800080',
        'pink': '#FFC0CB',
        'brown': '#A52A2A',
        'gray': '#808080',
        'grey': '#808080',
        'navy': '#000080',
        'maroon': '#800000',
        'olive': '#808000',
        'lime': '#00FF00',
        'aqua': '#00FFFF',
        'teal': '#008080',
        'silver': '#C0C0C0',
        'fuchsia': '#FF00FF'
    };

    const normalizedColor = colorName.toLowerCase();
    return colorMap[normalizedColor] || '#666666'; // Default gray
}

// Get available stock for a specific variant-packSize combination
export function getAvailableStock(product, variantName, packSize) {
    if (!hasNewInventorySystem(product)) {
        // Fallback for old system
        return product.stock || 0;
    }

    const variantData = product.inventory.find(item =>
        item.variant.name.toLowerCase() === variantName.toLowerCase()
    );

    if (!variantData) {
        return 0;
    }

    const packData = variantData.packStock.find(item => item.packSize === packSize);
    return packData ? packData.quantity : 0;
}

// Update stock for a specific variant-packSize combination
export async function updateStock(productId, variantName, packSize, newQuantity) {
    await connectDB();

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }

    // Ensure product has new inventory system
    if (!hasNewInventorySystem(product)) {
        const migratedProduct = migrateProductToNewInventory(product);
        await Product.findByIdAndUpdate(productId, migratedProduct);
        product.inventory = migratedProduct.inventory;
    }

    // Find and update the specific variant-packSize combination
    const variantData = product.inventory.find(item =>
        item.variant.name.toLowerCase() === variantName.toLowerCase()
    );

    if (!variantData) {
        throw new Error(`Variant '${variantName}' not found`);
    }

    const packData = variantData.packStock.find(item => item.packSize === packSize);
    if (!packData) {
        throw new Error(`Pack size '${packSize}' not found for variant '${variantName}'`);
    }

    // Update the quantity
    packData.quantity = Math.max(0, parseInt(newQuantity));
    packData.lastRestocked = new Date();

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

    await product.save();
    return product;
}

// Get low stock alerts for a product
export function getLowStockAlerts(product) {
    if (!hasNewInventorySystem(product)) {
        if (product.stock <= (product.stockSettings?.globalLowStockThreshold || 10)) {
            return [{
                type: 'product',
                message: `Product "${product.name}" has low stock: ${product.stock} remaining`,
                quantity: product.stock
            }];
        }
        return [];
    }

    const alerts = [];

    product.inventory.forEach(variantData => {
        variantData.packStock.forEach(packData => {
            if (packData.quantity <= packData.lowStockThreshold) {
                alerts.push({
                    type: 'variant',
                    variant: variantData.variant.name,
                    packSize: packData.packSize,
                    quantity: packData.quantity,
                    threshold: packData.lowStockThreshold,
                    message: `${variantData.variant.name} ${packData.packSize}: ${packData.quantity} left`
                });
            }
        });
    });

    return alerts;
}

// Validate cart item stock availability
export function validateCartItemStock(product, variantName, packSize, requestedQuantity) {
    const availableStock = getAvailableStock(product, variantName, packSize);

    return {
        isAvailable: availableStock >= requestedQuantity,
        availableStock,
        requestedQuantity,
        canPartialFulfill: availableStock > 0 && availableStock < requestedQuantity,
        message: availableStock >= requestedQuantity
            ? 'In Stock'
            : availableStock > 0
                ? `Only ${availableStock} available`
                : 'Out of Stock'
    };
}