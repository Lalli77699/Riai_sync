import React, { useEffect, useState } from "react";
import api from "api/api";
import { CircularProgress, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";



const Sheet = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await api.get("/attendance/today");
      if (response.data?.success && Array.isArray(response.data.data)) {
        setData(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (attendanceId,status) => {
    try {
      const response = await api.put("/attendance/update",
        {
          "emp_id": attendanceId,
          "is_reset": status=="r"?true:false,
          "is_checkout": status=="c"?true:false,
        }
      );
      if (response.status=200) {
        
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      fetchAttendance()
    }
    
   
  };

  return (
    <Box className="p-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" className="mb-6 text-gray-800 font-bold">
        Attendance Records
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={3}>
          {data.map((entry, index) => (
            <Card key={index} className="w-full shadow-md">
              <CardContent className="space-y-2">
                <Typography variant="h6" className="text-blue-700 font-bold">
                  Employee: {entry.emp_name || "N/A"}
                </Typography>
                <Typography>Clock In: {entry.check_in || "N/A"}</Typography>
                <Typography>Clock Out: {entry.check_out || "N/A"}</Typography>
                <Typography>Status: {entry.status}</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleReset(entry.emp_id,"r")}
                >
                  Reset
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleReset(entry.emp_id,"c")}
                >
                  CheckOut
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Sheet;
