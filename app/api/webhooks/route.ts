import connect from "@/app/lib/connect";
import User from "@/app/Models/UserSchema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;
    if (evt.type === "user.created") {
      const {id , email_addresses} = evt.data;

      const newUser = {
        clerkUserId: id,
        email_addresses: email_addresses[0].email_address,
      };

      try {
        await connect();
        await User.create(newUser);
        console.log("user created");
      }catch(error){}
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
