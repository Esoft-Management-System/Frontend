
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import BlueButton from "../../components/common/BlueButton"
import Textinput from "../../components/common/Textinput"
import { staffService } from "../../services/staff.service"
import { toast } from "react-toastify"

const ForgotPassword = () => {

  //set navigation
  const navigate = useNavigate();
  const location = useLocation();
  const initialRole = (location.state as { role?: string } | null)?.role || "student";
  const [email, setEmail] = useState("");
  const [role] = useState(initialRole);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      const res = await staffService.requestForgotPassword(email.trim(), role);
      const data = (res as any)?.data;
      if (data?.forgotSessionToken) {
        sessionStorage.setItem("forgotSessionToken", data.forgotSessionToken);
      }
      sessionStorage.setItem("forgotRole", role);
      sessionStorage.setItem("otpEmail", email.trim());
      toast.success(data?.message ?? "Verification code sent to your email");
      navigate("/OTPform", { state: { email: email.trim(), flow: "forgot" } });
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? "Failed to send code";
      const display = Array.isArray(message) ? message[0] : message;
      toast.error(display);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <div className="flex w-full max-w-md flex-col p-6 gap-2.5">
        <div className="w-full flex flex-col bg-white rounded-2xl p-8 gap-4 shadow-lg border border-gray-100">
          <p className="text-2xl font-semibold text-gray-900">Forgot Password</p>
          <p className="text-sm text-gray-600">Reset your password here</p>
          <Textinput
            labelText={`Email (${role})`}
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <BlueButton onClick={handleSendOtp} buttonName="Send OTP" loading={loading} disabled={loading}/>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
