'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Career', href: '/career' },
    { name: 'Passion Works', href: '/passion-works' },
    { name: 'Availability', href: '/availability' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-sm shadow-md sticky top-0 z-50 rounded-b-xl mx-auto mt-2 max-w-6xl">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-poppins font-bold text-gray-800 hover:text-gray-900 transition-colors duration-300">
          <span className="text-whitish-silver text-shadow-lg">Akassnidi Karunanithi</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none rounded-b-lg md:rounded-none py-4 md:py-0 px-4 md:px-0`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`
                relative text-lg font-medium py-2 md:py-0 block md:inline-block
                hover:text-gray-900 transition-all duration-300
                ${pathname === link.href ? 'text-gray-900 font-semibold' : 'text-gray-600'}
                ${pathname === link.href ? 'after:scale-x-100' : 'after:scale-x-0'}
                after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900 after:transition-transform after:duration-300 after:origin-left
              `}
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;