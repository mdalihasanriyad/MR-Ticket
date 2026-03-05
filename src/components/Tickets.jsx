
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/react-toastify.css';
import { Mail, CheckCircle } from 'lucide-react';

// কাস্টম ডাটা (JSON)
const initialTickets = [
  { id: 1001, title: "Login Issues - Can't Access Account", description: "Customer is unable to log in to their account. They've tried resetting their password multiple times but still...", customer: "John Smith", priority: "HIGH PRIORITY", status: "Open", createdAt: "1/15/2024" },
  { id: 1002, title: "Payment Failed - Card Declined", description: "Customer attempted to pay using Visa ending 1234 but the payment keeps failing despite sufficient balance.", customer: "Sarah Johnson", priority: "HIGH PRIORITY", status: "Open", createdAt: "1/16/2024" },
  { id: 1003, title: "Unable to Download Invoice", description: "Customer cannot download their January invoice from the billing section. The download button is...", customer: "Michael Brown", priority: "MEDIUM PRIORITY", status: "In-Progress", createdAt: "1/17/2024" },
  { id: 1004, title: "Incorrect Billing Address", description: "Customer's billing address shows a different city. They updated it but it still displays the old one.", customer: "Emily Davis", priority: "LOW PRIORITY", status: "Open", createdAt: "1/18/2024" },
  { id: 1005, title: "App Crash on Launch", description: "Customer reports that the mobile app crashes immediately upon opening on Android 13.", customer: "David Wilson", priority: "HIGH PRIORITY", status: "Open", createdAt: "1/19/2024" },
  { id: 1006, title: "Refund Not Processed", description: "Customer requested a refund two weeks ago but has not received the amount yet.", customer: "Sophia Taylor", priority: "MEDIUM PRIORITY", status: "In-Progress", createdAt: "1/20/2024" },
];

const Tickets = () => {
    const [tickets, setTickets] = useState(initialTickets);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [resolvedTasks, setResolvedTasks] = useState([]);

  // Task Status এ অ্যাড করার ফাংশন
  const handleAddToProgress = (ticket) => {
    const isAlreadyAdded = inProgressTasks.find(t => t.id === ticket.id);
    if (isAlreadyAdded) {
      toast.warning("This ticket is already in progress!");
      return;
    }
    setInProgressTasks([...inProgressTasks, ticket]);
    toast.success("Added to Task Status!");
  };

  // Complete করার ফাংশন
  const handleComplete = (ticket) => {
    // ১. প্রগ্রেস থেকে রিমুভ
    setInProgressTasks(inProgressTasks.filter(t => t.id !== ticket.id));
    // ২. রিজলভড লিস্টে অ্যাড
    setResolvedTasks([...resolvedTasks, ticket]);
    // ৩. মেইন লিস্ট থেকে রিমুভ
    setTickets(tickets.filter(t => t.id !== ticket.id));
    
    toast.info("Ticket Resolved Successfully!");
  };
    return (
        <main className="flex-grow max-w-[1500px] mx-auto w-full p-4 md:p-8">
        {/* Banner Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] p-8 rounded-2xl text-center text-white">
            <p className="text-sm opacity-80 mb-2 font-medium tracking-wide">In-Progress</p>
            <h2 className="text-5xl font-bold">{inProgressTasks.length}</h2>
          </div>
          <div className="bg-gradient-to-r from-[#10b981] to-[#3b82f6] p-8 rounded-2xl text-center text-white">
            <p className="text-sm opacity-80 mb-2 font-medium tracking-wide">Resolved</p>
            <h2 className="text-5xl font-bold">{resolvedTasks.length}</h2>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Ticket Cards */}
          <div className="lg:col-span-8">
            <h3 className="text-lg font-bold mb-6">Customer Tickets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tickets.map(ticket => (
                <div 
                  key={ticket.id} 
                  onClick={() => handleAddToProgress(ticket)}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold flex items-center gap-1 ${ticket.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${ticket.status === 'Open' ? 'bg-green-500' : 'bg-orange-500'}`}></div> {ticket.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm mb-2 group-hover:text-[#6366f1]">{ticket.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{ticket.description}</p>
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium">
                    <span className="text-red-500">#{ticket.id} {ticket.priority}</span>
                    <span>{ticket.customer} • {ticket.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Task Status & Resolved List */}
          <div className="lg:col-span-4 space-y-8">
            {/* Task Status */}
            <div>
              <h3 className="text-lg font-bold mb-6">Task Status</h3>
              <div className="space-y-3">
                {inProgressTasks.length === 0 && <p className="text-sm text-gray-400 italic">Select a ticket to add to Task Status</p>}
                {inProgressTasks.map(task => (
                  <div key={task.id} className="bg-white p-4 rounded-xl border border-gray-200">
                    <p className="text-sm font-semibold mb-3">{task.title}</p>
                    <button 
                      onClick={() => handleComplete(task)}
                      className="w-full bg-[#10b981] hover:bg-green-600 text-white text-xs font-bold py-2 rounded-lg transition-colors"
                    >
                      Complete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolved Task List */}
            <div>
              <h3 className="text-lg font-bold mb-4">Resolved Task</h3>
              <div className="space-y-2">
                {resolvedTasks.length === 0 && <p className="text-sm text-gray-400 italic">No resolved tasks yet.</p>}
                {resolvedTasks.map(task => (
                  <div key={task.id} className="bg-blue-50 p-3 rounded-lg flex items-center gap-2 text-blue-700 font-medium text-xs">
                    <CheckCircle size={14} /> {task.title}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    );
};

export default Tickets;