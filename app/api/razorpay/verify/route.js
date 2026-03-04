import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ success: false, message: 'Missing payment details' }, { status: 400 });
        }

        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keySecret) {
            return NextResponse.json({ success: false, message: 'Payment gateway not configured' }, { status: 500 });
        }

        // Verify signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', keySecret)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: 'Payment verified successfully' });
    } catch (error) {
        console.error('Razorpay verify error:', error);
        return NextResponse.json({ success: false, message: error.message || 'Verification failed' }, { status: 500 });
    }
}
