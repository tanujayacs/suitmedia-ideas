import React from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';

const Header: React.FC = () => {
  const { scrollDirection, isScrolled } = useScrollDirection();

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      } ${
        isScrolled ? 'bg-suitmedia-orange/90 backdrop-blur-sm' : 'bg-suitmedia-orange'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-white font-bold text-xl">
              Suitmedia
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-orange-100 transition-colors">
              Work
            </a>
            <a href="#" className="text-white hover:text-orange-100 transition-colors">
              About
            </a>
            <a href="#" className="text-white hover:text-orange-100 transition-colors">
              Services
            </a>
            <a href="#" className="text-white bg-white bg-opacity-20 px-4 py-2 rounded hover:bg-opacity-30 transition-colors">
              Ideas
            </a>
            <a href="#" className="text-white hover:text-orange-100 transition-colors">
              Careers
            </a>
            <a href="#" className="text-white hover:text-orange-100 transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-orange-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;