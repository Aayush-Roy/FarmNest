import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AgriTech Platform</h3>
            <p className="text-sm">
              Reducing post-harvest losses in fruits and vegetables through AI-powered forecasting and supply chain optimization.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/dashboard" className="hover:text-green-300">Dashboard</a></li>
              <li><a href="/marketplace" className="hover:text-green-300">Marketplace</a></li>
              <li><a href="/forecast" className="hover:text-green-300">Price & Demand Forecast</a></li>
              <li><a href="/cold-storage" className="hover:text-green-300">Cold Storage</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">
              Email: support@FarmNest.com<br />
              Phone: +91 1234567890<br />
              Address: Nashik, Maharashtra, India
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-green-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FarmNest Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;