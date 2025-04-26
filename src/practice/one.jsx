import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const One = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <Card
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl w-full max-w-xl"
        elevation={10}
      >
        <CardContent className="flex flex-col items-center gap-6 p-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            🔥
          </div>
          <Typography
            variant="h4"
            className="text-black font-extrabold tracking-wide"
          >
            Next-Level UI
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-900 text-center max-w-md"
          >
            Welcome to a futuristic interface. Have a wonderful day where
            this screen blends power with style. 
          </Typography>
          <Button
            variant="contained"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:from-pink-600 hover:to-purple-600 transition"
          >
            Dive In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default One;
