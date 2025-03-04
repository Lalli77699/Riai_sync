import { useState } from "react";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctEmail = "test@example.com";
    const correctPassword = "Password1@23";

    if (email === correctEmail && password === correctPassword) {
      setMessage("✅ Verified! Login successful.");
    } else {
      setMessage("❌ Incorrect email or password. Please try again.");
    }
  };

  
  return (<>


    <div className="w-full min-h-screen bg-slate-200 flex justify-center items-center">
      <div className="w-[80%] h-[80vh] flex rounded-lg shadow-lg overflow-hidden">
        
        <div className="w-[100%] sm:w-[50%] h-full bg-white p-12 flex flex-col justify-between">
          <div className="flex items-center mb-4 gap-2">
            <div className="text-2xl font-semibold text-gray-700">Sign In</div>
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
          <div>
            <img src="https://www.riaisolutions.com/wp-content/uploads/2020/10/RiAiSolutions_Logo_304x91.png"/>
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col text-start">
              <label htmlFor="username" className="text-lg font-medium text-gray-600">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              />
            </div>

            <div className="flex flex-col text-start">
              <label htmlFor="password" className="text-lg font-medium text-gray-600">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-600 rounded-full text-white py-3 text-xl transform transition-all duration-300 hover:bg-slate-700 focus:outline-none hover:scale-105"
            >
              Sign In
            </button>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
            </div>
          </form>
          <div className="sm:hidden">
            <h6 className="mt-2 text-lg">Don't have an account?</h6>
            <button className="mt-4 px-6 py-2 bg-white text-orange-600 rounded-full text-lg hover:bg-gray-100 focus:outline-none transform transition-all duration-300 hover:scale-105">
              Sign Up
              </button>
              </div>

        </div>

        <div className="none sm:visible sm:w-[50%] h-full bg-orange-600 text-white flex flex-col justify-center items-center p-12">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <h3 className="mt-2 text-lg">Don't have an account?</h3>
          <button 
          onClick={()=>{
            navigate("/signup", { replace: true });

          }}
          className="mt-4 px-6 py-2 bg-white text-orange-600 rounded-full text-lg hover:bg-gray-100 focus:outline-none transform transition-all duration-300 hover:scale-105">
            Sign Up
          </button>
        </div>
      </div>
    </div></>
  );
};

export default Login;