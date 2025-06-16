const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-700">HealthFinder</h1>
        <nav className="space-x-4 text-sm text-gray-600">
          <a href="/" className="hover:text-indigo-700">Home</a>
          <a href="#about" className="hover:text-indigo-700">About</a>
          <a href="#contact" className="hover:text-indigo-700">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;