import express from 'express';

const router = express.Router();

// Simulated marketplace listings
let listings = [
  {
    id: '1',
    name: 'Fresh Thompson Grapes',
    type: 'grape',
    quantity: 500,
    price: 65,
    location: 'Nashik',
    seller: 'Rajesh Farms',
    sellerId: '1',
    quality: 'Premium',
    image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: '2025-03-10'
  },
  {
    id: '2',
    name: 'Organic Tomatoes',
    type: 'tomato',
    quantity: 300,
    price: 35,
    location: 'Pune',
    seller: 'Green Valley Farms',
    sellerId: '3',
    quality: 'Organic',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: '2025-03-12'
  },
  {
    id: '3',
    name: 'Black Grapes',
    type: 'grape',
    quantity: 250,
    price: 85,
    location: 'Nashik',
    seller: 'Sunshine Farms',
    sellerId: '4',
    quality: 'Premium',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: '2025-03-14'
  },
  {
    id: '4',
    name: 'Cherry Tomatoes',
    type: 'tomato',
    quantity: 150,
    price: 55,
    location: 'Pune',
    seller: 'Organic Harvests',
    sellerId: '5',
    quality: 'Organic',
    image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    createdAt: '2025-03-15'
  }
];

// @route   GET api/marketplace
// @desc    Get all marketplace listings
// @access  Public
router.get('/', (req, res) => {
  try {
    res.json(listings);
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/marketplace/:id
// @desc    Get a specific listing
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Find listing
    const listing = listings.find(listing => listing.id === id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    res.json(listing);
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/marketplace
// @desc    Create a new listing
// @access  Private
router.post('/', (req, res) => {
  try {
    const { name, type, quantity, price, quality, image } = req.body;
    
    // In a real app, seller info would come from authenticated user
    const seller = 'Rajesh Farms';
    const sellerId = '1';
    const location = 'Nashik';
    
    // Create new listing
    const newListing = {
      id: Date.now().toString(),
      name,
      type,
      quantity,
      price,
      location,
      seller,
      sellerId,
      quality,
      image,
      createdAt: new Date().toISOString()
    };
    
    // In a real app, this would save to MongoDB
    listings.push(newListing);
    
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/marketplace/:id
// @desc    Update a listing
// @access  Private
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, price } = req.body;
    
    // Find listing index
    const listingIndex = listings.findIndex(listing => listing.id === id);
    
    if (listingIndex === -1) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Update listing
    listings[listingIndex] = {
      ...listings[listingIndex],
      quantity,
      price
    };
    
    res.json(listings[listingIndex]);
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/marketplace/:id
// @desc    Delete a listing
// @access  Private
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Find listing index
    const listingIndex = listings.findIndex(listing => listing.id === id);
    
    if (listingIndex === -1) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Remove listing
    listings = listings.filter(listing => listing.id !== id);
    
    res.json({ message: 'Listing removed' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;