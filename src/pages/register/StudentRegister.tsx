import { useNavigate } from "react-router-dom";
import Textinput from "../../components/common/Textinput";
import BlueButton from "../../components/common/BlueButton";
import { useEffect } from "react";
import { studentService } from "../../services/student.service";

const StudentRegister = () => {

  useEffect(() => {
    studentService.getStudentReg().then((res) => {
      console.log("Student Reg API response:", res);
    }).catch((error) => {
      console.error("Student Reg API error:", error);
    })
  }, []);

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/");
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center from-gray-50 to-gray-100 overflow-x-hidden bg-[#EFEFEF]">
      <div className="flex w-full max-w-lg flex-col p-6">
        <div className="bg-white flex-1 flex flex-col gap-6 p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Registration</h1>
            <p className="text-sm text-gray-600">Student Registration</p>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput labelText="E-Number" placeholder="E-Number" type="text" />
              <Textinput labelText="Full Name" placeholder="Full Name" type="text" />
            </div>

            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput labelText="Contact Number" placeholder="Contact Number" type="text" />
              <Textinput labelText="Date of Birth" placeholder="Date of Birth" type="date" />
            </div>
            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput labelText="NIC" placeholder="NIC" type="text" />
              <Textinput labelText="Email" placeholder="Email" type="email" />
            </div>
            <Textinput labelText="Address" placeholder="Address" type="text" />
            <Textinput labelText="Password" placeholder="Password" type="password" />
            <Textinput labelText="Confirm Password" placeholder="Confirm Password" type="password" />
          </div>
          <BlueButton buttonName="Sign Up" />
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-gray-600 text-sm">Already have an account?{" "}<span onClick={goToLogin} className="text-blue-600 hover:cursor-pointer font-semibold">Sign In</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentRegister;
