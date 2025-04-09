import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "api/api";
import { CircularProgress } from "@mui/material";

const Verification = () => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("Verification check...");
  const location = useLocation();
  const navigate = useNavigate();

  const getToken = () => {
    const params = new URLSearchParams(location.search);
    return params.get("token");
  };

  useEffect(() => {
    const verify = async () => {
      const token = getToken();
      if (!token) {
        setText("Token not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/users/verify?token=${token}`);
        if (response.status === 200) {
          setText("Verification successful! Redirecting...");
          setTimeout(() => navigate("/"), 5000);
        } else {
          setText("Verification failed. Please try again.");
        }
      } catch (error) {
        setText("An error occurred during verification.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [location, navigate]);

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md text-center">
        {loading ? <CircularProgress /> : <h2 className="text-gray-800 text-lg font-semibold">{text}</h2>}
      </div>
    </div>
  );
};

export default Verification;
