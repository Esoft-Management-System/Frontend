interface ButtonInterface{
  buttonName: string
}

const BlueButton = (props: ButtonInterface) => {
  const {buttonName} = props;
  return (
    <button className="py-3 px-2 md:py-3.5 md:px-2.5 bg-[#1A73E8] w-full rounded-[10px] text-white font-semibold hover:cursor-pointer">
      {buttonName}
    </button>
  )
}

export default BlueButton
