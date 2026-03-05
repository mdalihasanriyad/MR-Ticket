import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle } from "lucide-react";
import { FiCalendar } from "react-icons/fi";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [resolvedTasks, setResolvedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch JSON Data
  useEffect(() => {
    fetch("/tickets.json")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load tickets!");
        setLoading(false);
      });
  }, []);

  const handleAddToProgress = (ticket) => {
    const isAlreadyAdded = inProgressTasks.find((t) => t.id === ticket.id);
    if (isAlreadyAdded) {
      toast.warning("This ticket is already in progress!");
      return;
    }
    setInProgressTasks([...inProgressTasks, ticket]);
    toast.success("Added to Task Status!");
  };

  const handleComplete = (ticket) => {
    setInProgressTasks(inProgressTasks.filter((t) => t.id !== ticket.id));
    setResolvedTasks([...resolvedTasks, ticket]);
    setTickets(tickets.filter((t) => t.id !== ticket.id));
    toast.info("Ticket Resolved Successfully!");
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">Loading tickets...</div>
    );
  }

  return (
    <main className="flex-grow max-w-[1500px] mx-auto w-full p-4 md:p-8">
      <ToastContainer position="top-right" />

      {/* Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-8 rounded-2xl text-white text-center">
          <p className="text-sm mb-2 opacity-80">In-Progress</p>
          <h2 className="text-5xl font-bold">{inProgressTasks.length}</h2>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-emerald-600 p-8 rounded-2xl text-white text-center">
          <p className="text-sm mb-2 opacity-80">Resolved</p>
          <h2 className="text-5xl font-bold">{resolvedTasks.length}</h2>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Ticket Cards */}
        <div className="lg:col-span-8">
          <h3 className="text-lg font-bold mb-6">Customer Tickets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => handleAddToProgress(ticket)}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                {/* Status Badge */}
                <div className="flex  justify-between items-start mb-3">
                  

                {/* Title */}
                <h4 className="font-semibold text-[15px] mb-2 group-hover:text-indigo-600 transition">
                  {ticket.title}
                </h4>
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-2 ${
                      ticket.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        ticket.status === "Open"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></span>
                    {ticket.status}
                  </span>
                </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {ticket.description}
                </p>

                {/* Bottom Row */}
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span
                    className={`font-semibold ${
                      ticket.priority.includes("HIGH")
                        ? "text-red-500"
                        : ticket.priority.includes("MEDIUM")
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    #{ticket.id} {ticket.priority}
                  </span>

                  <span className="flex items-center gap-1">
                    {ticket.customer}
                    <span className="mx-1"><FiCalendar /></span>
                    {ticket.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Status */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm ">
            <h3 className="text-lg font-semibold mb-5">Task Status</h3>

            {inProgressTasks.length === 0 && (
              <p className="text-sm text-gray-400 italic">
                Select a ticket to add to Task Status
              </p>
            )}

            {inProgressTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-50 p-4 rounded-xl mb-3 "
              >
                <p className="text-sm font-semibold mb-3">{task.title}</p>

                <button
                  onClick={() => handleComplete(task)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-lg transition"
                >
                  Complete
                </button>
              </div>
            ))}
          </div>

          {/* Resolved */}
          <div className="bg-white p-6 rounded-2xl shadow-sm ">
            <h3 className="text-lg font-semibold mb-5">Resolved Task</h3>

            {resolvedTasks.length === 0 && (
              <p className="text-sm text-gray-400 italic">
                No resolved tasks yet.
              </p>
            )}

            {resolvedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-indigo-50 text-indigo-700 text-xs font-medium p-3 rounded-lg flex items-center gap-2 mb-2"
              >
                <CheckCircle size={14} />
                {task.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tickets;
