import { Card, CardContent } from "@mui/material";
import { FaPlus } from "react-icons/fa";

const MyTask = () => {
  return (
    <Card className="w-72 rounded-lg shadow-md">
      <div className="flex items-center justify-between bg-black text-white p-3 rounded-t-lg">
        <span className="font-semibold">MY TASKS</span>
        <FaPlus className="cursor-pointer" />
      </div>
      <CardContent className="p-0">
        {[
          "QA Approved",
          "Ongoing",
          "Back log",
          "Assigned",
        ].map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border-b last:border-b-0"
          >
            <span className="text-gray-600">{task}</span>
            <div className="flex items-center gap-3">
              <span className="text-green-400 bg-red-100 rounded-full px-2 text-sm font-semibold">0</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MyTask;