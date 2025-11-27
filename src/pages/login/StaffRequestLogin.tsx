import { useNavigate } from "react-router-dom";
import BlueButton from "../../components/common/BlueButton";
import Textinput from "../../components/common/Textinput";
import { useEffect, useState } from "react";


const StaffRequestLogin = () => {

  const navigate = useNavigate();
  const [currentDate, setCurrentDate ] = useState("");

  useEffect(() => {
    const today = new Date(); // save today date here
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0") 
    const date = String(today.getDate()).padStart(2, "0") 
    setCurrentDate(`${year}-${month}-${date}`)
    console.log(currentDate);
  }, [])

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#EFEFEF]">
      <div className="flex w-[414px] md:w-[414px] flex-col p-3">
        <div className="bg-[#FFFFFF] flex-1 flex flex-col gap-3 p-3 md:p-8 rounded-xl">
          <p className="text-[20px] font-semibold text-[#111827]">Staff Request Login</p>
          <p className="text-[14px] font-normal text-[#6B7280]">Staff Request Login Access</p>
          <div className="flex flex-col w-full gap-3">
            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput placeholder="Staff ID" type="text" />
              <Textinput placeholder ="Staff Name" type="text" />
            </div>
            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput placeholder="DD:MM:YYYY" type="date" value={currentDate} disbled={true}/>
              <Textinput placeholder="Designation" type="text" />
            </div>
            <Textinput placeholder="Email Address" type="email" />
            <Textinput placeholder="Reason for Request" type="textarea" />
          </div>
          <BlueButton buttonName="Request Your Sign in" />
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-[#6B7280] font-normal text-[12px]">Already have an Account? <span onClick={(() => navigate("/staff"))} className="text-[#1A73E8] hover:cursor-pointer">Sign In</span></p>
          </div>
        </div>
      </div>
    </div>

  )
}
export default StaffRequestLogin;

