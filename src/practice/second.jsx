import React from "react";
import { Card, CardContent, Typography, Button, Divider } from "@mui/material";

const Second = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 text-gray-900 p-6 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Left Panel */}
        <Card className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
          <CardContent>
            <Typography variant="h5" className="text-purple-600 font-bold mb-2">
              🌈 Creative Hub
            </Typography>
            <Typography variant="h3" className="font-extrabold text-gray-800 mb-4">
              Bright Ideas Start Here
            </Typography>
            <Typography className="text-gray-600 mb-6">
              A light, elegant interface for productive minds. Dive into your
              design or dev space with this polished UI.
            </Typography>
            <Divider className="my-4 bg-purple-300" />
            <Button
              variant="outlined"
              className="border-purple-400 text-purple-600 hover:bg-purple-500 hover:text-white rounded-full px-6"
            >
              Start Now
            </Button>
          </CardContent>
        </Card>

        {/* Right Panel */}
        <div className="grid grid-rows-2 gap-8">
          <Card className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-indigo-300/50 transition duration-300">
            <Typography variant="h6" className="text-indigo-600 mb-2">
              ⚡ Quick Access
            </Typography>
            <Typography className="text-gray-700">
              Navigate your recent tasks or jump into the essentials fast.
            </Typography>
          </Card>
          <Card className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-pink-300/50 transition duration-300">
            <Typography variant="h6" className="text-pink-500 mb-2">
              🧘 Zen Focus
            </Typography>
            <Typography className="text-gray-700">
              Stay calm and focused in your creative flow with this clean layout.
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Second;
