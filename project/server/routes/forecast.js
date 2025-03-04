import express from 'express';

const router = express.Router();

// Simulated forecast data
const forecastData = {
  grape: {
    crop: 'Grapes',
    currentPrice: 65,
    priceChange: 5.2,
    forecastPrices: [65, 67, 70, 72, 75, 73, 71, 70, 68, 67, 69, 72, 74, 75],
    demand: 'High',
    demandTrend: 'up',
    recommendation: 'Consider holding your grape stock for 5-7 days as prices are expected to peak. The upcoming festival season is driving increased demand in urban markets.'
  },
  tomato: {
    crop: 'Tomatoes',
    currentPrice: 35,
    priceChange: -2.8,
    forecastPrices: [35, 34, 32, 30, 29, 28, 27, 26, 28, 30, 33, 35, 36, 37],
    demand: 'Moderate',
    demandTrend: 'down',
    recommendation: 'Current oversupply is pushing prices down. Consider selling quickly or exploring cold storage options for 7-10 days until prices stabilize and begin to recover.'
  }
};

// @route   GET api/forecast/:crop
// @desc    Get forecast for a specific crop
// @access  Private
router.get('/:crop', (req, res) => {
  try {
    const { crop } = req.params;
    
    if (!forecastData[crop]) {
      return res.status(404).json({ message: 'Forecast not found for this crop' });
    }
    
    // In a real app, this would call an AI API for real-time forecasting
    // For simulation, we'll just return the mock data
    res.json(forecastData[crop]);
  } catch (error) {
    console.error('Get forecast error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/forecast/analyze
// @desc    Analyze crop image for quality and spoilage detection
// @access  Private
router.post('/analyze', (req, res) => {
  try {
    const { cropType, imageUrl } = req.body;
    
    // In a real app, this would call an AI API for image analysis
    // For simulation, we'll just return mock data
    
    let analysis;
    
    if (cropType === 'grape') {
      analysis = {
        quality: 'Good',
        spoilageRisk: 'Low',
        estimatedShelfLife: '14 days',
        recommendations: [
          'Store at 0-2°C with 90-95% humidity',
          'Ensure proper ventilation to prevent moisture buildup'
        ]
      };
    } else if (cropType === 'tomato') {
      analysis = {
        quality: 'Medium',
        spoilageRisk: 'Medium',
        estimatedShelfLife: '7 days',
        recommendations: [
          'Store at 10-12°C with 85-90% humidity',
          'Avoid stacking to prevent bruising'
        ]
      };
    } else {
      return res.status(400).json({ message: 'Unsupported crop type' });
    }
    
    res.json(analysis);
  } catch (error) {
    console.error('Analyze crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;