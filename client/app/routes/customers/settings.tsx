import axiosInstance from "lib/axios";
import React, { useEffect, useState } from "react";
import { Header } from "~/components";
import { passwordregex } from "~/constants/regex";

interface UserFormProps {
  currentPassword: string; // Simulate stored password
  onSubmit: (userData: {
    username: string;
    email: string;
    fullName: string;
    password: string;
  }) => void;
}

export default function Settings(){
  // Simulated session values
  const sessionUsername = "admin2";
  const sessionEmail = "client@example.com";


  const [formData, setFormData] = useState({
  id : 0,
  username: "",
  email: "",
  fullName: "",
  newPassword: ""
});

useEffect(()=> {
  async function getUserInfo(){
    const resUser =  await axiosInstance.post("/api/auth/userdetails");
    const data = resUser.data
    setFormData(e=>({
      ...e,
      email : data.email,
      username : data.username,
      fullName : data.fullName,
      id : data.id
    }))
  }

  getUserInfo();
} , []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!passwordregex.test(formData.newPassword)) {
      setError("mot de passe est faible.");
      return;
    }

    // Build final data
    
    await axiosInstance.put("api/users/" + formData.id , {password : formData.newPassword})

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
            value={formData.username}
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
            value={formData.email}
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
            readOnly
            onChange={handleChange}
            placeholder="Full Name"
            className="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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

