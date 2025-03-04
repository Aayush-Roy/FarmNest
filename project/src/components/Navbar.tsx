import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Home, ShoppingCart, BarChart2, Thermometer, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-bold">FarmNest</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                <Home className="mr-1 h-4 w-4" />
                Dashboard
              </Link>
              <Link to="/marketplace" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                <ShoppingCart className="mr-1 h-4 w-4" />
                Marketplace
              </Link>
              <Link to="/forecast" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                <BarChart2 className="mr-1 h-4 w-4" />
                Forecast
              </Link>
              <Link to="/cold-storage" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                <Thermometer className="mr-1 h-4 w-4" />
                Cold Storage
              </Link>
              <Link to="/profile" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                <User className="mr-1 h-4 w-4" />
                Profile
              </Link>
              <button 
                onClick={handleLogout} 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/dashboard" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              to="/marketplace" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Marketplace
            </Link>
            <Link 
              to="/forecast" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Forecast
            </Link>
            <Link 
              to="/cold-storage" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <Thermometer className="mr-2 h-4 w-4" />
              Cold Storage
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
            <button 
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }} 
              className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;