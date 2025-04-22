import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Globe_icon.svg/2048px-Globe_icon.svg.png"
            alt="World Logo"
            className="h-10 w-10"
          />
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
            REST Countries Explorer
          </h1>
        </div>

        {/* Navigation Placeholder (Optional) */}
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
