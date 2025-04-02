import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    password: "password123",
  });
  const [editable, setEditable] = useState({ fullName: false, email: false, phone: false, password: false });

  const handleEdit = (field) => {
    setEditable({ fullName: false, email: false, phone: false, password: false, [field]: true });
  };

  const handleBlur = (field) => {
    setEditable((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Profile</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.fullName}
            onChange={handleChange}
            readOnly={!editable.fullName}
            onBlur={() => handleBlur("fullName")}
            required
            autoFocus={editable.fullName}
          />
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="w-4 h-4 text-gray-500 absolute right-3 top-9 cursor-pointer"
            onClick={() => handleEdit("fullName")}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.email}
            onChange={handleChange}
            readOnly
            required
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.phone}
            onChange={handleChange}
            readOnly
            required
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.password}
            onChange={handleChange}
            readOnly={!editable.password}
            onBlur={() => handleBlur("password")}
            required
            autoFocus={editable.password}
          />
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="w-4 h-4 text-gray-500 absolute right-3 top-9 cursor-pointer"
            onClick={() => handleEdit("password")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input type="file" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>
        <div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;