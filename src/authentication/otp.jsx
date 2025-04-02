import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

const OTPConfirmation = ({ onConfirm, onResend }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [timer, setTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }
    if (attempts > 1) {
      setAttempts(attempts - 1);
      setError("");
      onConfirm(otp);
    } else {
      setError("Maximum attempts reached. Please request a new OTP.");
    }
  };

  const handleResend = () => {
    setOtp("");
    setAttempts(3);
    setTimer(30);
    setCanResend(false);
    onResend();
  };

  return (
    <Card className="max-w-sm mx-auto p-6 shadow-lg rounded-lg">
      <CardHeader title="OTP Confirmation" className="text-center" />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            variant="outlined"
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={!!error}
            helperText={error}
            inputProps={{ maxLength: 6, className: "text-center tracking-widest" }}
          />
          <Button type="submit" variant="contained" fullWidth disabled={attempts === 0}>
            Confirm OTP
          </Button>
          <div className="text-center mt-2">
            {canResend ? (
              <Button variant="text" onClick={handleResend}>
                Resend OTP
              </Button>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Resend available in {timer}s
              </Typography>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OTPConfirmation;
