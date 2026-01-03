import { Code2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <Code2 size={22} />
          CODEMATE
        </div>

        {/* Nav Links */}
        <div className="flex gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-500 hover:text-black"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/recent"
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-500 hover:text-black"
            }
          >
            Recent Views
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-500 hover:text-black"
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
