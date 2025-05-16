import api from "api/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function AccessTokenPage() {
  const [token,setToken]=useState("")
  const navigate=useNavigate()
  const handletoken=async()=>{
    try {
      const response = await api.post("/access-tokens/verify-token",{
        "token": token


      })
      console.log(response)
     if (response.status === 200) {
  navigate("/login", {
    state: {
      token: response?.data?.data?.allow_token
    }
  });
  console.log(response?.data?.data?.allow_token);
}

    } catch (error) {
      console.log(error)
      
    }
    
  }
  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Left Card with Indigo-Blue Tint */}
        <div className="bg-gradient-to-br from-indigo-500/30 to-blue-500/20 backdrop-blur-lg w-full md:w-1/2 rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center border border-white/30">
          <h1 className="text-4xl font-bold text-white text-center mb-4 drop-shadow-md">
            WELCOME TO AGENTIC AI
          </h1>
          <p className="text-center text-white/90 text-lg mb-6">
            Enter your access token to unlock the power of AI
          </p>
          <input
            type="text"
            value={token}
            onChange={(e)=>setToken(e.target.value)}
            placeholder="Access Token"
            className="w-full border border-white/40 bg-white/10 text-white placeholder-white/70 rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button 
          onClick={()=>handletoken()}
          className="w-full bg-indigo-500 text-white py-3 rounded-md font-semibold hover:bg-indigo-600 transition shadow-lg">
      
            Submit
          </button>
        </div>

        {/* Right Card with Same Background as Page */}
        <div className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] backdrop-blur-lg w-full md:w-1/2 rounded-2xl  flex items-center justify-center p-6">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/ai-robot-automation-9263874-7547553.png"
            alt="AI Robot"
            className="h-72 object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
