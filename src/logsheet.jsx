import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Logsheet = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const [editIndex, setEditIndex] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState("");
    const [logData, setLogData] = useState(
        days.map(day => ({
            day,
            projectName: "Project Name",
            companyName: "Company Name",
            totalHours: "Total Hours",
            description: "Description"
        }))
    );

    const handleEditClick = (index) => {
        setEditIndex(index === editIndex ? null : index);
    };

    const handleChange = (index, field, value) => {
        const updatedLogData = [...logData];
        updatedLogData[index][field] = value;
        setLogData(updatedLogData);
    };

    return (
        
            <div className="w-full p-4 space-y-4">
                <div className="justify-center flex items-center space-x-2 p-4 rounded-lg">
                    <CalendarTodayIcon className="text-blue-500" />
                    <input 
                        type="week" 
                        value={selectedWeek} 
                        onChange={(e) => setSelectedWeek(e.target.value)}
                        className="p-2 border rounded-md"
                    />
                </div>
                {logData.map((log, index) => (
                    <div key={index} className="w-full bg-white shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">{log.day}</h2>
                            <EditIcon 
                                className="text-blue-500 cursor-pointer"
                                onClick={() => handleEditClick(index)}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {editIndex === index ? (
                                    <input 
                                        type="text" 
                                        value={log.projectName} 
                                        onChange={(e) => handleChange(index, "projectName", e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                ) : (
                                    <p className="w-full p-2 border rounded-md ">{log.projectName}</p>
                                )}

                                {editIndex === index ? (
                                    <input 
                                        type="text" 
                                        value={log.companyName} 
                                        onChange={(e) => handleChange(index, "companyName", e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                ) : (
                                    <p className="w-full p-2 border rounded-md ">{log.companyName}</p>
                                )}

                                {editIndex === index ? (
                                    <input 
                                        type="text" 
                                        value={log.totalHours} 
                                        onChange={(e) => handleChange(index, "totalHours", e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                ) : (
                                    <p className="w-full p-2 border rounded-md ">{log.totalHours}</p>
                                )}
                            </div>
                            {editIndex === index ? (
                                <textarea
                                    value={log.description}
                                    onChange={(e) => handleChange(index, "description", e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                            ) : (
                                <p className="p-2 border rounded-md ">{log.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
    );
};

export default Logsheet;
