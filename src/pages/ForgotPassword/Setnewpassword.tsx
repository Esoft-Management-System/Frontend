import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Textinput from "../../components/common/Textinput";
import BlueButton from "../../components/common/BlueButton";
import { staffService } from "../../services/staff.service";
import { toast } from "react-toastify";

const SetNewPassword = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({ newPassword: "", confirmNewPassword: "" });
	const { staffResetToken, forgotResetToken, forgotRole } = useMemo(
		() => ({
			staffResetToken: sessionStorage.getItem("staffResetToken") || "",
			forgotResetToken: sessionStorage.getItem("forgotResetToken") || "",
			forgotRole: sessionStorage.getItem("forgotRole") || "student"
		}),
		[]
	);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!staffResetToken && !forgotResetToken) {
			navigate("/OTPform");
		}
	}, [navigate, staffResetToken, forgotResetToken]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async () => {
		if (!staffResetToken && !forgotResetToken) {
			toast.error("Missing reset token. Please verify code again.");
			navigate("/OTPform");
			return;
		}
		if (!form.newPassword.trim() || !form.confirmNewPassword.trim()) {
			toast.error("Please fill both password fields.");
			return;
		}
		if (form.newPassword !== form.confirmNewPassword) {
			toast.error("Passwords do not match.");
			return;
		}
		try {
			setSubmitting(true);
			if (forgotResetToken) {
				await staffService.resetForgotPassword(forgotResetToken, form.newPassword, form.confirmNewPassword);
				toast.success("Password reset successfully.");
				sessionStorage.removeItem("forgotResetToken");
				sessionStorage.removeItem("forgotSessionToken");
				sessionStorage.removeItem("forgotRole");
				sessionStorage.removeItem("otpEmail");
				navigate(forgotRole === "staff" ? "/staff" : "/");
				return;
			}

			await staffService.setTempPassword(staffResetToken, form.newPassword, form.confirmNewPassword);
			toast.success("Password updated. Please log in.");
			sessionStorage.removeItem("staffResetToken");
			sessionStorage.removeItem("staffTemporaryToken");
			sessionStorage.removeItem("otpEmail");
			navigate("/");
		} catch (err: any) {
			const message = err?.response?.data?.message ?? err?.message ?? "Failed to set new password";
			toast.error(message);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 overflow-x-hidden">
			<div className="flex w-full max-w-md flex-col p-6">
				<div className="bg-white flex-1 flex flex-col gap-6 p-8 rounded-2xl shadow-lg border border-gray-100 items-center">
					<div className="text-center mb-2">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">Set New Password</h1>
						<p className="text-sm text-gray-600">must be at least 6 characters</p>
					</div>
					<div className="flex flex-col w-full gap-4">
						<Textinput
							labelText="New Password"
							placeholder="New Password"
							type="password"
							name="newPassword"
							value={form.newPassword}
							onChange={handleChange}
						/>
						<Textinput
							labelText="Confirm Password"
							placeholder="Confirm Password"
							type="password"
							name="confirmNewPassword"
							value={form.confirmNewPassword}
							onChange={handleChange}
						/>
					</div>
					<BlueButton buttonName="Set Password" onClick={handleSubmit} loading={submitting} disabled={submitting} />
					<div className="flex flex-col items-center justify-center w-full">
						<p className="text-gray-600 text-sm">Back to log in? <span onClick={() => navigate("/")} className="text-blue-600 hover:cursor-pointer font-semibold">Click here</span></p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SetNewPassword;