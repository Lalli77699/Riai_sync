import { useState } from "react";

const Poll = () => {
    const [thought, setThought] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [options, setOptions] = useState(["Option 1", "Option 2"]);
    
    const handleVote = () => {
        if (selectedOption !== null) {
            setSubmitted(true);
        }
    };

    const addOption = () => {
        setOptions([...options, `Option ${options.length + 1}`]);
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Your Thought</h2>
            <textarea 
                className="w-full p-2 border rounded-lg mb-4" 
                placeholder="Add your thought..." 
                value={thought} 
                onChange={(e) => setThought(e.target.value)}
            />
            {!submitted ? (
                <div>
                    {options.map((option, index) => (
                        <label key={index} className="block p-2 border rounded-lg mb-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="poll" 
                                value={option} 
                                checked={selectedOption === option}
                                onChange={() => setSelectedOption(option)}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                    <button 
                        onClick={addOption} 
                        className="w-full bg-gray-300 text-black p-2 rounded-lg mt-2 hover:bg-gray-400">
                        + Add Option
                    </button>
                    <button 
                        onClick={handleVote} 
                        className="w-full bg-blue-500 text-white p-2 rounded-lg mt-2 hover:bg-blue-700">
                        Submit Vote
                    </button>
                </div>
            ) : (
                <p className="text-green-600 font-semibold">Thank you for voting!</p>
            )}
        </div>
    );
};

export default Poll;
