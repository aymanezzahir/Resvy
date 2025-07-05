import React, { useState } from "react";
import { Header } from "~/components";

interface UserFormProps {
  currentPassword: string; // Simulate stored password
  onSubmit: (userData: {
    username: string;
    email: string;
    fullName: string;
    password: string;
  }) => void;
}

const Setting: React.FC<UserFormProps> = ({ currentPassword, onSubmit }) => {
  // Simulated session values
  const sessionUsername = "admin2";
  const sessionEmail = "client@example.com";

  const [formData, setFormData] = useState({
    fullName: "",
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.oldPassword !== currentPassword) {
      setError("Old password is incorrect.");
      return;
    }

    // Build final data
    const dataToSubmit = {
      username: sessionUsername,
      email: sessionEmail,
      fullName: formData.fullName,
      password: formData.newPassword,
    };

    onSubmit(dataToSubmit);
    setSuccess("User updated successfully.");
  };

  return (
    <div className="wrapper">
      <Header title="Change Ton Profile" description="" />

      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 mx-auto">
        {/* Username (read-only) */}
        <div className="col-span-1">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={sessionUsername}
            readOnly
            className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
          />
        </div>

        {/* Email (read-only) */}
        <div className="col-span-1">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={sessionEmail}
            readOnly
            className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
          />
        </div>

        {/* Full Name */}
        <div className="col-span-1">
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        {/* Old Password */}
        <div className="col-span-1">
          <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="Enter old password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        {/* New Password */}
        <div className="col-span-1">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1">
          <button
            type="submit"
            className="w-full bg-primary-100 hover:bg-primary-500 text-white font-medium rounded-lg px-4 py-2.5"
          >
            Submit
          </button>
        </div>

        {/* Messages */}
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>
    </div>
  );
};

export default Setting;
