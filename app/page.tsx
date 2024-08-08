"use client";
import {
  EnvelopeIcon,
  UserIcon,
  KeyIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

import FormInput from "../components/form-input";
import FormButton from "../components/form-btn";
import { useFormState } from "react-dom";
import { handleForm, FormState } from "./action";

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
  const [state, action] = useFormState(handleForm, initialState);
  //const { pending } = useFormStatus();
  // 이 hook은 form의 자식 요소에서만 사용되어야 한다.

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium items-center">
        <FireIcon className="h-10 w-10 text-red-400" />
      </div>
      <form action={action} className="flex flex-col items-center gap-3">
        <div className="relative">
          <EnvelopeIcon className=" absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors?.email ?? []}
          />
        </div>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={state?.fieldErrors?.username}
          />
        </div>
        <div className="relative">
          <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            required
            errors={state?.fieldErrors?.password}
            //hasError={state?.errors && state.errors.length > 0}
          />
        </div>
        {/* {state?.errors && <ErrorMessage message={state.errors[0]} />} */}
        {state?.success && <SuccessMessage message={state.message || ""} />}
        {!state.success && <FormButton text="Log in" />}
      </form>
    </div>
  );
}
