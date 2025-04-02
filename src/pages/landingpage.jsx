import React from "react";
import ClockIn from "clockin/clockin";
import MenuCard from "menucard/menucard";
import MyTask from "clockin/Mytask";

const Landing = () => {
  return (
    <div className="flex flex-row w-full">
      {/* ClockIn takes fixed width */}
      {/* MenuCard takes remaining width */}
      <div className="flex-1">
        <MenuCard />
      </div>
      <div className="w-1/4 flex flex-col gap-4 items-end pr-4">
        <ClockIn />
        <MyTask />
      </div>
    </div>
  );
};

export default Landing;
