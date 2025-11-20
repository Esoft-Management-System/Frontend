const Login = () => {
	return (
		<div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
			<div className="flex w-[337px] md:w-[414px] flex-col p-2.5">

				<div className="bg-white flex flex-col gap-4 p-8 rounded-xl shadow-sm">

					<p className="text-[20px] font-semibold text-[#111827]">Student</p>
					<p className="text-[14px] font-normal text-[#6B7280]">Sign in to your account</p>

					<div className="flex flex-col w-full gap-3">
						<input
							className="border w-full border-[#D1D5DB] p-3 rounded-lg focus:outline-hidden"
							type="text"
							placeholder="E-Number"
						/>
						<input
							className="border w-full border-[#D1D5DB] p-3 rounded-lg focus:outline-hidden"
							type="password"
							placeholder="Password"
						/>
					</div>

					<div className="w-full flex justify-between items-center">
						<div className="flex items-center gap-2">
							<input type="checkbox" className="w-4 h-4 border-[#D1D5DB]" />
							<p className="text-[#6B7280] text-[12px]">Remember password?</p>
						</div>
						<p className="text-[#1A73E8] text-[14px] underline cursor-pointer">
							Forgot password?
						</p>
					</div>

					<button className="py-3 bg-[#1A73E8] w-full rounded-[10px] text-white font-semibold cursor-pointer">
						Sign in
					</button>

					<div className="flex w-full flex-col gap-2 p-2 items-center justify-center">
						<p className="font-normal text-[12px] text-[#6B7280]">Don't have an account? <span className="text-[#1A73E8]">Create an account</span></p>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Login;



