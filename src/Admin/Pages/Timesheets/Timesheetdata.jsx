import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Data = () => {
  return (
    <div className="p-0 space-y-2">
      {/* Top Profile Card */}
      <Card className="w-full h-10 flex items-center p-2 shadow-lg">
        <AccountCircleIcon sx={{ fontSize: 40 }} className="text-blue-500 mr-4" />
        <Typography variant="h6">Profile ID: 123456</Typography>
      </Card>

      {/* Timesheet Form and Summary Card */}
      <Card className="w-full p-4 shadow-lg">
        <Grid container spacing={2}>
          {/* Left Side Form */}
          <Grid item xs={12} md={8}>
            <Box className="space-y-4">
              <Box>
                <Typography variant="subtitle1" gutterBottom>Timesheet Name</Typography>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" gutterBottom>Description</Typography>
                <textarea
                  rows="3"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" gutterBottom>Project Name</Typography>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />
              </Box>
            </Box>
          </Grid>

          {/* Right Side Summary Card
          <Grid item xs={12} md={4}>
            <Card className="bg-grey-900 p-4 h-full shadow-inner">
              <CardContent>
                <Typography variant="h6" gutterBottom>Time Logs Summary</Typography>
                <Box className="space-y-2">
                  <Typography variant="body1">Billable - Submitted: 12h</Typography>
                  <Typography variant="body1">Billable - Approved: 10h</Typography>
                  <Typography variant="body1">Non-Billable - Submitted: 4h</Typography>
                  <Typography variant="body1">Non-Billable - Approved: 3h</Typography>
                  <Typography variant="subtitle1" className="pt-4 font-semibold">Total Hours: 17h</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </Card>
    </div>
  );
};

export default Data;
