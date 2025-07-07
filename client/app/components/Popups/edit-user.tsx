import React, { useState } from "react";
import { cn } from "lib/util";
import { initialUser } from "~/routes/admin/all-user";
import axiosInstance from "lib/axios";

interface EditUserProps {
  self: UserDTO;
  setVisible: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      self: UserDTO;
    }>
  >;
}

export default function EditUser({ self, setVisible }: EditUserProps) {
  const [formData, setFormData] = useState({
    id : self.id,
    fullName: self.fullName ?? "",
    role: self.role ?? "ROLE_CUSTOMER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log(formData)
     await axiosInstance.put("api/users/" + formData.id , {fullName : formData.fullName})
    // Simulate update success
    setSuccess("User updated successfully.");
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black/40"
      )}
    >
      <div className="bg-white rounded-lg overflow-y-scroll shadow-lg max-h-[90vh] w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <button
          onClick={() =>
            setVisible({
              visible: false,
              self: initialUser,
            })
          }
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 mx-auto">
    
          <div className="col-span-1">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={self.username}
              readOnly
              className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
            />
          </div>


          <div className="col-span-1">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={self.email}
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

  
          <div className="col-span-1">
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">
              Role
            </label>
            <select
              name="role"
              disabled
              value={formData.role}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            >
              <option value="ROLE_ADMIN">admin</option>
              <option value="ROLE_CUSTOMER">client</option>
            </select>
          </div>

  
          <div className="col-span-1">
            <button
              type="submit"
              className="w-full bg-primary-100 hover:bg-primary-500 text-white font-medium rounded-lg px-4 py-2.5"
            >
              Submit
            </button>
          </div>


          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </form>
      </div>
    </div>
  );
}
