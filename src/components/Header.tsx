import React from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';

const Header: React.FC = () => {
  const scrollDirection = useScrollDirection();
  
  const menuItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Ideas', href: '#ideas', active: true },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/suitmedia-logo.png"
                alt="Suitmedia"
                className="h-8"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative text-dark-gray hover:text-orange transition-colors duration-200 ${
                    item.active ? 'text-orange' : ''
                  }`}
                >
                  {item.label}
                  {item.active && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange transform translate-y-6"></div>
                  )}
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg
                className="w-6 h-6 text-dark-gray"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;