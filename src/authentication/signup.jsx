import { useState } from "react";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ToastMessage from "utils/mui/toast";
import api from "api/api";
import { Backdrop, CircularProgress } from "@mui/material";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate()
  const [message,setMessage] = useState("")
  const [loading,setloading]=useState(false)
  const [severity,setSeverity] = useState("")
  const [isOpen,setIsOpen]= useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("❌ Please enter a valid email address.");
      setSeverity('error');
      setIsOpen(true);
      return;
    }
  
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match. Please try again.");
      setSeverity('error');
      setIsOpen(true);
      return;
    }
  
    try {
      setloading(true);
      const response = await api.post('/users/', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        notes: "string" 

      });
  if(response.status==200){
      setMessage(response?.data?.message);
      setSeverity('success');
      setIsOpen(true);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
  }else{

    setMessage(response?.data?.message);
    setSeverity('info');
    setIsOpen(true);


  }
    
    
  
    } catch (error) {
      console.log(error);
      setMessage("❌ Something went wrong during signup.");
      setSeverity('error');
      setIsOpen(true);
    } finally {
      setloading(false);
    }
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
      <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
>
  <CircularProgress color="inherit" />
</Backdrop>
            <ToastMessage message={message} severity={severity} open={isOpen} handleClose={handleClose} />
    </div>
    
  );
};

export default Signup;