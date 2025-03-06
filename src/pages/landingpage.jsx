import React from "react";
import { Button } from "@mui/material";
import  SidenavLayout  from "sidenavs/sidenavlayout";
import ClockIn from "clockin/clockin";

const Landing = () => {
  return (
    <>
    <SidenavLayout>   
      
       <div>
        <ClockIn/>
      </div>



      </SidenavLayout>

    </>
  );
};

export default Landing;
