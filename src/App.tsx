import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login"
import ResetPassword from "./pages/login/ResetPassword";
import StaffLogin from "./pages/login/staffLogin";
import StudentRegister from "./pages/register/StudentRegister";
import OTPform from "./pages/ForgotPassword/OTPform";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element = {<Login/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="/staff" element={<StaffLogin/>}/>
        <Route path="/studentregister" element={<StudentRegister/>}/>
        <Route path="/OTPform" element={<OTPform/>}/>
      </Routes>
    </div>
  );
};

export default App;

