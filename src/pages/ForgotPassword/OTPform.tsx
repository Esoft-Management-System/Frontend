import Textinput from "../../components/common/Textinput";

const OTPform = () => {

	return (
		// <div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
		// 	<div className="flex min-w-[337px]  flex-row md:w-[409px] p-2.5 gap-2.5">
		// 		<div className="w-full flex flex-col  bg-white rounded-xl p-3.5 md:p-9 gap-3">
		// 			<p className="text-[20px] text-[#111827] font-semibold justify-center">
		// 				Enter verification code
		// 			</p>
		// 			<p className="text-[11px] font-normal text-[#6B7280]">
		// 				We've sent a code to <span>harishanth08@gmail.com</span>
		// 			</p>
		// 			<div className="w-full flex flex-row items-center justify-between gap-2">
		// 				<Textinput placeholder="0" type="text" />
		// 				<Textinput placeholder="0" type="text" />
		// 				<Textinput placeholder="0" type="text" />
		// 				<Textinput placeholder="0" type="text" />
		// 				<Textinput placeholder="0" type="text" />
		// 				<Textinput placeholder="0" type="text" />
		// 			</div>
		// 			<p className="text-[14px] font-normal text-[#6B7280] text-center">
		// 				Didn’t get a code? <span className="font-semibold">Click to resend.</span></p>
		// 			<div className="bg-white rounded-xl p-6 md:p-9">
		// 				<div className="flex gap-4 mt-6">
		// 					<button className="flex-1 py-3 rounded-lg border border-[#D1D5DB] text-[#374151] font-medium">Cancel</button>
		// 					<button className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-medium hover:brightness-95">Verify</button>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<div className="w-screen h-screen bg-[#EFEFEF] flex items-center justify-center">

			<div className="flex flex-row max-w-[409px] p-2.5 gap-2.5">

				<div className="w-full bg-[#FFFFFF] p-8 flex flex-col gap-3 shadow-sm rounded-xl items-center justify-center">

					<p className="text-[20px] font-semibold text-[#111827]">Enter verification code</p>
					<p className="text-[13px] font-normal text-[#6B7280]">we’ve sent a code to <span className="font-semibold">harishanth08@gmail.com</span></p>

					<div className="flex flex-row w-full h-full gap-2.5 items-center">

						<Textinput type="text" />
						<Textinput type="text" />
						<Textinput type="text" />
						<Textinput type="text" />
						<Textinput type="text" />
						<Textinput type="text" />

					</div>

					<div className="w-full p-2.5 flex flex-row items-center justify-center">

						<p className="text-[13px] font-normal text-[#6B7280]">Didn’t get a code? <span className="font-semibold text-black hover:cursor-pointer">Click to resend.</span></p>

					</div>

					<div className="flex flex-row w-full gap-3">

						<button className="flex flex-row w-full rounded-[10px] border border-[#9CA3AF] py-3.5 items-center justify-center font-medium text-[#9CA3AF] text-[16px] hover:cursor-pointer">Cancel</button>
						<button className="w-full flex flex-row rounded-[10px] py-3.5 bg-[#1A73E8] justify-center items-center font-medium text-white text-[16px] hover:cursor-pointer">Verify</button>

					</div>

				</div>

			</div>

		</div>
	);
};

export default OTPform;