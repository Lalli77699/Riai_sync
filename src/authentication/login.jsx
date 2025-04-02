import { useState } from "react";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "api/api";
import ToastMessage from "utils/mui/toast";
import OTPConfirmation from "./otp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message,setMessage] = useState("")
  const [severity,setSeverity] = useState("")
  const [isOpen,setIsOpen]= useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    console.log("Form submitted");
    e.preventDefault();

    if (!email || !password) {
      console.log("Validation failed: Email or password is missing");
      setMessage("❌ Please fill in both email and password.")
      setSeverity('error')
      setIsOpen(true);
      return;
    }

    setShowOTP(true);
  };

  return (
    <>
      {showOTP ? (
        <OTPConfirmation onConfirm={() => navigate("/dashboard")} onResend={() => console.log("Resend OTP")} />
      ) : (
        <div className="w-full min-h-screen flex justify-center items-center">
          <div className="w-[80%] h-[80vh] flex rounded-lg shadow-lg overflow-hidden">
            <div className="w-[100%] sm:w-[50%] h-full bg-white p-12 flex flex-col justify-between">
              <div className="flex items-center mb-4 gap-2">
                <div className="text-2xl font-semibold text-gray-700">Sign In</div>
                <div className="flex gap-4">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="lg"
                    className="text-blue-600 cursor-pointer"
                    onClick={() => console.log("Facebook login clicked")}
                  />
                  <FontAwesomeIcon
                    icon={faTwitter}
                    size="lg"
                    className="text-blue-400 cursor-pointer"
                    onClick={() => console.log("Twitter login clicked")}
                  />
                </div>
              </div>
              <div>
                <img src="https://www.riaisolutions.com/wp-content/uploads/2020/10/RiAiSolutions_Logo_304x91.png" alt="Logo" />
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col text-start">
                  <label htmlFor="email" className="text-lg font-medium text-gray-600">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      console.log("Email field updated:", e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col text-start">
                  <label htmlFor="password" className="text-lg font-medium text-gray-600">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      console.log("Password field updated:", e.target.value);
                    }}
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
                      checked={rememberMe}
                      onChange={() => {
                        setRememberMe(!rememberMe);
                        console.log("Remember Me checkbox toggled:", !rememberMe);
                      }}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
                </div>
              </form>
            </div>
            <div className="hidden sm:flex sm:w-[50%] h-full bg-orange-600 text-white flex-col justify-center items-center p-12">
              <h1 className="text-3xl font-bold">Welcome Back!</h1>
              <h3 className="mt-2 text-lg">Don't have an account?</h3>
              <button
                onClick={() => {
                  navigate("/signup", { replace: true });
                  console.log("Navigating to signup page...");
                }}
                className="mt-4 px-6 py-2 bg-white text-orange-600 rounded-full text-lg hover:bg-gray-100 focus:outline-none transform transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastMessage message={message} severity={severity} open={isOpen} handleClose={handleClose} />
    </>
  );
};

export default Login;
