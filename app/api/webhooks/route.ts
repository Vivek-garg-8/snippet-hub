import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { clerkClient } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
import connect from '@/app/lib/connect'
import User from '@/app/Models/UserSchema'

export async function POST(req: NextRequest) {
  console.log("🔥 Webhook POST handler called")
  
  try {
    const evt = await verifyWebhook(req)
    console.log("✅ Webhook verified successfully")
    console.log("📋 Event type:", evt.type)

    // Handle both user.created and session.created events
    if (evt.type === 'user.created' || evt.type === 'session.created') {
      console.log(`👤 Processing ${evt.type} event`)
      
      let userId, userEmail;
      
      if (evt.type === 'user.created') {
        // Direct user creation event
        userId = evt.data.id;
        userEmail = evt.data.email_addresses[0]?.email_address;
      } else if (evt.type === 'session.created') {
        // Session created - fetch user data from Clerk
        userId = evt.data.user_id;
        console.log("🔍 Fetching user data for ID:", userId);
        
        try {
          // Await clerkClient first, then call users.getUser
          const clerk = await clerkClient();
          const user = await clerk.users.getUser(userId);
          userEmail = user.emailAddresses[0]?.emailAddress;
          console.log("📧 Fetched user email:", userEmail);
        } catch (error) {
          console.error("❌ Error fetching user from Clerk:", error);
          return new Response('Error fetching user data', { status: 500 });
        }
      }

      if (userId && userEmail) {
        try {
          console.log("🔌 Connecting to database...")
          await connect();
          
          // Check if user already exists to avoid duplicates
          const existingUser = await User.findOne({ clerkUserId: userId });
          if (existingUser) {
            console.log("👤 User already exists in database");
            return new Response('User already exists', { status: 200 });
          }
          
          const newUser = {
            clerkUserId: userId,
            emailAddress: userEmail,
          };
          
          console.log("💾 Creating new user:", newUser);
          const createdUser = await User.create(newUser);
          console.log("🎉 User created successfully:", createdUser);
          
        } catch (error) {
          console.error("❌ Database error:", error);
          return new Response('Database error', { status: 500 });
        }
      } else {
        console.error("❌ Missing userId or userEmail");
        return new Response('Missing user data', { status: 400 });
      }
    } else {
      console.log("⏭️ Skipping event type:", evt.type);
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('❌ Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
