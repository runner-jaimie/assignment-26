"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addTweet } from "../app/add-tweet/action";
import Input from "./input";
import Button from "./button";

const initialState = {
  message: "",
};

export default function AddTweet() {
  const [state, formAction] = useFormState(addTweet, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-4">Add a Tweet</h2>
      <form action={formAction} className="flex flex-col items-center gap-3">
        <Input
          name="tweet"
          type="text"
          placeholder="What's happening?"
          required
          errors={state.message ? [state.message] : []}
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
