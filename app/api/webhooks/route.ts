import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import connect from '@/app/lib/connect'
import User from '@/app/Models/UserSchema'

export async function POST(req: NextRequest) {
  console.log("🔥 Webhook POST handler called")
  
  try {
    const evt = await verifyWebhook(req)
    console.log("✅ Webhook verified successfully")
    console.log("📋 Event type:", evt.type)
    console.log("📋 Event data:", JSON.stringify(evt.data, null, 2))

    if (evt.type === 'user.created') {
      console.log("👤 Processing user.created event")
      
      const { id, email_addresses } = evt.data;
      console.log("🆔 User ID:", id)
      console.log("📧 Email addresses:", email_addresses)

      const newUser = {
        clerkUserId: id,
        emailAddress: email_addresses[0].email_address,
      };
      console.log("🔨 New user object:", newUser)

      try {
        console.log("🔌 Attempting to connect to database...")
        await connect();
        console.log("✅ Database connected successfully")
        
        console.log("💾 Attempting to create user...")
        const createdUser = await User.create(newUser);
        console.log("🎉 User created successfully:", createdUser)
        
      } catch (error) {
        console.error("❌ Database error:", error)
        console.error("❌ Error details:", error)
        console.error("❌ Stack trace:", error)
      }
    } else {
      console.log("⏭️ Skipping event type:", evt.type)
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('❌ Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
