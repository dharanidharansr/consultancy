import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "user" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    brand: { type: String, required: true },

    // Enhanced inventory system for grocery shop
    inventory: [{
        variant: {
            name: { type: String, required: true },    // "500g", "1kg", "250ml", etc.
            code: { type: String, required: true },    // Display code for UI
            image: { type: String }                    // Optional: variant-specific image
        },
        packStock: [{
            packSize: { type: String, required: true },    // "Unit", "Pack", "500g", "1kg", "Bundle", "Box"
            quantity: { type: Number, default: 0 },        // Available stock
            lowStockThreshold: { type: Number, default: 5 }, // Alert threshold
            lastRestocked: { type: Date, default: Date.now }
        }]
    }],

    // Computed fields for quick access
    totalStock: { type: Number, default: 0 },
    availableVariants: [{ type: String }],
    availablePackSizes: { type: [String], default: [] },

    // Stock settings
    stockSettings: {
        trackInventory: { type: Boolean, default: true },
        allowBackorders: { type: Boolean, default: false },
        globalLowStockThreshold: { type: Number, default: 10 }
    },

    date: { type: Number, required: true }
})
// Force model recompilation to apply schema changes
if (mongoose.models.product) {
    delete mongoose.models.product;
}
const Product = mongoose.model('product', productSchema);

export default Product;