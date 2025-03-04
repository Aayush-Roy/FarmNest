import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, TrendingDown, Calendar, Info } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ForecastData {
  crop: string;
  currentPrice: number;
  priceChange: number;
  forecastPrices: number[];
  demand: string;
  demandTrend: 'up' | 'down' | 'stable';
  recommendation: string;
}

const Forecast: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('grape');
  const [forecastPeriod, setForecastPeriod] = useState<string>('7');
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchForecastData = async () => {
      setLoading(true);
      
      // Simulating API call to AI service
      setTimeout(() => {
        // This would be data from an AI API in a real application
        const mockData: Record<string, ForecastData> = {
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
        
        setForecastData(mockData[selectedCrop]);
        setLoading(false);
      }, 1000);
    };
    
    fetchForecastData();
  }, [selectedCrop, forecastPeriod]);

  const chartData: ChartData<'line'> = {
    labels: Array.from({ length: parseInt(forecastPeriod) }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: `${forecastData?.crop || ''} Price Forecast (₹/kg)`,
        data: forecastData?.forecastPrices.slice(0, parseInt(forecastPeriod)) || [],
        borderColor: 'rgb(22, 163, 74)',
        backgroundColor: 'rgba(22, 163, 74, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `₹${context.parsed.y}/kg`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            return '₹' + value;
          }
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Price & Demand Forecast</h1>
        <p className="text-gray-600">AI-powered predictions to help you make informed decisions</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">
              Select Crop
            </label>
            <select
              id="crop"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="grape">Grapes</option>
              <option value="tomato">Tomatoes</option>
            </select>
          </div>
          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
              Forecast Period (Days)
            </label>
            <select
              id="period"
              value={forecastPeriod}
              onChange={(e) => setForecastPeriod(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="7">7 Days</option>
              <option value="14">14 Days</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Current Price</h3>
                  <BarChart2 className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">₹{forecastData?.currentPrice}/kg</p>
                <div className={`flex items-center mt-1 ${forecastData?.priceChange && forecastData.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {forecastData?.priceChange && forecastData.priceChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(forecastData?.priceChange || 0).toFixed(1)}% {forecastData?.priceChange && forecastData.priceChange >= 0 ? 'increase' : 'decrease'}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Demand Forecast</h3>
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{forecastData?.demand}</p>
                <div className={`flex items-center mt-1 ${
                  forecastData?.demandTrend === 'up' ? 'text-green-600' : 
                  forecastData?.demandTrend === 'down' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {forecastData?.demandTrend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : forecastData?.demandTrend === 'down' ? (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  ) : (
                    <span className="h-4 w-4 mr-1">→</span>
                  )}
                  <span>Trend: {forecastData?.demandTrend === 'up' ? 'Increasing' : forecastData?.demandTrend === 'down' ? 'Decreasing' : 'Stable'}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Optimal Selling Period</h3>
                  <Info className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {forecastData?.demandTrend === 'up' ? '5-7 days' : 
                   forecastData?.demandTrend === 'down' ? 'Immediate' : '3-5 days'}
                </p>
                <div className="text-gray-600 mt-1">
                  <span>Based on price and demand trends</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Price Forecast Chart</h3>
              <div className="h-80">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">AI Recommendation</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>{forecastData?.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Forecast;