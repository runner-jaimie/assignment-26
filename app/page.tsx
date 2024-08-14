"use client";
import { EnvelopeIcon, KeyIcon, FireIcon } from "@heroicons/react/24/solid";

import Input from "../components/input";
import Button from "../components/button";
import { useFormState } from "react-dom";
import { FormState, logIn } from "./action";
import Link from "next/link";
import AddTweet from "../components/add-tweet";

interface MessasgeProps {
  message: string;
}
const SuccessMessage = ({ message }: MessasgeProps) => (
  <div className="w-96 h-10  pl-3 pr-3 py-2 rounded-full bg-green-600 text-blck text-center">
    {message}
  </div>
);

const ErrorMessage = ({ message }: MessasgeProps) => (
  <div className="w-96 text-red-500">{message}</div>
);

const initialState: FormState = {
  success: false,
};

export default function Login() {
  const [state, action] = useFormState(logIn, initialState);
  //const { pending } = useFormStatus();
  // 이 hook은 form의 자식 요소에서만 사용되어야 한다.

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <AddTweet />
      <div className="flex flex-col gap-2 *:font-medium items-center">
        <FireIcon className="h-10 w-10 text-red-400" />
      </div>
      <form action={action} className="flex flex-col items-center gap-3">
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-[10px] h-5 w-5 text-gray-400 pointer-events-none z-10" />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors?.email ?? []}
          />
        </div>
        <div className="relative">
          <KeyIcon className="absolute left-3 top-[10px] h-5 w-5 text-gray-400 pointer-events-none" />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            errors={state?.fieldErrors?.password}
          />
        </div>
        {state?.success && <SuccessMessage message={state.message || ""} />}
        {!state.success && <Button text="Log in" />}
        <Link href="/create-account">
          <Button text="Create Account" />
        </Link>
      </form>
    </div>
  );
}
