import type { ChangeEvent } from "react";

interface TextInputInterface {
  labelText?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  error?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disbled?: boolean;
  disabled?: boolean;
}

const Textinput = (props: TextInputInterface) => {
  const {
    placeholder,
    type,
    value,
    error,
    name,
    onChange,
    disbled,
    disabled,
    labelText
  } = props;

  const isDisabled = disbled || disabled;


  //ragavi here i gonna change the text area part
  if (type === "textarea") {
    return (
      <div className="flex flex-col gap-2 w-full">
        {labelText && (
          <label className="text-gray-700 text-sm font-semibold mb-1">
            {labelText}
          </label>
        )}
        <textarea
          name={name}
          onChange={(e: any) => onChange?.(e)}
          value={value}
          className="border w-full text-sm text-gray-800 border-gray-300 
            px-4 py-3 rounded-lg focus:outline-none transition-all duration-200
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            placeholder-gray-400 resize-none shadow-sm"
          placeholder={placeholder}
          rows={4}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {labelText && (
        <label className="text-gray-700 text-sm font-semibold mb-1">
          {labelText}
        </label>
      )}

      <input
        name={name}
        onChange={onChange}
        type={type}
        value={value}
        disabled={isDisabled}
        placeholder={placeholder}
        className={`border w-full text-sm text-gray-800 border-gray-300 
          px-4 py-3 rounded-lg focus:outline-none transition-all duration-200
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          placeholder-gray-400 shadow-sm
          ${isDisabled
            ? "bg-gray-100 cursor-not-allowed opacity-60"
            : "bg-white hover:border-gray-400"}`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Textinput;