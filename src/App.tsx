import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login"
import ResetPassword from "./pages/login/ResetPassword";
import StaffLogin from "./pages/login/StaffLogin";
import Register from "./pages/register/Register";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element = {<Login/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="/staff" element={<StaffLogin/>}/>
        <Route path="/studentregister" element={<Register/>}/>
      </Routes>
    </div>
  );
};

export default App;

