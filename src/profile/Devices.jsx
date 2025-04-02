import { useState } from "react";

const Devices = () => {
    const [devices, setDevices] = useState([
        { id: 1, name: "Device 1" },
        { id: 2, name: "Device 2" },
        { id: 3, name: "Device 3" }
    ]);

    const removeDevice = (id) => {
        setDevices(devices.filter(device => device.id !== id));
    };

    const removeAllDevices = () => {
        setDevices([]);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Connected Devices</h2>
            <ul>
                {devices.map(device => (
                    <li key={device.id} className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded">
                        <span>{device.name}</span>
                        <button 
                            onClick={() => removeDevice(device.id)} 
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            {devices.length > 0 && (
                <button 
                    onClick={removeAllDevices} 
                    className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Remove All
                </button>
            )}
        </div>
    );
};

export default Devices;
