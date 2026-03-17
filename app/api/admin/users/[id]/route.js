import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function PATCH(request, { params }) {
    try {
        const { userId } = await getAuth(request);
        const { id } = await params;

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'Authentication required'
            }, { status: 401 });
        }

        const body = await request.json();
        const { role } = body;

        if (!['customer', 'admin'].includes(role)) {
            return NextResponse.json({
                success: false,
                message: 'Invalid role. Must be customer or admin'
            }, { status: 400 });
        }

        // Update Clerk — the only real store for publicMetadata.role
        const client = await clerkClient();
        const updatedUser = await client.users.updateUser(id, {
            publicMetadata: { role }
        });

        return NextResponse.json({
            success: true,
            message: 'User role updated successfully',
            user: {
                _id: updatedUser.id,
                name: `${updatedUser.firstName || ''} ${updatedUser.lastName || ''}`.trim(),
                email: updatedUser.emailAddresses[0]?.emailAddress || '',
                role
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to update user: ' + error.message
        }, { status: 500 });
    }
}
