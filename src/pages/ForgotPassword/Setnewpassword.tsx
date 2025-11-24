import { useNavigate } from "react-router-dom";

const Setnewpassword = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
			<div className="flex w-[409px] md:w-[409px] flex-col p-2.5 gap-2 " >
				<div className="bg-[#FFFFFF] flex-1 flex flex-col gap-3 p-[15px] md:p-8 rounded-xl shadow-sm place-items-start flex items-center justify-center">
					<p className="text-[20px] font-semibold text-[#111827] flex-1">Set New Password</p>
                    <p className="text-[11px] font-normal text-[#6B7280] flex-1">must be at least 6 charactors </p>
                    <div className="flex flex-col w-full flex-1 gap-2.5">
                        <input type="password" placeholder="New Password" className="w-full border border-[#D1D5DB] rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="password" placeholder="Confirm Password" className="w-full border border-[#D1D5DB] rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex flex-col w-full gap-3 mt-3">
                        <button className="ww-full flex flex-row rounded-[10px] py-3.5 bg-[#1A73E8] justify-center items-center font-medium text-white hover:cursor-pointer text-[16px]">Reset Password</button>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        <p className="text-[#6B7280] font-normal text-[12px]">Back to log in? <span onClick={(() => navigate("/"))} className="text-[#1A73E8] hover:cursor-pointer text underline">Click here</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Setnewpassword;