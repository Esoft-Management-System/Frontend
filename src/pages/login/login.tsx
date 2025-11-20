import Textinput from "../../components/common/Textinput";

const Login = () => {
	return (
		<div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
			<div className="flex w-[337px] md:w-[414px] flex-col p-2.5">
				<div className="bg-[#FFFFFF] flex-1 flex flex-col gap-3 p-[15px] md:p-8 rounded-xl shadow-sm place-items-start">
					<p className="text-[20px] font-semibold text-[#111827] flex-1">Student</p>
					<p className="text-[14px] font-normal text-[#6B7280] flex-1">Sign in your account</p>
					<div className="flex flex-col w-full flex-1 gap-2.5">
						<Textinput placeholder="E-number" type="text"/>
						<Textinput placeholder="Password" type="password"/>
					</div>
					<div className="w-full flex-1 flex flex-row gap-2.5">
						<div className="flex flex-row gap-2.5 justify-center items-center">
							<input type="checkbox" className="w-4 h-4 border-[#D1D5DB]" />
							<p className="text-[#6B7280] text-[12px]">remember password?</p>
						</div>
						<div className="flex flex-row gap-2.5 justify-end items-end flex-1">
							<p className="text-[#1A73E8] text-[14px] underline hover:cursor-pointer">forgot password?</p>
						</div>
					</div>
					<button className="py-4 px-2 md:py-4 md:px-3.5 bg-[#1A73E8] w-full rounded-[10px] text-white font-semibold hover:cursor-pointer">
						Sign in
					</button>
					<div className="flex flex-col items-center justify-center w-full">
						<p className="text-[#6B7280] font-normal text-[12px]">Don’t have an account? <span className="text-[#1A73E8] hover:cursor-pointer">Create account</span></p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;
