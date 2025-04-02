import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Logout = () => {
    const [showConfirmation, setShowConfirmation] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user profile data (assuming it's stored in localStorage or sessionStorage)
        localStorage.removeItem("profile");
        sessionStorage.removeItem("profile");
        
        // Redirect to login page
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center h-7
        
        
        0">
            {showConfirmation && (
                <div className="p-6 rounded-lg w-90 h-44 flex flex-col justify-center items-center">
                    <Typography variant="h6" className="mb-4 text-center">Are you sure you want to logout?</Typography>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleLogout} 
                        className="w-48">
                        Logout
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Logout;
