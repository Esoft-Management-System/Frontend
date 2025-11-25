import { useNavigate } from "react-router-dom";
import Textinput from "../../components/common/Textinput";
import BlueButton from "../../components/common/BlueButton";


const StaffLogin = () => {
	const navigate = useNavigate();

	const goToResetPassword = () => {
		navigate("/forgotpassword");
	}
	return (
		<div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
			<div className="flex w-[337px] md:w-[414px] flex-col p-2.5">
				<div className="bg-[#FFFFFF] flex-1 flex flex-col gap-3 p-[15px] md:p-8 rounded-xl shadow-sm place-items-start">
					<div className="flex flex-row w-full gap-2.5 rounded-3xl justify-center items-center p-1  bg-[#1A73E8] text-white">
						<button
							className={`hover:cursor-pointer rounded-3xl w-full md:flex-1 py-2 text-sm font-medium`}
							onClick={() => navigate('/')}
						>
							Student
						</button>
						<button
							className={`hover:cursor-pointer rounded-3xl w-full md:flex-1 py-2 text-sm font-medium  bg-white text-[#374151]`}
						>
							Staff
						</button>
					</div>
					<p className="text-[20px] font-semibold text-[#111827] flex-1">Staff</p>
					<p className="text-[14px] font-normal text-[#6B7280] flex-1">Sign in to your account</p>
					<div className="flex flex-col w-full flex-1 gap-2.5">
						<Textinput placeholder="Staff ID" type="text" />
						<Textinput placeholder="Password" type="password" />
					</div>
					<div className="w-full flex-1 flex flex-row gap-2.5">
						<div className="flex flex-row gap-2.5 justify-center items-center">
							<input type="checkbox" className="hover:cursor-pointer w-4 h-4 border-[#D1D5DB]" />
							<p className="text-[#6B7280] text-[12px]">remember password?</p>
						</div>
						<div className="flex flex-row gap-2.5 justify-end items-end flex-1">
							<p className="text-[#1A73E8] text-[12px] underline hover:cursor-pointer" onClick={goToResetPassword}>forgot password?</p>
						</div>
					</div>
					<BlueButton buttonName="Sign in" />
					<div className="flex flex-col items-center justify-center w-full">
						<p className="text-[#6B7280] font-normal text-[12px]">Don’t have an account? <span onClick={() => navigate("/StaffRequestLogin")} className="text-[#1A73E8] hover:cursor-pointer font-normal">Request Sign in</span></p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StaffLogin;