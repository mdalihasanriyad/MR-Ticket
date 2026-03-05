import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle } from "lucide-react";
import { FiCalendar } from "react-icons/fi";
import BgImage from "../assets/vector1.png";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [resolvedTasks, setResolvedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      toast.warning("This ticket is already in progres!");
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="relative overflow-hidden rounded-xl p-10 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500"></div>
          <div
            className="absolute inset-0 opacity-90 bg-cover bg-left w-44"
            style={{ backgroundImage: `url(${BgImage})` }}
          ></div>
          <div
            className="absolute right-0 top-0 h-full w-48 bg-no-repeat bg-right scale-x-[-1] bg-cover opacity-90"
            style={{ backgroundImage: `url(${BgImage})` }}
          ></div>
          <div className="relative z-10 text-center">
            <p className="text-lg font-medium opacity-90">In-Progress</p>
            <h2 className="text-6xl font-bold mt-3">
              {inProgressTasks.length}
            </h2>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl p-10 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-600"></div>
          <div
            className="absolute left-0 top-0 h-full w-48 bg-no-repeat bg-left bg-cover opacity-90"
            style={{ backgroundImage: `url(${BgImage})` }}
          ></div>
          <div
            className="absolute right-0 top-0 h-full w-48 bg-no-repeat bg-right scale-x-[-1] bg-cover opacity-90"
            style={{ backgroundImage: `url(${BgImage})` }}
          ></div>
          <div className="relative z-10 text-center">
            <p className="text-lg font-medium opacity-90">Resolved</p>
            <h2 className="text-6xl font-bold mt-3">{resolvedTasks.length}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <h3 className="text-lg font-bold mb-6">Customer Tickets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => handleAddToProgress(ticket)}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >

                <div className="flex  justify-between items-start mb-3">
                  <h4 className="font-bold text-[15px] mb-2 group-hover:text-indigo-600 transition">
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

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {ticket.description}
                </p>

                <div className="flex justify-between items-center text-xs text-gray-400">
                  <div className="gap-2 flex items-center">
                    #{ticket.id}
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        ticket.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : ticket.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    {ticket.customer}
                    <span className="mx-1">
                      <FiCalendar />
                    </span>
                    {ticket.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm ">
            <h3 className="text-lg font-semibold mb-5">Task Status</h3>

            {inProgressTasks.length === 0 && (
              <p className="text-sm text-gray-400 italic">
                Select a ticket to add to Task Status
              </p>
            )}

            {inProgressTasks.map((task) => (
              <div key={task.id} className="bg-gray-50 p-4 rounded-xl mb-3 ">
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
