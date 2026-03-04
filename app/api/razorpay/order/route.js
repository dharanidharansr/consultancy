import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
    try {
        const { amount, currency = 'INR' } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ success: false, message: 'Invalid amount' }, { status: 400 });
        }

        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            console.error('Razorpay keys not configured');
            return NextResponse.json({ success: false, message: 'Payment gateway not configured' }, { status: 500 });
        }

        const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // convert to paise
            currency,
            receipt: `receipt_${crypto.randomBytes(8).toString('hex')}`,
        });

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        return NextResponse.json({ success: false, message: error.message || 'Failed to create order' }, { status: 500 });
    }
}
