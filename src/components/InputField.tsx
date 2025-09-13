import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  as?: "input" | "textarea" | "select";
  options?: { value: string; label: string }[]; // for select
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  required,
  as = "input",
  options,
  onChange,
}) => {
  const inputClass =
    "px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100 shadow-sm hover:shadow-md transition";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 dark:text-gray-300 font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={inputClass}
        />
      ) : as === "select" && options ? (
        <select name={name} value={value} onChange={onChange} className={inputClass}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={inputClass}
        />
      )}
    </div>
  );
};

export default InputField;
