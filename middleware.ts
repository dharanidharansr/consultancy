import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isOwnerRoute = createRouteMatcher(['/owner(.*)']);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    if (isOwnerRoute(req)) {
        // Must be signed in
        if (!userId) {
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }

        // Must have admin or seller role
        try {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            const role = user?.publicMetadata?.role;

            if (role !== 'admin' && role !== 'seller') {
                return NextResponse.redirect(new URL('/', req.url));
            }
        } catch {
            // If Clerk API fails, deny access to be safe
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};