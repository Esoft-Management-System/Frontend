
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import BlueButton from "../../components/common/BlueButton"
import Textinput from "../../components/common/Textinput"

const ForgotPassword = () => {

  //set navigation
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSendOtp = () => {
    if (!email.trim()) return;
    sessionStorage.setItem("otpEmail", email.trim());
    navigate("/OTPform", { state: { email } });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <div className="flex w-full max-w-md flex-col p-6 gap-2.5">
        <div className="w-full flex flex-col bg-white rounded-2xl p-8 gap-4 shadow-lg border border-gray-100">
          <p className="text-2xl font-semibold text-gray-900">Forgot Password</p>
          <p className="text-sm text-gray-600">Reset your password here</p>
          <Textinput
            labelText="Email"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <BlueButton onClick={handleSendOtp} buttonName="Send OTP"/>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
