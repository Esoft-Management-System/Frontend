import { useNavigate } from "react-router-dom";
import BlueButton from "../../components/common/BlueButton";
import Textinput from "../../components/common/Textinput";
import { useEffect } from "react";


const StaffRequestLogin = () => {

  const navigate = useNavigate();
  const currentDate = (() => {
    const today = new Date(); // save today date here
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`;
  })();

  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center from-gray-50 to-gray-100 overflow-x-hidden bg-[#EFEFEF]">
      <div className="flex w-full max-w-md flex-col p-6">
        <div className="bg-white flex-1 flex flex-col gap-6 p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Staff Request Login</h1>
            <p className="text-gray-600 text-sm">Staff Request Login Access</p>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput labelText="Staff ID" placeholder="Staff ID" type="text" />
              <Textinput labelText="Staff Name" placeholder="Staff Name" type="text" />
            </div>
            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput labelText="Date" placeholder="Date" type="date" value={currentDate} disabled={true} />
              <Textinput labelText="Designation" placeholder="Designation" type="text" />
            </div>
            <Textinput labelText="Email Address" placeholder="Email Address" type="email" />
            <Textinput labelText="Reason for Request" placeholder="Reason for Request" type="textarea" />
          </div>
          <BlueButton buttonName="Request Your Sign in" />
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-gray-600 text-sm">Already have an Account? <span onClick={() => navigate("/staff")} className="text-blue-600 hover:cursor-pointer font-semibold">Sign In</span></p>
          </div>
        </div>
      </div>
    </div>

  )
}
export default StaffRequestLogin;

