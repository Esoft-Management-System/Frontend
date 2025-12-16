import { useNavigate } from "react-router-dom";
import BlueButton from "../../components/common/BlueButton";
import Textinput from "../../components/common/Textinput";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { IStaff } from "../../redux/interfaces/staff";
import { registerStaff, resetStaffState } from "../../redux/slices/staffSlice";
import { toast } from "react-toastify";

const StaffRequestLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get loading state from Redux
  const { loading } = useAppSelector((state) => state.staff);

  const currentDate = (() => {
    const today = new Date(); // save today date here
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`;
  })();

  //set form data to get the values from the input fields and set it into interfaces
  const [formData, setFormData] = useState<IStaff>({
    staffId: "",
    fullname: "",
    designation: "",
    email: "",
    reason: "",
    role: "staff",
  });

  //this is for form validation ragavi, such as if i missed one field it will show an error message
  const [errors, setErrors] = useState<IStaff>({
    staffId: "",
    fullname: "",
    designation: "",
    email: "",
    reason: "",
  });

  //this is for input change example: when we type in the input field it will change the value
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof IStaff]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors = {
      staffId: "",
      fullname: "",
      designation: "",
      email: "",
      reason: "",
    };

    let isValid = true;

    if (!formData.staffId.trim()) {
      newErrors.staffId = "Staff ID is required";
      isValid = false;
    }

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Staff Name is required";
      isValid = false;
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    dispatch(resetStaffState());

    if (!validateForm()) {
      return
    }

    //load the data for submission
    const staffData = {
      staffId: formData.staffId,
      fullName: formData.fullname, // API expects fullName (camel-cased N)
      designation: formData.designation,
      email: formData.email,
      reason: formData.reason,
      role: "staff",
    } as any;

    try {
      const result = await dispatch(registerStaff(staffData)).unwrap();
      console.log("Staff registered successfully:", result);
      toast.success("Staff registered successfully");
      navigate("/");

      setFormData({
        staffId: "",
        fullname: "",
        designation: "",
        email: "",
        reason: "",
        role: "staff",
      });
    } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : (err as any)?.message ?? "Failed to submit request";
      toast.error(message);
      console.error("Failed to submit request:", err);
    }
  }

  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <div className="flex w-full max-w-[600px] flex-col p-6">
        <div className="bg-white flex-1 flex flex-col gap-5 p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Staff Request Login
            </h1>
            <p className="text-gray-600 text-sm">Staff Request Login Access</p>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput
                labelText="Staff ID"
                placeholder="Staff ID"
                type="text"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                error={errors.staffId}
              />
              <Textinput
                labelText="Staff Name"
                placeholder="Staff Name"
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                error={errors.fullname}
              />
            </div>
            <div className="flex w-full gap-3 flex-col md:flex-row">
              <Textinput
                labelText="Date"
                placeholder="Date"
                type="date"
                value={currentDate}
                disabled={true}
              />
              <Textinput
                labelText="Designation"
                placeholder="Designation"
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                error={errors.designation}
              />
            </div>
            <Textinput
              labelText="Email Address"
              placeholder="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Textinput
              labelText="Reason for Request"
              placeholder="Reason for Request"
              type="textarea"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              error={errors.reason}

            />
          </div>
          <BlueButton
            buttonName="Request Your Sign in"
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
          />
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-gray-600 text-sm">
              Already have an Account?{" "}
              <span
                onClick={() => navigate("/staff")}
                className="text-blue-600 hover:cursor-pointer font-semibold"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaffRequestLogin;
