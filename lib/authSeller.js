import { clerkClient } from '@clerk/nextjs/server';

const authSeller = async (userId) => {
    try {
        if (!userId) {
            throw new Error("No userId provided");
        }

        const client = await clerkClient();
        const user = await client.users.getUser(userId);

        if (!user) {
            throw new Error("User not found");
        }

        // Allow access only if role is 'seller' or 'admin'
        const role = user.publicMetadata?.role;
        return role === 'seller' || role === 'admin';

    } catch (error) {
        console.error("Error in authSeller:", error);
        throw error;
    }
}

export default authSeller;