import { useNavigate } from "react-router-dom";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "react-toastify";
import BlueButton from "../../components/common/BlueButton";
import Textinput from "../../components/common/Textinput";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { initializeStaffAuth, loginStaff, resetStaffState } from "../../redux/slices/staffSlice";

const StaffLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, currentStaff } = useAppSelector((state) => state.staff);

  const [isStaff, setIsStaff] = useState(true);
  const [formData, setFormData] = useState({
    staffId: "",
    password: "",
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState<{ staffId?: string; password?: string }>({});

  useEffect(() => {
    dispatch(initializeStaffAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!currentStaff) return;
    if (currentStaff.isPasswordTemporary) {
      navigate("/OTPform");
      return;
    }
    if (currentStaff.role === "admin") {
      navigate("/dashboard/admin");
    } else {
      navigate("/dashboard/staff");
    }
  }, [currentStaff, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.staffId.trim()) errs.staffId = "Please enter your Staff ID";
    if (!formData.password.trim()) errs.password = "Please enter your password";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetStaffState());

    if (!validateForm()) return;

    try {
      const result = await dispatch(loginStaff(formData)).unwrap();

      if ("temporarySessionToken" in result) {
        sessionStorage.setItem("staffTemporaryToken", result.temporarySessionToken as any);
        if ("email" in result && result.email) {
          sessionStorage.setItem("otpEmail", String(result.email ?? ""));
        }
        if (result.staff) {
          sessionStorage.setItem("staffData", JSON.stringify(result.staff));
          sessionStorage.setItem("otpEmail", result.staff.email ?? "");
        }
        toast.success(result?.message ?? "Temporary password issued. Please verify.");
        navigate("/OTPform", { state: { email: result.staff?.email } });
        return;
      }

      toast.success(result?.message ?? "Login successful");

      if (result.staff.isPasswordTemporary) {
        sessionStorage.setItem("otpEmail", result.staff.email ?? "");
        navigate("/OTPform", { state: { email: result.staff.email } });
        return;
      }
      if (result.staff.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/staff");
      }
    } catch (err: any) {
      const message =
        typeof err === "string"
          ? err
          : err?.message ?? "Login failed. Please check your credentials.";
      toast.error(message);
    }
  };

  const goToResetPassword = () => navigate("/forgotpassword");
  const goToStudent = () => {
    setIsStaff(false);
    navigate("/");
  };
  const goToRequest = () => navigate("/StaffRequestLogin");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <div className="flex w-full max-w-md flex-col p-6">
        <form onSubmit={handleSignIn} className="bg-white flex-1 flex flex-col gap-6 p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Sign in to your staff account</p>
          </div>

          {/* {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )} */}

          <div className="flex w-full gap-1 rounded-2xl p-1 bg-gray-100 border border-gray-200">
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${!isStaff
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={goToStudent}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isStaff
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setIsStaff(true)}
            >
              Staff
            </button>
          </div>

          <div className="flex flex-col w-full gap-4">
            <Textinput
              labelText="Staff ID"
              placeholder="Enter your Staff ID"
              type="text"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              error={formErrors.staffId}
            />
            <Textinput
              labelText="Password"
              placeholder="Enter your password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer"
              />
              <p className="text-gray-700 text-sm font-medium">Remember me</p>
            </div>
            <button
              type="button"
              onClick={goToResetPassword}
              className="text-blue-600 text-sm hover:cursor-pointer font-medium hover:text-blue-700 transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>

          <BlueButton buttonName="Sign in" type="submit" loading={loading} disabled={loading} />

          <div className="text-center pt-2">
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={goToRequest}
                className="text-blue-600 hover:cursor-pointer font-semibold hover:text-blue-700 transition-colors duration-200"
              >
                Request Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;