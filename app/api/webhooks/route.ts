import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import connect from '@/app/lib/connect'
import User from '@/app/Models/UserSchema'

export async function POST(req: NextRequest) {
  try {
    const headerPayload = headers()
    const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET

    const evt = await verifyWebhook(req, {
      signingSecret: secret || '',
    })

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    if (evt.type === 'user.created') {
      const {id , email_addresses} = evt.data;

      const newUser = {
        clerkUserId: id,
        emailAddress: email_addresses[0].email_address,
      };

      try {
        await connect();
        await User.create(newUser);
        console.log("user created");
      }catch (error) {}

    }
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}