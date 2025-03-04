import express from 'express';

const router = express.Router();

// Simulated crop database
let crops = [
  {
    _id: '1',
    userId: '1',
    cropType: 'grape',
    quantity: 500,
    harvestDate: '2025-03-15',
    status: 'stored',
    createdAt: '2025-03-10'
  },
  {
    _id: '2',
    userId: '1',
    cropType: 'tomato',
    quantity: 300,
    harvestDate: '2025-03-20',
    status: 'listed',
    createdAt: '2025-03-12'
  }
];

// @route   GET api/crops
// @desc    Get all crops for a user
// @access  Private
router.get('/', (req, res) => {
  try {
    // In a real app, this would filter by the authenticated user's ID
    // const userCrops = crops.filter(crop => crop.userId === req.user.id);
    
    // For simulation, we'll just return all crops
    res.json(crops);
  } catch (error) {
    console.error('Get crops error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/crops
// @desc    Add a new crop
// @access  Private
router.post('/', (req, res) => {
  try {
    const { cropType, quantity, harvestDate } = req.body;
    
    // Create new crop
    const newCrop = {
      _id: Date.now().toString(),
      userId: '1', // In a real app, this would be req.user.id
      cropType,
      quantity,
      harvestDate,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    
    // In a real app, this would save to MongoDB
    crops.push(newCrop);
    
    res.status(201).json(newCrop);
  } catch (error) {
    console.error('Add crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/crops/:id
// @desc    Update a crop
// @access  Private
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Find crop index
    const cropIndex = crops.findIndex(crop => crop._id === id);
    
    if (cropIndex === -1) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    // Update crop
    crops[cropIndex] = {
      ...crops[cropIndex],
      status
    };
    
    res.json(crops[cropIndex]);
  } catch (error) {
    console.error('Update crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/crops/:id
// @desc    Delete a crop
// @access  Private
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Find crop index
    const cropIndex = crops.findIndex(crop => crop._id === id);
    
    if (cropIndex === -1) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    // Remove crop
    crops = crops.filter(crop => crop._id !== id);
    
    res.json({ message: 'Crop removed' });
  } catch (error) {
    console.error('Delete crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;