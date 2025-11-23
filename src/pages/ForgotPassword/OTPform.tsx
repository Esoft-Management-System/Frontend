import Textinput from "../../components/common/Textinput";

const OTPform = () => {

return (
<div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
    <div className="flex min-w-[337px]  flex-col md:w-[409px] p-2.5 gap-2.5">
        <div className="w-full flex flex-col bg-white rounded-xl p-3.5 md:p-9 gap-3">

        <p className="text-[20px] text-[#111827] font-semibold justify-center">
            Enter verification code
        </p>
        <p className="text-[11px] font-normal text-[#6B7280]">
            We've sent a code to <span>harishanth08@gmail.com</span>
        </p>
        <div className = "w-full flex flex-row items-center justify-between gap-2">
            <Textinput placeholder="0" type="text"/>
            <Textinput placeholder="0" type="text"/>
            <Textinput placeholder="0" type="text"/>

            <Textinput placeholder="0" type="text"/>
            <Textinput placeholder="0" type="text"/>
            <Textinput placeholder="0" type="text"/>
        
        </div>
        <p className="text-[14px] font-normal text-[#6B7280] text-center">
        Didn’t get a code? <span className="font-semibold">Click to resend.</span></p>
        <div className="bg-white rounded-xl p-6 md:p-9">
        <div className="flex gap-4 mt-6">
        <button className="flex-1 py-3 rounded-lg border border-[#D1D5DB] text-[#374151] font-medium">Cancel</button>
        <button className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-medium hover:brightness-95">Verify</button>
        </div>
        </div>


        </div>

    </div>
    </div>
);
};

export default OTPform;