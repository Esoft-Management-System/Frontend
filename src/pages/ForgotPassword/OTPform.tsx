import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OtpInput from "../../components/common/OtpInput";

const OTPform = () => {
	const navigate = useNavigate();
	const [otp, setOtp] = useState("");
	const isComplete = otp.length === 6;
	return (
		<div className="w-screen h-screen bg-[#EFEFEF] flex items-center justify-center">

			<div className="flex flex-row max-w-[409px] p-2.5 gap-2.5">

				<div className="w-full bg-[#FFFFFF] p-8 flex flex-col gap-3 shadow-sm rounded-xl items-center justify-center">

					<p className="text-[20px] font-semibold text-[#111827]">Enter verification code</p>
					<p className="text-[13px] font-normal text-[#6B7280]">we’ve sent a code to <span className="font-semibold">harishanth08@gmail.com</span></p>

					<div className="flex flex-row w-full h-full gap-2.5 items-center justify-center">
						<OtpInput otpLength={6} onOtpChange={(val) => setOtp(val)} />
					</div>

					<div className="w-full p-2.5 flex flex-row items-center justify-center">

						<p className="text-[13px] font-normal text-[#6B7280]">Didn’t get a code? <span className="font-semibold text-black hover:cursor-pointer">Click to resend.</span></p>

					</div>

					<div className="flex flex-row w-full gap-3">

						<button className="flex flex-row w-full rounded-[10px] border border-[#9CA3AF] py-3.5 items-center justify-center font-medium text-[#9CA3AF] text-[16px] hover:cursor-pointer">Cancel</button>
						<button onClick={() => navigate("/SetNewPassword")}
							disabled={!isComplete}
							className={`w-full flex flex-row rounded-[10px] py-3.5 justify-center items-center font-medium text-[16px] ${isComplete ? 'bg-[#1A73E8] text-white hover:cursor-pointer' : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'}`}>
							Verify
						</button>

					</div>

				</div>

			</div>

		</div>
	);
};

export default OTPform;