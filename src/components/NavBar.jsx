import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="p-4 bg-blue-600 text-white flex justify-between">
    <Link to="/" className="font-bold">CareCompass</Link>
    <Link to="/results" className="hover:underline">Results</Link>
  </nav>
);

export default NavBar;