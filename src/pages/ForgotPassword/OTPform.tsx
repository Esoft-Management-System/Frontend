import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OtpInput from "../../components/common/OtpInput";
import BlueButton from "../../components/common/BlueButton";

const OTPform = () => {
	const navigate = useNavigate();
	const [otp, setOtp] = useState("");
	const isComplete = otp.length === 6;
	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 overflow-x-hidden">

				<div className="flex w-full max-w-md p-6">

					<div className="w-full bg-white p-8 flex flex-col gap-4 shadow-lg rounded-2xl items-center justify-center border border-gray-100">

						<p className="text-2xl font-semibold text-gray-900">Enter verification code</p>
						<p className="text-sm text-gray-600">we’ve sent a code to <span className="font-semibold">harishanth08@gmail.com</span></p>

						<OtpInput otpLength={6} onOtpChange={(val) => setOtp(val)} />

						<div className="w-full p-2.5 flex flex-row items-center justify-center">

							<p className="text-sm text-gray-600">Didn’t get a code? <span className="font-semibold text-black hover:cursor-pointer">Click to resend.</span></p>

						</div>

						<div className="flex flex-row w-full gap-3">
							<button
								onClick={() => navigate("/")}
								className="py-3.5 px-6 w-full rounded-xl text-gray-700 font-semibold bg-white hover:bg-gray-50 border border-gray-300 flex items-center justify-center shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
							>
								Cancel
							</button>

							<BlueButton
								onClick={() => navigate("/SetNewPassword")}
								disabled={!isComplete}
								buttonName="Verify"
							/>

						</div>

					</div>

				</div>

			</div>
	);
};

export default OTPform;