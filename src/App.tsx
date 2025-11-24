import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login"
import StaffLogin from "./pages/login/staffLogin";
import StudentRegister from "./pages/register/StudentRegister";
import StaffRequestLogin from "./pages/login/StaffRequestLogin";
import OTPform from "./pages/ForgotPassword/OTPform";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import SetNewPassword from "./pages/ForgotPassword/Setnewpassword";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/staff" element={<StaffLogin/>}/>
        <Route path="/studentregister" element={<StudentRegister/>}/>
        <Route path="/StaffRequestLogin" element={<StaffRequestLogin/>}/>
        <Route path="/OTPform" element={<OTPform/>}/>
        <Route path="/SetNewPassword" element={<SetNewPassword/>}/>
      </Routes>
    </div>
  );
};

export default App;

