import { getAuth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";

export async function GET(request) {
    try {
        await connectDB();
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'Authentication required'
            }, { status: 401 });
        }

        // Find user, auto-create if not in MongoDB yet
        let user = await User.findById(userId);
        if (!user) {
            const clerkUser = await currentUser();
            if (clerkUser) {
                user = await User.create({
                    _id: userId,
                    name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || 'User',
                    email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
                    imageUrl: clerkUser.imageUrl || '',
                });
            } else {
                return NextResponse.json({ success: true, notifications: [] });
            }
        }

        // Return user's stock notifications
        return NextResponse.json({
            success: true,
            notifications: user.stockNotifications || []
        });
    } catch (error) {
        console.error('Error fetching stock notifications:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch stock notifications'
        }, { status: 500 });
    }
}