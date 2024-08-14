"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addTweet } from "./action";
import Input from "../../components/input";
import Button from "../../components/button";

const initialState = {
  message: "",
};

export default function AddTweetPage() {
  const [state, formAction] = useFormState(addTweet, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="w-full max-w-md mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-6">Add a Tweet</h1>
      <form action={formAction} className="flex flex-col items-center gap-3">
        <Input
          name="tweet"
          type="text"
          placeholder="What's happening?"
          required
          errors={[]}
        />
        <Button
          text={pending ? "Posting..." : "Post Tweet"}
          disabled={pending}
        />
        {state.message && (
          <p
            className={
              state.message.startsWith("Error")
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
