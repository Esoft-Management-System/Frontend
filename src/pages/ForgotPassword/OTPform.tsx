import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import OtpInput from "../../components/common/OtpInput";
import BlueButton from "../../components/common/BlueButton";
import { STAFF_DATA_KEY, STUDENT_DATA_KEY } from "../../services/api-request";
import { staffService } from "../../services/staff.service";
import { toast } from "react-toastify";

const OTPform = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [otp, setOtp] = useState("");
	const isComplete = otp.length === 6;
	const [sending, setSending] = useState(false);
	const [verifying, setVerifying] = useState(false);

	const emailFromState = (location.state as { email?: string } | null)?.email;
	const emailFromOtpStorage = sessionStorage.getItem("otpEmail") || "";
	const tempToken = sessionStorage.getItem("staffTemporaryToken") || "";
	const storedStaff = useMemo(() => {
		const raw = sessionStorage.getItem(STAFF_DATA_KEY) || localStorage.getItem(STAFF_DATA_KEY);
		return raw ? JSON.parse(raw) : null;
	}, []);

	const storedStudent = useMemo(() => {
		const raw = sessionStorage.getItem(STUDENT_DATA_KEY) || localStorage.getItem(STUDENT_DATA_KEY);
		return raw ? JSON.parse(raw) : null;
	}, []);

	const resolvedEmail = emailFromState
		|| emailFromOtpStorage
		|| storedStaff?.email
		|| storedStaff?.emailAddress
		|| storedStudent?.email
		|| storedStudent?.emailAddress
		|| "your email";

	const sendOtp = async () => {
		if (!tempToken || sending) return;
		try {
			setSending(true);
			const res = await staffService.sendTempPasswordCode(tempToken);
			toast.success((res as any)?.data?.message ?? "OTP sent");
		} catch (err: any) {
			const message = err?.response?.data?.message ?? err?.message ?? "Failed to send code";
			toast.error(message);
		} finally {
			setSending(false);
		}
	};

	const handleVerify = async () => {
		if (!tempToken || !isComplete || verifying) return;
		try {
			setVerifying(true);
			const res = await staffService.verifyTempPasswordCode(tempToken, otp);
			const resetToken = (res as any)?.data?.resetToken as string | undefined;
			if (resetToken) {
				sessionStorage.setItem("staffResetToken", resetToken);
				toast.success("Code verified. Please set a new password.");
				navigate("/SetNewPassword");
			} else {
				toast.error("Missing reset token from server.");
			}
		} catch (err: any) {
			const message = err?.response?.data?.message ?? err?.message ?? "Verification failed";
			toast.error(message);
		} finally {
			setVerifying(false);
		}
	};

	useEffect(() => {
		if (tempToken) {
			sendOtp();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tempToken]);
	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 overflow-x-hidden">

				<div className="flex w-full max-w-md p-6">

					<div className="w-full bg-white p-8 flex flex-col gap-4 shadow-lg rounded-2xl items-center justify-center border border-gray-100">

						<p className="text-2xl font-semibold text-gray-900">Enter verification code</p>
						<p className="text-sm text-gray-600">we’ve sent a code to <span className="font-semibold">{resolvedEmail}</span></p>

						<OtpInput otpLength={6} onOtpChange={(val) => setOtp(val)} />

						<div className="w-full p-2.5 flex flex-row items-center justify-center">

							<p className="text-sm text-gray-600">Didn’t get a code? <button
								type="button"
								onClick={sendOtp}
								disabled={sending || !tempToken}
								className={`font-semibold hover:cursor-pointer ${sending ? "text-gray-400" : "text-black"}`}
							>
								{sending ? "Sending..." : "Click to resend"}
							</button></p>

						</div>

						<div className="flex flex-row w-full gap-3">
							<button
								onClick={() => navigate("/")}
								className="py-3.5 px-6 w-full rounded-xl text-gray-700 font-semibold bg-white hover:bg-gray-50 border border-gray-300 flex items-center justify-center shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
							>
								Cancel
							</button>

							<BlueButton
								onClick={handleVerify}
								disabled={!isComplete || verifying}
								loading={verifying}
								buttonName="Verify"
							/>

						</div>

					</div>

				</div>

			</div>
	);
};

export default OTPform;