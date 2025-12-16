import { useNavigate } from "react-router-dom";
import Textinput from "../../components/common/Textinput";
import BlueButton from "../../components/common/BlueButton";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerStudent, resetStudentState } from "../../redux/slices/studentSlice";
import type { IStudent } from "../../redux/interfaces/student";
import { toast} from "react-toastify";

const StudentRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.student);

  const [formData, setFormData] = useState<IStudent>({
    eNumber: "",
    fullName: "",
    contactNumber: "",
    dateOfBirth: "",
    nic: "",
    emailAddress: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear any existing error messages
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetStudentState());

    const requiredLabels: Record<keyof IStudent, string> = {
      eNumber: "E-Number",
      fullName: "Full Name",
      contactNumber: "Contact Number",
      dateOfBirth: "Date of Birth",
      nic: "NIC",
      emailAddress: "Email",
      address: "Address",
      password: "Password",
      confirmPassword: "Confirm Password",
    };

    const missingFields = Object.entries(requiredLabels)
      .filter(([key]) => `${formData[key as keyof IStudent] ?? ""}`.trim() === "")
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      const message =
        missingFields.length === 1
          ? `Please fill ${missingFields[0]}`
          : `Please fill: ${missingFields.join(", ")}`;
      toast.error(message);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(registerStudent(formData)).unwrap();
      toast.success("Student registered successfully");
      navigate("/");
    } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : (err as any)?.response?.data?.message ??
          (err as any)?.message ??
          "Student registration failed";
      toast.error(message);
    }
  };

  const goToLogin = () => navigate("/");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <div className="flex w-full max-w-[600px] flex-col p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex-1 flex flex-col gap-5 p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Registration</h1>
            <p className="text-sm text-gray-600">Student Registration</p>
          </div>

          <div className="flex flex-col w-full gap-4">
            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput
                labelText="E-Number"
                name="eNumber"
                placeholder="E-Number"
                type="text"
                value={formData.eNumber}
                onChange={handleChange}
                disabled={loading}
              />
              <Textinput
                labelText="Full Name"
                name="fullName"
                placeholder="Full Name"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput
                labelText="Contact Number"
                name="contactNumber"
                placeholder="Contact Number"
                type="text"
                value={formData.contactNumber}
                onChange={handleChange}
                disabled={loading}
              />
              <Textinput
                labelText="Date of Birth"
                name="dateOfBirth"
                placeholder="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput
                labelText="NIC"
                name="nic"
                placeholder="NIC"
                type="text"
                value={formData.nic}
                onChange={handleChange}
                disabled={loading}
              />
              <Textinput
                labelText="Email"
                name="emailAddress"
                placeholder="Email"
                type="email"
                value={formData.emailAddress}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <Textinput
              labelText="Address"
              name="address"
              placeholder="Address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
            />
            <Textinput
              labelText="Password"
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            <Textinput
              labelText="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <BlueButton buttonName="Sign Up" type="submit" loading={loading} disabled={loading} />

          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <span onClick={goToLogin} className="text-blue-600 hover:cursor-pointer font-semibold">
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>

    </div>
  );
};

export default StudentRegister;
