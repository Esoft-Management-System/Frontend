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
  const { placeholder, type, value, error, name, onChange, disbled, disabled,labelText } = props;
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
    <div>
      {labelText && <label className="text-[#6B7280] font-normal text-[14px] pb-2 flex-colum gap-1">{labelText}</label>}
      <input name={name} onChange={onChange} className="border w-full text-sm text-gray-600 border-[#D1D5DB] p-3 focus:outline-none rounded-lg" type={type} placeholder={placeholder} value={value} disabled={disbled || disabled} />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
export default Textinput
