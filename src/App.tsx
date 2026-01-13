import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/login";
import StaffLogin from "./pages/login/staffLogin";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import StaffDashboard from "./features/Staff/pages/Dashboard";
import StudentRegister from "./pages/register/StudentRegister";
import StaffRequestLogin from "./pages/login/StaffRequestLogin";
import OTPform from "./pages/ForgotPassword/OTPform";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import SetNewPassword from "./pages/ForgotPassword/Setnewpassword";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/studentregister" element={<StudentRegister />} />
        <Route path="/StaffRequestLogin" element={<StaffRequestLogin />} />
        <Route path="/OTPform" element={<OTPform />} />
        <Route path="/SetNewPassword" element={<SetNewPassword />} />
        <Route path="/dashboard/staff" element={<DashboardLayout><StaffDashboard/></DashboardLayout>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />
    </div>
  );
};

export default App;

