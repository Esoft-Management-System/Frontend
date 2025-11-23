
import { useNavigate } from "react-router-dom"
import BlueButton from "../../components/common/BlueButton"
import Textinput from "../../components/common/Textinput"

const ForgotPassword = () => {

  //set navigation
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
      <div className="flex min-w-[337px]  flex-col md:w-[409px] p-2.5 gap-2.5">
        <div className="w-full flex flex-col bg-white rounded-xl p-3.5 md:p-9 gap-3">
          <p className="text-[20px] font-semibold text-[#111827] flex-1">Forgot Password</p>
          <p className="text-[14px] font-normal text-[#6B7280] flex-1">Reset your password here</p>
          <Textinput placeholder="Email" type="text" />
          <BlueButton onClick={() => navigate("/OTPform")} buttonName="Send OTP"/>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
