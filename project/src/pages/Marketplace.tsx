import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, Filter, Search, Tag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  location: string;
  seller: string;
  quality: string;
  image: string;
}

const Marketplace: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulating API call to fetch products
    const fetchProducts = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await axios.get('http://localhost:5000/api/marketplace');
        // setProducts(response.data);
        
        // Simulated data
        setTimeout(() => {
          setProducts([
            {
              id: '1',
              name: 'Fresh Thompson Grapes',
              type: 'grape',
              quantity: 500,
              price: 65,
              location: 'Nashik',
              seller: 'Rajesh Farms',
              quality: 'Premium',
              image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            },
            {
              id: '2',
              name: 'Organic Tomatoes',
              type: 'tomato',
              quantity: 300,
              price: 35,
              location: 'Pune',
              seller: 'Green Valley Farms',
              quality: 'Organic',
              image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            },
            {
              id: '3',
              name: 'Black Grapes',
              type: 'grape',
              quantity: 250,
              price: 85,
              location: 'Nashik',
              seller: 'Sunshine Farms',
              quality: 'Premium',
              image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            },
            {
              id: '4',
              name: 'Cherry Tomatoes',
              type: 'tomato',
              quantity: 150,
              price: 55,
              location: 'Pune',
              seller: 'Organic Harvests',
              quality: 'Organic',
              image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
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

  const filteredProducts = products.filter(product => {
    return (
      (filter.type === '' || product.type === filter.type) &&
      (filter.location === '' || product.location === filter.location) &&
      (filter.minPrice === '' || product.price >= parseInt(filter.minPrice)) &&
      (filter.maxPrice === '' || product.price <= parseInt(filter.maxPrice)) &&
      (searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleBuy = (productId: string) => {
    // In a real app, this would initiate a purchase flow
    alert(`Initiating purchase for product ${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
        <p className="text-gray-600">Find and purchase fresh produce directly from farmers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Produce Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={filter.type}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">All Types</option>
                  <option value="grape">Grapes</option>
                  <option value="tomato">Tomatoes</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={filter.location}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">All Locations</option>
                  <option value="Nashik">Nashik</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  value={filter.minPrice}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  min="0"
                />
              </div>
              
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  value={filter.maxPrice}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  min="0"
                />
              </div>
              
              <div className="pt-2">
                <button
                  onClick={() => setFilter({ type: '', location: '', minPrice: '', maxPrice: '' })}
                  className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Listings */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products or sellers..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">Seller: {product.seller}</p>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-lg font-bold text-green-600">₹{product.price}/kg</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-50 px-3 py-1.5 rounded-md">
                        <span className="text-gray-500">Quantity:</span> {product.quantity} kg
                      </div>
                      <div className="bg-gray-50 px-3 py-1.5 rounded-md">
                        <span className="text-gray-500">Location:</span> {product.location}
                      </div>
                      <div className="bg-gray-50 px-3 py-1.5 rounded-md">
                        <span className="text-gray-500">Type:</span> {product.type === 'grape' ? 'Grapes' : 'Tomatoes'}
                      </div>
                      <div className="bg-gray-50 px-3 py-1.5 rounded-md">
                        <span className="text-gray-500">Quality:</span> {product.quality}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        onClick={() => handleBuy(product.id)}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buy Now
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

export default Marketplace;