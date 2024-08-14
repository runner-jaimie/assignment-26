"use server";

import db from "../../lib/db";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z
    .string()
    .min(1, "Tweet cannot be empty")
    .max(280, "Tweet is too long"),
});

export async function addTweet(prevState: any, formData: FormData) {
  const tweet = formData.get("tweet");

  const result = tweetSchema.safeParse({ tweet });

  if (!result.success) {
    return { message: `Error: ${result.error.errors[0].message}` };
  }

  const createdTweet = await db.tweet.create({
    data: {
      tweet: result.data.tweet,
      userId: 1,
    },
  });

  if (createdTweet) {
    return { message: "Tweet posted successfully!" };
  } else {
    return { message: "Error: Failed to post tweet" };
  }
}
