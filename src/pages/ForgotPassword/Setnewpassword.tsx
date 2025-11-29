import { useNavigate } from "react-router-dom";
import Textinput from "../../components/common/Textinput";
import BlueButton from "../../components/common/BlueButton";

const SetNewPassword = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen w-full flex items-center justify-center from-gray-50 to-gray-100 overflow-x-hidden bg-[#EFEFEF]">
			<div className="flex w-full max-w-md flex-col p-6">
				<div className="bg-white flex-1 flex flex-col gap-6 p-8 rounded-2xl shadow-lg border border-gray-100 items-center">
					<div className="text-center mb-2">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">Set New Password</h1>
						<p className="text-sm text-gray-600">must be at least 6 characters</p>
					</div>
					<div className="flex flex-col w-full gap-4">
						<Textinput labelText="New Password" placeholder="New Password" type="password" />
						<Textinput labelText="Confirm Password" placeholder="Confirm Password" type="password" />
					</div>
					<BlueButton buttonName="Set Password" />
					<div className="flex flex-col items-center justify-center w-full">
						<p className="text-gray-600 text-sm">Back to log in? <span onClick={() => navigate("/")} className="text-blue-600 hover:cursor-pointer font-semibold">Click here</span></p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SetNewPassword;