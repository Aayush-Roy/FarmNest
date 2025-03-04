import React, { useState, useEffect } from 'react';
import { Thermometer, MapPin, Clock, Truck, Search, Filter, Droplet } from 'lucide-react';

interface StorageFacility {
  id: string;
  name: string;
  location: string;
  distance: number;
  availableSpace: number;
  temperature: number;
  humidity: number;
  costPerDay: number;
  rating: number;
  features: string[];
}

const ColdStorage: React.FC = () => {
  const [facilities, setFacilities] = useState<StorageFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    location: '',
    minSpace: '',
    maxCost: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulating API call to fetch storage facilities
    const fetchFacilities = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await axios.get('http://localhost:5000/api/storage');
        // setFacilities(response.data);
        
        // Simulated data
        setTimeout(() => {
          setFacilities([
            {
              id: '1',
              name: 'Nashik Cold Storage Hub',
              location: 'Nashik',
              distance: 5.2,
              availableSpace: 1200,
              temperature: 2,
              humidity: 85,
              costPerDay: 12,
              rating: 4.5,
              features: ['Temperature Control', 'Humidity Control', 'Power Backup', 'Security']
            },
            {
              id: '2',
              name: 'Grape Valley Storage',
              location: 'Nashik',
              distance: 7.8,
              availableSpace: 800,
              temperature: 1,
              humidity: 90,
              costPerDay: 10,
              rating: 4.2,
              features: ['Temperature Control', 'Humidity Control', 'Power Backup']
            },
            {
              id: '3',
              name: 'Pune Fresh Preserve',
              location: 'Pune',
              distance: 12.5,
              availableSpace: 1500,
              temperature: 3,
              humidity: 80,
              costPerDay: 15,
              rating: 4.7,
              features: ['Temperature Control', 'Humidity Control', 'Power Backup', 'Security', 'Quality Monitoring']
            },
            {
              id: '4',
              name: 'AgriCool Storage',
              location: 'Pune',
              distance: 15.2,
              availableSpace: 600,
              temperature: 2,
              humidity: 85,
              costPerDay: 11,
              rating: 4.0,
              features: ['Temperature Control', 'Humidity Control', 'Security']
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching storage facilities:', error);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredFacilities = facilities.filter(facility => {
    return (
      (filter.location === '' || facility.location === filter.location) &&
      (filter.minSpace === '' || facility.availableSpace >= parseInt(filter.minSpace)) &&
      (filter.maxCost === '' || facility.costPerDay <= parseInt(filter.maxCost)) &&
      (searchTerm === '' || 
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleBook = (facilityId: string) => {
    // In a real app, this would initiate a booking flow
    alert(`Initiating booking for facility ${facilityId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cold Storage Facilities</h1>
        <p className="text-gray-600">Find and book cold storage facilities to preserve your produce</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={filter.location}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  <option value="Nashik">Nashik</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="minSpace" className="block text-sm font-medium text-gray-700 mb-1">
                  Min Available Space (kg)
                </label>
                <input
                  type="number"
                  id="minSpace"
                  name="minSpace"
                  value={filter.minSpace}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
              
              <div>
                <label htmlFor="maxCost" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Cost per Day (₹)
                </label>
                <input
                  type="number"
                  id="maxCost"
                  name="maxCost"
                  value={filter.maxCost}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
              
              <div className="pt-2">
                <button
                  onClick={() => setFilter({ location: '', minSpace: '', maxCost: '' })}
                  className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Facility Listings */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search facilities or locations..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredFacilities.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Thermometer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFacilities.map((facility) => (
                <div key={facility.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{facility.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{facility.location} ({facility.distance} km away)</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-gray-700">{facility.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-lg font-bold text-blue-600">₹{facility.costPerDay}/day</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 px-4 py-3 rounded-md flex items-center">
                        <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
                        <div>
                          <p className="text-xs text-blue-700">Temperature</p>
                          <p className="font-medium">{facility.temperature}°C</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 px-4 py-3 rounded-md flex items-center">
                        <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                        <div>
                          <p className="text-xs text-blue-700">Humidity</p>
                          <p className="font-medium">{facility.humidity}%</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 px-4 py-3 rounded-md flex items-center">
                        <Clock className="h-5 w-5 text-blue-500 mr-2" />
                        <div>
                          <p className="text-xs text-blue-700">Available Space</p>
                          <p className="font-medium">{facility.availableSpace} kg</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {facility.features.map((feature, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <Truck className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">Transport available on request</span>
                      </div>
                      <button
                        onClick={() => handleBook(facility.id)}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Book Storage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColdStorage;