"use client";
import {
  EnvelopeIcon,
  UserIcon,
  KeyIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

import Input from "../../components/input";
import Button from "../../components/button";
import { useFormState } from "react-dom";
import { createAccout } from "./action";
import Link from "next/link";

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

export default function Login() {
  const [state, action] = useFormState(createAccout, null);
  //const { pending } = useFormStatus();
  // 이 hook은 form의 자식 요소에서만 사용되어야 한다.

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
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
          <UserIcon className="absolute left-3 top-[10px] h-5 w-5 text-gray-400 pointer-events-none" />
          <Input
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={state?.fieldErrors?.username}
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
            //hasError={state?.errors && state.errors.length > 0}
          />
        </div>
        <div className="relative">
          <KeyIcon className="absolute left-3 top-[10px] h-5 w-5 text-gray-400 pointer-events-none" />
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            errors={state?.fieldErrors?.password}
          />
        </div>
        <Button text="Create Account" />
      </form>
    </div>
  );
}
