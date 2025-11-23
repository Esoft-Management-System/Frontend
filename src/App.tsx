import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login"
import ResetPassword from "./pages/login/ResetPassword";
import StaffLogin from "./pages/login/staffLogin";
import StudentRegister from "./pages/register/StudentRegister";
import StaffRequestLogin from "./pages/login/StaffRequestLogin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element = {<Login/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="/staff" element={<StaffLogin/>}/>
        <Route path="/studentregister" element={<StudentRegister/>}/>
        <Route path="/StaffRequestLogin" element={<StaffRequestLogin/>}/>
      </Routes>
    </div>
  );
};

export default App;

