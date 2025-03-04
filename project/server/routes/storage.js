import express from 'express';

const router = express.Router();

// Simulated storage facilities
const facilities = [
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
];

// Simulated storage bookings
let bookings = [];

// @route   GET api/storage
// @desc    Get all storage facilities
// @access  Public
router.get('/', (req, res) => {
  try {
    res.json(facilities);
  } catch (error) {
    console.error('Get facilities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/storage/:id
// @desc    Get a specific storage facility
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Find facility
    const facility = facilities.find(facility => facility.id === id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    res.json(facility);
  } catch (error) {
    console.error('Get facility error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/storage/book
// @desc    Book a storage facility
// @access  Private
router.post('/book', (req, res) => {
  try {
    const { facilityId, cropId, quantity, startDate, endDate } = req.body;
    
    // Find facility
    const facility = facilities.find(facility => facility.id === facilityId);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    // Check if there's enough space
    if (facility.availableSpace < quantity) {
      return res.status(400).json({ message: 'Not enough space available' });
    }
    
    // Create booking
    const booking = {
      id: Date.now().toString(),
      userId: '1', // In a real app, this would be req.user.id
      facilityId,
      cropId,
      quantity,
      startDate,
      endDate,
      totalCost: facility.costPerDay * ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    // In a real app, this would save to MongoDB
    bookings.push(booking);
    
    // Update available space
    const facilityIndex = facilities.findIndex(f => f.id === facilityId);
    facilities[facilityIndex].availableSpace -= quantity;
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Book storage error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/storage/bookings
// @desc    Get all bookings for a user
// @access  Private
router.get('/bookings', (req, res) => {
  try {
    // In a real app, this would filter by the authenticated user's ID
    // const userBookings = bookings.filter(booking => booking.userId === req.user.id);
    
    // For simulation, we'll just return all bookings
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;