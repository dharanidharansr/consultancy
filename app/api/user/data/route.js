import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
        }

        await connectDB();

        let user = await User.findById(userId);

        // Auto-create user in MongoDB if they don't exist yet
        // (replaces the old Inngest clerk/user.created webhook sync)
        if (!user) {
            const clerkUser = await currentUser();
            if (!clerkUser) {
                return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
            }

            const primaryEmail = clerkUser.emailAddresses?.[0]?.emailAddress || '';
            const fullName = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || 'User';

            user = await User.create({
                _id: userId,
                name: fullName,
                email: primaryEmail,
                imageUrl: clerkUser.imageUrl || '',
            });

            console.log('Auto-created user in MongoDB:', userId);
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error('Error in user/data:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}