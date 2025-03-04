import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Truck, TrendingUp, AlertTriangle, Droplet, Sun, Wind } from 'lucide-react';
import axios from 'axios';

interface CropEntry {
  _id: string;
  cropType: string;
  quantity: number;
  harvestDate: string;
  status: string;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
}

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [cropEntries, setCropEntries] = useState<CropEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 28,
    humidity: 65,
    condition: 'Sunny'
  });
  
  const [newCrop, setNewCrop] = useState({
    cropType: 'grape',
    quantity: 0,
    harvestDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Simulating API call to fetch crop entries
    const fetchCropEntries = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await axios.get('http://localhost:5000/api/crops');
        // setCropEntries(response.data);
        
        // Simulated data
        setTimeout(() => {
          setCropEntries([
            {
              _id: '1',
              cropType: 'grape',
              quantity: 500,
              harvestDate: '2025-03-15',
              status: 'stored'
            },
            {
              _id: '2',
              cropType: 'tomato',
              quantity: 300,
              harvestDate: '2025-03-20',
              status: 'listed'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching crop entries:', error);
        setLoading(false);
      }
    };

    fetchCropEntries();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewCrop({
      ...newCrop,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real app, this would be an API call
      // const response = await axios.post('http://localhost:5000/api/crops', newCrop);
      // setCropEntries([...cropEntries, response.data]);
      
      // Simulated response
      const newEntry: CropEntry = {
        _id: Date.now().toString(),
        ...newCrop,
        status: 'new'
      };
      
      setCropEntries([...cropEntries, newEntry]);
      
      // Reset form
      setNewCrop({
        cropType: 'grape',
        quantity: 0,
        harvestDate: new Date().toISOString().split('T')[0]
      });
      
    } catch (error) {
      console.error('Error adding crop entry:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Farmer Dashboard | Location: {user?.location}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Weather Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Current Weather</h2>
            {weatherData.condition === 'Sunny' ? (
              <Sun className="h-8 w-8 text-yellow-500" />
            ) : weatherData.condition === 'Rainy' ? (
              <Droplet className="h-8 w-8 text-blue-500" />
            ) : (
              <Wind className="h-8 w-8 text-gray-500" />
            )}
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-gray-600">Humidity: {weatherData.humidity}%</p>
            <p className="text-gray-600">Condition: {weatherData.condition}</p>
          </div>
        </div>

        {/* Market Trends Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Market Trends</h2>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Grapes</span>
              <span className="text-green-500">₹65/kg (+5%)</span>
            </div>
            <div className="flex justify-between">
              <span>Tomatoes</span>
              <span className="text-red-500">₹35/kg (-2%)</span>
            </div>
            <div className="mt-4">
              <a href="/forecast" className="text-green-600 hover:text-green-800 text-sm font-medium">
                View detailed forecast →
              </a>
            </div>
          </div>
        </div>

        {/* Alerts Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Alerts</h2>
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="space-y-3">
            <div className="p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-700">High demand for grapes expected next week</p>
            </div>
            <div className="p-2 bg-red-50 border-l-4 border-red-400 rounded">
              <p className="text-sm text-red-700">Risk of tomato spoilage due to high humidity</p>
            </div>
          </div>
        </div>

        {/* Transport Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Transport</h2>
            <Truck className="h-6 w-6 text-blue-500" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Available vehicles nearby: 5</p>
            <p className="text-sm text-gray-600">Average cost: ₹15/km</p>
            <div className="mt-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Request transport →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add New Crop Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Crop Entry</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Type
                </label>
                <select
                  id="cropType"
                  name="cropType"
                  value={newCrop.cropType}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="grape">Grapes</option>
                  <option value="tomato">Tomatoes</option>
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={newCrop.quantity}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  min="0"
                  required
                />
              </div>
              <div>
                <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Harvest Date
                </label>
                <input
                  type="date"
                  id="harvestDate"
                  name="harvestDate"
                  value={newCrop.harvestDate}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add Crop Entry
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Recent Crop Entries */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Crop Entries</h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : cropEntries.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No crop entries found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crop Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity (kg)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harvest Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cropEntries.map((entry) => (
                    <tr key={entry._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entry.cropType === 'grape' ? 'Grapes' : 'Tomatoes'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(entry.harvestDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${entry.status === 'stored' ? 'bg-blue-100 text-blue-800' : 
                            entry.status === 'listed' ? 'bg-green-100 text-green-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {entry.status === 'stored' ? 'In Storage' : 
                           entry.status === 'listed' ? 'Listed for Sale' : 'New'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;