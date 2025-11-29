import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ChangeEvent } from 'react';
import BlueButton from "../../components/common/BlueButton";
import Textinput from "../../components/common/Textinput";

const StaffLogin = () => {
	const navigate = useNavigate();
	const [isStaff, setIsStaff] = useState(true);
	const [formData, setFormData] = useState({
		staffId: '',
		password: ''
	});
	const [error, setError] = useState<{ staffId?: string; password?: string }>({});
	const [rememberMe, setRememberMe] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setError(prev => ({ ...prev, [name]: '' }));
	}

	const handleSignIn = () => {
		const errs: { [key: string]: string } = {};
		if (!formData.staffId || formData.staffId.trim() === '') errs.staffId = 'Please enter your Staff ID';
		if (!formData.password || formData.password.trim() === '') errs.password = 'Please enter your password';
		setError(errs);
		if (Object.keys(errs).length === 0) {
			console.log('staff sign in', formData);
		}
	}

	const goToResetPassword = () => {
		navigate("/forgotpassword");
	}

	const goToStudent = () => {
		setIsStaff(false);
		navigate('/');
	}

	const goToRequest = () => {
		navigate('/StaffRequestLogin');
	}

	return (
		<div className="min-h-screen w-full flex items-center justify-center from-gray-50 to-gray-100 overflow-x-hidden">
			<div className="flex w-full max-w-md flex-col p-6">
				<div className="bg-white flex-1 flex flex-col gap-6 p-8 rounded-2xl shadow-lg border border-gray-100">
					{/* Header Section */}
					<div className="text-center mb-2">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
						<p className="text-gray-600 text-sm">Sign in to your staff account</p>
					</div>

					{/* Role Selector */}
					<div className="flex w-full gap-1 rounded-2xl p-1 bg-gray-100 border border-gray-200">
						<button
							className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${!isStaff
								? 'bg-white text-gray-900 shadow-sm border border-gray-200'
								: 'text-gray-600 hover:text-gray-800'
								}`}
							onClick={goToStudent}
						>
							Student
						</button>
						<button
							className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isStaff
								? 'bg-white text-gray-900 shadow-sm border border-gray-200'
								: 'text-gray-600 hover:text-gray-800'
								}`}
							onClick={() => setIsStaff(true)}
						>
							Staff
						</button>
					</div>

					{/* Form Section */}
					<div className="flex flex-col w-full gap-4">
						<Textinput
							labelText="Staff ID"
							placeholder="Enter your Staff ID"
							type="text"
							name="staffId"
							value={formData.staffId}
							onChange={handleChange}
							error={error.staffId}
						/>
						<Textinput
							labelText="Password"
							placeholder="Enter your password"
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							error={error.password}
						/>
					</div>

					{/* Remember Me & Forgot Password */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer"
							/>
							<p className="text-gray-700 text-sm font-medium">Remember me</p>
						</div>
						<button
							onClick={goToResetPassword}
							className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-200"
						>
							Forgot password?
						</button>
					</div>

					{/* Sign In Button */}
					<BlueButton
						buttonName="Sign in"
						onClick={handleSignIn}
					/>

					{/* Sign Up Link / Request */}
					<div className="text-center pt-2">
						<p className="text-gray-600 text-sm">
							Don&apos;t have an account?{" "}
							<button
								onClick={goToRequest}
								className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
							>
								Request Sign in
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StaffLogin;