
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Orders";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";



export async function POST(request) {
    try {
        await connectDB();

        const auth = await getAuth(request);
        const userId = auth.userId;

        if (!userId) {
            console.error('Authentication failed - no userId found');
            return NextResponse.json({
                success: false,
                message: 'Authentication required. Please make sure you are logged in.'
            }, { status: 401 });
        }

        console.log('Order creation request for user:', userId);

        const { address, items, paymentMethod, paymentStatus } = await request.json();
        console.log('Order Create Debug:', { userId, paymentMethod, paymentStatus });

        // Reject COD orders - only Razorpay allowed
        if (paymentMethod && paymentMethod.toLowerCase() === 'cod') {
            return NextResponse.json({
                success: false,
                message: 'Cash on Delivery is no longer available. Please use online payment (Razorpay).'
            }, { status: 400 });
        }

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' });
        }

        // calculate amount using items (fix async reduce bug)
        let amount = 0;
        // items: [{ product: cartKey, quantity }], cartKey = productId, productId_color, or productId_color_size
        const orderItems = [];
        // Declare user variable for use throughout function
        let user = null;

        for (const item of items) {
            let productKey = item.product;

            // Regular product item processing
            {
                let productId = productKey;
                let color = undefined;
                let size = undefined;
                if (typeof productId === 'string' && productId.includes('_')) {
                    const split = productId.split('_');
                    productId = split[0];
                    if (split.length === 3) {
                        color = split[1];
                        size = split[2];
                    } else if (split.length === 2) {
                        // Could be color or size
                        // Try to match color format
                        if (split[1].startsWith('#') || split[1].length === 7) {
                            color = split[1];
                        } else {
                            size = split[1];
                        }
                    }
                }
                const product = await Product.findById(productId);
                if (product) {
                    const productTotal = product.offerPrice * item.quantity;
                    amount += productTotal;
                    console.log(`Product pricing: ${product.offerPrice} × ${item.quantity} = ${productTotal}, Running total: ${amount}`);
                    orderItems.push({
                        product: productId,
                        quantity: item.quantity,
                        price: product.offerPrice,
                        color,
                        size
                    });
                } else {
                    console.error(`Product ${productId} not found`);
                }
            }
        }
        await connectDB();
        console.log('Creating order with items:', JSON.stringify(orderItems));
        console.log('Creating order with userId:', userId);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'Cannot create order: userId is required but was not provided'
            });
        }

        const taxAmount = Math.floor(amount * 0.02);
        const finalAmount = amount + taxAmount;

        console.log(`Order amount calculation: Base: ₹${amount}, Tax (2%): ₹${taxAmount}, Final: ₹${finalAmount}`);

        try {
            const orderData = {
                userId: userId.toString(), // Ensure it's a string
                address,
                items: orderItems,
                amount: finalAmount,
                paymentMethod: paymentMethod || 'COD',
                paymentStatus: paymentStatus || 'Pending',
                date: Math.floor(Date.now() / 1000) // Convert milliseconds to seconds for Unix timestamp
            };

            console.log('Order data for creation:', orderData);
            const newOrder = await Order.create(orderData);
            console.log('Order created successfully with ID:', newOrder._id);
        } catch (orderError) {
            console.error('Order creation failed:', orderError);
            return NextResponse.json({
                success: false,
                message: `Order creation failed: ${orderError.message}`,
                details: orderError.errors ? JSON.stringify(orderError.errors) : null
            });
        }

        // clear user cart
        try {
            if (!user) {
                // If user wasn't fetched earlier, fetch now
                user = await User.findById(userId);
            }

            if (user) {
                user.cartItems = {};
                await user.save();
                console.log('User cart cleared successfully');
            } else {
                console.log(`User with ID ${userId} not found for cart clearing`);
            }
        } catch (cartError) {
            console.error('Error clearing user cart:', cartError);
            // Continue anyway, since the order was already created
        }

        return NextResponse.json({ success: true, message: 'Order Placed' });

    } catch (error) {
        console.error('Order creation error:', error);
        // Return more detailed error information
        return NextResponse.json({
            success: false,
            message: error.message || 'An unexpected error occurred during order creation',
            details: error.errors ? JSON.stringify(error.errors) : null
        }, { status: 500 });
    }
}