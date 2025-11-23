interface TextInputInterface {
  placeholder?: string;
  type?: string;
  value?: string;
}

const Textinput = (props: TextInputInterface) => {
  const { placeholder, type, value } = props;
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
    <input className="border w-full text-sm text-gray-600 border-[#D1D5DB] p-3 focus:outline-none rounded-lg" type={type} placeholder={placeholder} value={value} />
  )
}
export default Textinput
