import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../../APIRequest/UserAPIRequest.js";
import {
  getBase64,
  IsEmail,
  IsEmpty,
  IsMobile,
  ErrorToast,
} from "../../Helper/FormHelper.js";

function RegistrationComponent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    photo: "", // this will store Base64 string
  });

  // ✅ handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ handle file input & convert immediately to Base64
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      setFormData({ ...formData, photo: base64 });
    }
  };

  // ✅ handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (IsEmpty(formData.firstname)) return ErrorToast("First name required");
    if (IsEmpty(formData.lastname)) return ErrorToast("Last name required");
    if (!IsEmail(formData.email)) return ErrorToast("Valid email required");
    if (!IsMobile(formData.mobile)) return ErrorToast("Valid mobile required");
    if (IsEmpty(formData.password)) return ErrorToast("Password required");

    const result = await UserRegister(
      formData.email,
      formData.firstname,
      formData.lastname,
      formData.mobile,
      formData.password,
      formData.photo
    );

    if (result) {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#e0eaf5]">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="John"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="+8801234567890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-gray-600 text-sm"
          />
          {formData.photo && (
            <img
              src={`data:image/jpeg;base64,${formData.photo}`}
              alt="Preview"
              className="mt-3 w-20 h-20 rounded-full object-cover border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegistrationComponent;
