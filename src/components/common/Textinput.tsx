import type { ChangeEvent } from "react";

interface TextInputInterface{
  placeholder?: string;
  type?: string;
  value?: string;
  error?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Textinput = (props: TextInputInterface) => {
    const {placeholder, type, value, error, name, onChange} =  props;
  if (
    type === "textarea"
  ) {
    return (<textarea
      className="border w-full text-sm text-gray-600 border-[#D1D5DB] p-3 focus:outline-none rounded-lg resize-none"
      placeholder={placeholder}
      rows={4}
    />)
  }
  return (
    <>
      <input name={name} onChange={onChange} className="border w-full text-sm text-gray-600 border-[#D1D5DB] p-3 focus:outline-none rounded-lg" type={type} placeholder={placeholder} value={value} />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </>
  )
}
export default Textinput
