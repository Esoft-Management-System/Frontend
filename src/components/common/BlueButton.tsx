interface ButtonInterface{
  buttonName: string
}

const BlueButton = (props: ButtonInterface) => {
  const {buttonName} = props;
  return (
    <button className="py-4 px-2 md:py-4 md:px-3.5 bg-[#1A73E8] w-full rounded-[10px] text-white font-semibold hover:cursor-pointer">
      {buttonName}
    </button>
  )
}

export default BlueButton
