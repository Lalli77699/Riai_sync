import React from "react";
import ClockIn from "clockin/clockin";
import MenuCard from "menucard/menucard";
import MyTask from "clockin/Mytask";
import Sheet from "clockin/sheet";
import { useSelector } from "react-redux";

const Landing = () => {
  const user = useSelector((state) => state.user.user);

  // Show nothing or a loader until user is fully available and role_id is set
  if (!user || user.role_id === undefined || user.role_id === null) {
    return null; // or return a loader component here
  }

  const admin = user.role_id === 1 || user.role_id === 2;

  return (
    <div className="flex flex-row w-full">
      {admin ? (
        <div className="flex-1">
          <Sheet />
        </div>
      ) : (
        <>
          <div className="flex-1">
            <MenuCard />
          </div>
          <div className="w-1/4 flex flex-col gap-4 items-end pr-4">
            <ClockIn />
            <MyTask />
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
