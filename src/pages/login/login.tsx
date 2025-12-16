// src/pages/Login.tsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginStudent, initializeStudentAuth } from "../../redux/slices/studentSlice";
import BlueButton from "../../components/common/BlueButton";
import Textinput from "../../components/common/Textinput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get state from Redux
  const { loading, error, currentStudent } = useAppSelector((state) => state.student);

  const [isStaff, setIsStaff] = useState(false);
  const [formData, setFormData] = useState({
    eNumber: '',
    password: '',
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState<{ eNumber?: string; password?: string }>({});

  // Initialize auth on component mount
  useEffect(() => {
    dispatch(initializeStudentAuth());
  }, [dispatch]);

  // Redirect if already logged in
  useEffect(() => {
    if (currentStudent) {
      navigate('/dashboard/student');
    }
  }, [currentStudent, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    
    if (!formData.eNumber.trim()) {
      errs.eNumber = 'Please enter your E-Number';
    }
    
    if (!formData.password.trim()) {
      errs.password = 'Please enter your password';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(loginStudent(formData)).unwrap();
      console.log('Login successful:', result);
      navigate('/dashboard/student');
      
    } catch (err) {
      console.error('Login error:', err);
    }
  }

  const goToResetPassword = () => {
    navigate("/forgotpassword");
  }

  const goToStudentRegister = () => {
    navigate("/studentregister");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-brrom-gray-50 to-gray-100 overflow-x-hidden">
      <div className="flex w-full max-w-md flex-col p-6">
        <form onSubmit={handleSignIn} className="bg-white flex-1 flex flex-col gap-6 p-8 rounded-2xl shadow-lg border border-gray-100">
          {/* Header Section */}
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Sign in to your student account</p>
          </div>

          {/* Display Redux error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Role Selector */}
          <div className="flex w-full gap-1 rounded-2xl p-1 bg-gray-100 border border-gray-200">
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${!isStaff
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setIsStaff(false)}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isStaff
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => navigate('/staff')}
            >
              Staff
            </button>
          </div>

          {/* Form Section */}
          <div className="flex flex-col w-full gap-4">
            <Textinput
              labelText="E-Number"
              placeholder="Enter your E-Number (e.g., EN001)"
              type="text"
              name="eNumber"
              value={formData.eNumber}
              onChange={handleChange}
              error={formErrors.eNumber}
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

          {/* Remember Me & Forgot Password */}
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
              className="text-blue-600 hover:cursor-pointer text-sm font-medium hover:text-blue-700 transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <BlueButton
            buttonName="Sign in"
            type="submit"
            loading={loading}
            disabled={loading}
          />

          {/* Sign Up Link */}
          <div className="text-center pt-2">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={goToStudentRegister}
                className="text-blue-600 hover:cursor-pointer font-semibold hover:text-blue-700 transition-colors duration-200"
              >
                Create account
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;