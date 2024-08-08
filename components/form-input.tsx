interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string;
  hasError?: boolean;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors = [],
  name,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <input
        name={name}
        className="bg-transparent rounded-full w-96 h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-300 focus:ring-gray-500 border-none placeholder:text-neutral-400 pl-10
        "
        type={type}
        placeholder={placeholder}
        required={required}
      />
      <span className="text-red-500 font-medium w-96 ">{errors}</span>
    </div>
  );
}
