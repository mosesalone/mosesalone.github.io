import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, Shield, Star } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary-600">
            <Shield size={28} className="stroke-primary-600" />
            <span className="text-xl font-bold tracking-tight">Dealver</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/' 
                ? 'text-primary-600' 
                : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/vouches" 
              className={`font-medium transition-colors duration-200 flex items-center ${
                location.pathname === '/vouches' 
                ? 'text-primary-600' 
                : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              <Star size={16} className="mr-1" />
              Vouches
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`font-medium transition-colors duration-200 ${
                    location.pathname === '/dashboard' 
                    ? 'text-primary-600' 
                    : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Dashboard
                </Link>
                
                {user?.isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`font-medium transition-colors duration-200 ${
                      location.pathname === '/admin' 
                      ? 'text-primary-600' 
                      : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                
                <button 
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`font-medium transition-colors duration-200 ${
                    location.pathname === '/login' 
                    ? 'text-primary-600' 
                    : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Login
                </Link>
                
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200 font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md animate-slide-down">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              onClick={closeMenu}
              className={`font-medium p-2 rounded-lg transition-colors duration-200 ${
                location.pathname === '/' 
                ? 'text-primary-600 bg-gray-100' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/vouches" 
              onClick={closeMenu}
              className={`font-medium p-2 rounded-lg transition-colors duration-200 flex items-center ${
                location.pathname === '/vouches' 
                ? 'text-primary-600 bg-gray-100' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
              }`}
            >
              <Star size={16} className="mr-1" />
              Vouches
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={closeMenu}
                  className={`font-medium p-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === '/dashboard' 
                    ? 'text-primary-600 bg-gray-100' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                  }`}
                >
                  Dashboard
                </Link>
                
                {user?.isAdmin && (
                  <Link 
                    to="/admin" 
                    onClick={closeMenu}
                    className={`font-medium p-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === '/admin' 
                      ? 'text-primary-600 bg-gray-100' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-200 font-medium text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={closeMenu}
                  className={`font-medium p-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === '/login' 
                    ? 'text-primary-600 bg-gray-100' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                  }`}
                >
                  Login
                </Link>
                
                <Link 
                  to="/register" 
                  onClick={closeMenu}
                  className="p-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200 font-medium text-center"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;