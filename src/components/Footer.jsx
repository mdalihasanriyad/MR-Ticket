import React from 'react';
import { RiTwitterXFill, RiLinkedinFill, RiFacebookFill, RiMailFill } from "react-icons/ri";

const Footer = () => {
  return (
    // Wrapper to push footer to the bottom
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow">
        {/* আপনার পেজের অন্য সব কন্টেন্ট এখানে থাকবে */}
      </main>

      <footer className="bg-black text-[#9ca3af] py-16 px-4 md:px-10 font-sans border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto">
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
            
            {/* Logo and Description Section - 4 Columns */}
            <div className="lg:col-span-4">
              <h2 className="text-white text-[22px] font-bold mb-6 tracking-tight">
                CS — Ticket System
              </h2>
              <p className="text-[14px] leading-[1.6] max-w-[340px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a 
                type specimen book.
              </p>
            </div>

            {/* Links Sections - 2 Columns each */}
            <div className="lg:col-span-2">
              <h3 className="text-white text-[18px] font-semibold mb-7">Company</h3>
              <ul className="space-y-4 text-[14px]">
                <li><a href="#" className="hover:text-white transition-all">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-all">Our Mission</a></li>
                <li><a href="#" className="hover:text-white transition-all">Contact Sales</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-white text-[18px] font-semibold mb-7">Services</h3>
              <ul className="space-y-4 text-[14px]">
                <li><a href="#" className="hover:text-white transition-all">Products & Services</a></li>
                <li><a href="#" className="hover:text-white transition-all">Customer Stories</a></li>
                <li><a href="#" className="hover:text-white transition-all">Download Apps</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-white text-[18px] font-semibold mb-7">Information</h3>
              <ul className="space-y-4 text-[14px]">
                <li><a href="#" className="hover:text-white transition-all">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-all">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-all">Join Us</a></li>
              </ul>
            </div>

            {/* Social Links - 2 Columns */}
            <div className="lg:col-span-2">
              <h3 className="text-white text-[18px] font-semibold mb-7">Social Links</h3>
              <ul className="space-y-4 text-[14px]">
                <li className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-1"><RiTwitterXFill size={14} className="text-black" /></div>
                  <a href="#" className="hover:text-white transition-all">@CS — Ticket System</a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-1"><RiLinkedinFill size={14} className="text-black" /></div>
                  <a href="#" className="hover:text-white transition-all">@CS — Ticket System</a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-1"><RiFacebookFill size={14} className="text-black" /></div>
                  <a href="#" className="hover:text-white transition-all">@CS — Ticket System</a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-1"><RiMailFill size={14} className="text-black" /></div>
                  <a href="mailto:support@cst.com" className="hover:text-white transition-all">support@cst.com</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Area */}
          <div className="pt-8 border-t border-gray-800/50 text-center">
            <p className="text-[14px] text-gray-400">
              © 2025 CS — Ticket System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;