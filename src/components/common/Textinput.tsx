interface TextInputInterface{
  placeholder?: string;
  type?: string;
  value?: string;
}

const Textinput = (props: TextInputInterface) => {
  const {placeholder, type, value} =  props;
  return (
    <input className="border w-full border-[#D1D5DB] p-3 focus:outline-none rounded-lg" type={type} placeholder={placeholder} value={value} />
  )
}
export default Textinput
