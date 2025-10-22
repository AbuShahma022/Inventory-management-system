import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserDetails, ProfileUpdate } from "../../APIRequest/UserAPIRequest.js";
import {
  ErrorToast,
  SuccessToast,
  IsEmpty,
  IsEmail,
  IsMobile,
  getBase64,
} from "../../Helper/FormHelper.js";

function ProfileComponent() {
  const profile = useSelector((state) => state.profile.value);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [autoUpdating, setAutoUpdating] = useState(false);

  // ✅ Load profile on mount
  useEffect(() => {
    (async () => {
      await UserDetails();
    })();
  }, []);

  // ✅ Sync local state with Redux profile
  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setFirstName(profile.firstname || "");
      setLastName(profile.lastname || "");
      setEmail(profile.email || "");
      setMobile(profile.mobile || "");
      setPhoto(profile.photo || "");
      setPreviewPhoto(profile.photo || "");
    }
  }, [profile]);

  // ✅ When user selects new photo → preview + auto-update
  const onPhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await getBase64(file); // get pure base64
    setPreviewPhoto(base64); // show instantly
    setPhoto(base64);

    // Auto-update the profile with new photo
    setAutoUpdating(true);
    const result = await ProfileUpdate(
      firstName,
      lastName,
      password,
      mobile,
      base64 // send base64 only
    );

    if (result) {
      SuccessToast("Photo Updated!");
      await UserDetails(); // refresh data
    } else {
      ErrorToast("Photo update failed!");
    }

    setAutoUpdating(false);
  };

  // ✅ Manual Update (for non-photo fields)
  const onUpdate = async () => {
    if (IsEmpty(firstName)) return ErrorToast("First name required!");
    if (IsEmpty(lastName)) return ErrorToast("Last name required!");
    if (!IsEmail(email)) return ErrorToast("Invalid email address!");
    if (!IsMobile(mobile)) return ErrorToast("Invalid mobile number!");

    setAutoUpdating(true);

    const result = await ProfileUpdate(
      firstName,
      lastName,
      password,
      mobile,
      photo
    );

    if (result) {
      SuccessToast("Profile Updated!");
      await UserDetails();
    } else {
      ErrorToast("Update failed!");
    }

    setAutoUpdating(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        My Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* ✅ Profile Photo */}
        <div className="flex flex-col items-center">
          <img
            src={
              previewPhoto
                ? previewPhoto
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="User"
            className={`w-32 h-32 rounded-full border-4 object-cover shadow transition-all duration-300 ${
              autoUpdating ? "opacity-70 grayscale" : "opacity-100"
            }`}
          />

          <label className="mt-4 text-sm font-medium text-blue-600 cursor-pointer">
            {autoUpdating ? "Updating..." : "Change Photo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPhotoChange}
              disabled={autoUpdating}
            />
          </label>
        </div>

        {/* ✅ Form Fields */}
        <div className="flex-1 w-full space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              First Name
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="First name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Last Name
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Last name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Email
            </label>
            <input
              value={email}
              readOnly
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-4 py-2 text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Mobile
            </label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Password (optional)
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              type="password"
            />
          </div>

          <div className="pt-4">
            <button
              onClick={onUpdate}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all"
              disabled={autoUpdating}
            >
              {autoUpdating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
