import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(request) {
    try {
        const { userId } = await getAuth(request);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'Authentication required'
            }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const roleFilter = searchParams.get('role');

        // Fetch users from Clerk — the only place publicMetadata.role actually lives
        const client = await clerkClient();
        const response = await client.users.getUserList({ limit: 200 });
        const clerkUsers = response.data;

        let users = clerkUsers.map(u => ({
            _id: u.id,
            name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.emailAddresses[0]?.emailAddress || 'N/A',
            email: u.emailAddresses[0]?.emailAddress || 'N/A',
            createdAt: new Date(u.createdAt).toISOString(),
            role: u.publicMetadata?.role || 'customer',
        }));

        if (roleFilter && roleFilter !== 'all') {
            users = users.filter(u => u.role === roleFilter);
        }

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch users'
        }, { status: 500 });
    }
}
