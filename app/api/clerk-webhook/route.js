import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";

// Clerk sends webhook events for user lifecycle (created, updated, deleted)
// No signature verification needed for local dev — add svix verification for production
export async function POST(request) {
    try {
        const payload = await request.json();
        const { type, data } = payload;

        await connectDB();

        if (type === "user.created") {
            const { id, first_name, last_name, email_addresses, image_url } = data;
            await User.create({
                _id: id,
                email: email_addresses[0].email_address,
                name: `${first_name || ""} ${last_name || ""}`.trim(),
                imageUrl: image_url,
            });
            console.log("User created via webhook:", id);
        }

        if (type === "user.updated") {
            const { id, first_name, last_name, email_addresses, image_url } = data;
            await User.findByIdAndUpdate(id, {
                email: email_addresses[0].email_address,
                name: `${first_name || ""} ${last_name || ""}`.trim(),
                imageUrl: image_url,
            });
            console.log("User updated via webhook:", id);
        }

        if (type === "user.deleted") {
            const { id } = data;
            await User.findByIdAndDelete(id);
            console.log("User deleted via webhook:", id);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Clerk webhook error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
