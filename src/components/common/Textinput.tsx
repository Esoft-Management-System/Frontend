interface TextInputInterface{
  placeholder?: string;
  type?: string;
  value?: string;
  error?: string;
}

const Textinput = (props: TextInputInterface) => {
  const {placeholder, type, value, error} =  props;
  return (
    <>
      <input className="border w-full text-sm text-gray-600 border-[#D1D5DB] p-3 focus:outline-none rounded-lg" type={type} placeholder={placeholder} value={value} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  )
}
export default Textinput
