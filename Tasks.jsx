import React, { useEffect, useState } from "react";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [inputTask, setInputTask] = useState("");
    const [filter, setFilter] = useState("all");

    // Load tasks from local storage 
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) setTasks(savedTasks);
    }, []);

    // Store tasks in local storage 
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (inputTask.trim() === "") return;
        setTasks([...tasks, { text: inputTask, completed: false }]);
        setInputTask("");
    };

    const toggleTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "all") return true;
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    return (
        <div className="w-md mx-auto text-white bg-slate-700 p-3 rounded-md shadow-lg">
            <h1 className="text-2xl text-center mb-4">Task Manager</h1>

            {/* User input field */}

            <input
                type="text"
                value={inputTask}
                onChange={(e) => setInputTask(e.target.value)}
                className="border p-2 w-full rounded text-lg"
                placeholder="Add a new task..."
            />
            <button
                onClick={addTask}
                className="w-32 mt-2 relative cursor-pointer left-[32%] bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
            >
                Add Task
            </button>

            {/* Filter Buttons */}

            <div className="w-full mt-2 p-3 flex gap-2 flex-wrap justify-evenly">
                <button onClick={() => setFilter("all")} className="p-2 rounded cursor-pointer border-1  border-black">
                    All
                </button>
                <button onClick={() => setFilter("pending")} className="p-2 rounded cursor-pointer border-1 border-black">
                    Pending
                </button>
                <button onClick={() => setFilter("completed")} className="p-2 rounded cursor-pointer border-1 border-black">
                    Completed
                </button>
            </div>

            {/* Task List */}

            <ul className="mt-4">
                {filteredTasks.map((task, index) => (
                    <li key={index} className="flex justify-between p-2 border-b">
                        <span
                            className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                            onClick={() => toggleTask(index)}
                        >
                            {task.text}
                        </span>
                        <button onClick={() => deleteTask(index)} className="text-red-500">
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tasks;
