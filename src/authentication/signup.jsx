import { useState } from "react";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match. Please try again.");
      return;
    }
    
    setMessage("✅ Signup successful!");
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-[80%] min-h-[80vh] h-auto flex rounded-lg shadow-lg">
        <div className="w-[100%] sm:w-[50%] h-full bg-white p-12 flex flex-col justify-between">
          <div className="flex items-center mb-4 gap-2">
            <div className="text-2xl font-semibold text-gray-700">Sign Up</div>
            <div className="flex gap-4">
              <FontAwesomeIcon
                icon={faFacebook}
                size="lg"
                className="text-blue-600 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faTwitter}
                size="lg"
                className="text-blue-400 cursor-pointer"
              />
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col text-start">
              <label className="text-lg font-medium text-gray-600">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            
            <div className="flex flex-col text-start">
              <label className="text-lg font-medium text-gray-600">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col text-start">
              <label className="text-lg font-medium text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col text-start">
              <label className="text-lg font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col text-start">
              <label className="text-lg font-medium text-gray-600">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-600 rounded-full text-white py-3 text-xl hover:bg-slate-700 hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          
          <p className="text-center text-red-500 font-medium mt-2">{message}</p>
        </div>

        <div className="none sm:visible sm:w-[50%] min-h-full bg-orange-600 text-white flex flex-col justify-center items-center p-12">
          <h1 className="text-3xl font-bold">Join Us Today!</h1>
          <h3 className="mt-2 text-lg">Already have an account?</h3>
          <button 
          onClick={()=>{
            navigate("/", { replace: true });

          }}
          className="mt-4 px-6 py-2 bg-white text-orange-600 rounded-full text-lg hover:bg-gray-100 hover:scale-105">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;