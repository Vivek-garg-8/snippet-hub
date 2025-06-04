import connect from "@/app/lib/connect";
import User from "@/app/Models/UserSchema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    if (evt.type === "user.created") {
      const { id, email_addresses } = evt.data;

      const primary = Array.isArray(email_addresses) && email_addresses.length > 0
        ? email_addresses[0].email_address
        : null;

      const newUser = {
        clerkUserId: id,
        emailAddress: primary, 
      };

      try {
        await connect();
        await User.create(newUser);
        console.log("user created");
      } catch (error) {
        console.error("Failed to create user:", error);
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
