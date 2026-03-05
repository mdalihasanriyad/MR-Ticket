import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navber = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/changelog">Changelog</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/download">Download</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <Link to="/" className="text-2xl font-semibold">
             CS — Ticket System
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex items-center gap-4">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/changelog">Changelog</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/download">Download</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <button className="btn btn-primary">
            <FaPlus />
            New Ticket
          </button>
        </div>
        <div className="navbar-end lg:hidden">
          <button className="btn btn-primary btn-sm">
            <FaPlus />
            New Ticket
          </button>
        </div>

      </div>
    </div>
  );
};

export default Navber;