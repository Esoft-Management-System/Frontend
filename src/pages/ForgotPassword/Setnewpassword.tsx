import { useNavigate } from "react-router-dom";
import Textinput from "../../components/common/Textinput";
import BlueButton from "../../components/common/BlueButton";

const SetNewPassword = () => {
	const navigate = useNavigate();
	return (
		<div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
			<div className="flex w-[409px] md:w-[409px] flex-col p-2.5 gap-2 " >
				<div className="bg-[#FFFFFF] flex-1 flex-col gap-3 p-[15px] md:p-8 rounded-xl shadow-sm place-items-start flex items-center justify-center">
					<p className="text-[20px] font-semibold text-[#111827] flex-1">Set New Password</p>
					<p className="text-[11px] font-normal text-[#6B7280] flex-1">must be at least 6 charactors </p>
					<div className="flex flex-col w-full flex-1 gap-2.5">
						<Textinput labelText="New Password" placeholder="New Password" type="password" />
						<Textinput labelText="Confirm Password" placeholder="Confirm Password" type="password" />
					</div>
					<BlueButton buttonName="Set Password" />
					<div className="flex flex-col items-center justify-center w-full">
						<p className="text-[#6B7280] font-normal text-[12px]">Back to log in? <span onClick={(() => navigate("/"))} className="text-[#1A73E8] hover:cursor-pointer text underline">Click here</span></p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SetNewPassword;