import Textinput from "../../components/common/Textinput";

const Register = () => {
  return(
    <div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
      <div className="flex w-[414px] md:w-[414px] flex-col p-2.5">
        <div className="bg-[#FFFFFF] flex-1 flex flex-col gap-3 p-[15px] md:p-8 rounded-xl shadow-sm place-items-start">
          <p className="text-[20px] font-semibold text-[#111827]">Student Registration</p>
          <p className="text-[14px] font-normal text-[#6B7280]">Student Registration</p>
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-row w-full gap-3">
              <Textinput placeholder="E-Number" type="text"/>
              <Textinput placeholder="Full Name" type="text"/>
            </div>
            <div className="flex flex-row w-full gap-3">
              <Textinput placeholder="Contact Number" type="text"/>
              <Textinput placeholder="Date of Birth" type="text"/>
            </div>
              <Textinput placeholder="NIC" type="text"/>
              <Textinput placeholder="Email" type="email"/>
              <Textinput placeholder="Address" type="text"/>
              <Textinput placeholder="Password" type="Password"/>
              <Textinput placeholder="Confirm Password" type="Password"/>
          </div>
          <button className="py-3 px-3 bg-[#1A73E8] w-full rounded-[10px] text-white font-semibold hover;curser-pointer">
            Sign Up
          </button>
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-[#6B7280] font-normal text-[12px]">Already have an account?{" "}<span className="text-[#1A73E8] hover:cursor-pointer">Sign In</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
