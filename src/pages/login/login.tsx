import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BlueButton from "../../components/common/BlueButton";
import Textinput from "../../components/common/Textinput";


const Login = () => {

	const navigate = useNavigate();
	const [isStaff, setIsStaff] = useState(false); 

	const goToResetPassword = () => {
		navigate("/resetpassword");
	}

	const goToStudentRegister = () => {
		navigate("/studentregister");
	}
 
	return (
		<div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
			<div className="flex w-[337px] md:w-[414px] flex-col p-2.5 gap-2" >				
				<div className="bg-[#FFFFFF] flex-1 flex flex-col gap-3 p-[15px] md:p-8 rounded-xl shadow-sm place-items-start">
					<p className="text-[20px] font-semibold text-[#111827] flex-1">Student</p>
					<p className="text-[14px] font-normal text-[#6B7280] flex-1">Sign in your account</p>
					<div className="flex flex-col w-full flex-1 gap-2.5">
						<Textinput placeholder="E-Number" type="text" />
						<Textinput placeholder="Password" type="password" />
					</div>
					<div className="w-full flex-1 flex flex-row gap-2.5">
						<div className="flex flex-row gap-2.5 justify-center items-center">
							<input type="checkbox" className="hover:cursor-pointer w-4 h-4 border-[#D1D5DB]" />
							<p className="text-[#6B7280] text-[12px]">remember password?</p>
						</div>
						<div className="flex flex-row gap-2.5 justify-end items-end flex-1">
							<p className="text-[#1A73E8] text-[14px] underline hover:cursor-pointer" onClick={goToResetPassword}>forgot password?</p>
						</div>
					</div>
					<BlueButton buttonName="Sign in" />
					<div className="flex flex-col items-center justify-center w-full">
						<p className="text-[#6B7280] font-normal text-[12px]">Don’t have an account? <span onClick={goToStudentRegister} className="text-[#1A73E8] hover:cursor-pointer">Create account</span></p>
					</div>
				</div>
				<div className="bg-[#FFFFFF] flex-1 flex flex-col md:flex-row gap-3  rounded-xl shadow-sm place-items-start hover:cursor-pointer">
					<div className="w-full md:flex-1 p-4 flex items-center justify-center hover:cursor-pointer">
						<div className="w-full flex flex-col md:flex-row rounded-md overflow-hidden border border-[#E5E7EB] hover:cursor-pointer">
							<button
								className={`hover:cursor-pointer flex-1 py-2 text-sm font-medium ${!isStaff ? 'bg-[#1A73E8] text-white' : 'bg-white text-[#374151]'}`}
								onClick={() => setIsStaff(false)}
							>
								Student
							</button>
							<button
								className={` hover:cursor-pointer flex-1 py-2 text-sm font-medium ${isStaff ? 'bg-[#1A73E8] text-white' : 'bg-white text-[#374151]'}`}
								onClick={() => navigate('/staff')}
							>
								Staff
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;
