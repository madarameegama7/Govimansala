/**
 * Revenue Service
 * Handles API calls for revenue and order management
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Fetch all orders with revenue information
 * @returns {Promise<Array>} - Array of orders
 */
export const fetchRevenueOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/revenue/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication token if required
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch revenue orders');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching revenue orders:', error);
    // Return mock data for development
    return getMockRevenueOrders();
  }
};

/**
 * Fetch a single order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} - Order details
 */
export const fetchOrderById = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/revenue/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} status - New status
 * @returns {Promise<Object>} - Updated order
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/revenue/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update order status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

/**
 * Get revenue statistics
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Promise<Object>} - Revenue statistics
 */
export const fetchRevenueStatistics = async (startDate, endDate) => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await fetch(`${API_BASE_URL}/admin/revenue/statistics?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch revenue statistics');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching revenue statistics:', error);
    throw error;
  }
};

/**
 * Mock data for development/testing
 * @returns {Array} - Mock orders
 */
export const getMockRevenueOrders = () => {
  return [
    {
      orderId: 'ORD2024001',
      buyerId: 'BUY001',
      buyerName: 'Sasha Bandara',
      buyerAddress: '123 Main Street, Colombo',
      pickupLocation: 'Nuwara Eliya',
      deliveryLocation: 'Colombo 07',
      orderDate: '2024-10-15',
      status: 'Delivered',
      distanceInKm: 15.5,
      items: [
        {
          itemId: 'ITEM001',
          productName: 'Carrot',
          farmerId: 'FARM001',
          farmerName: 'Nimal Silva',
          farmName: 'Silva Organic Farm',
          farmLocation: 'Nuwara Eliya',
          quantity: 85,
          unit: 'kg',
          pricePerUnit: 120
        },
        {
          itemId: 'ITEM002',
          productName: 'Cabbage',
          farmerId: 'FARM002',
          farmerName: 'Kamal Perera',
          farmName: 'Green Valley Farm',
          farmLocation: 'Badulla',
          quantity: 95,
          unit: 'kg',
          pricePerUnit: 80
        }
      ]
    },
    {
      orderId: 'ORD2024002',
      buyerId: 'BUY002',
      buyerName: 'Ravi Fernando',
      buyerAddress: '456 Galle Road, Galle',
      pickupLocation: 'Matale',
      deliveryLocation: 'Galle Fort',
      orderDate: '2024-10-16',
      status: 'Processing',
      distanceInKm: 25.0,
      items: [
        {
          itemId: 'ITEM003',
          productName: 'Tomato',
          farmerId: 'FARM003',
          farmerName: 'Sunil Bandara',
          farmName: 'Sunshine Farm',
          farmLocation: 'Matale',
          quantity: 90,
          unit: 'kg',
          pricePerUnit: 100
        },
        {
          itemId: 'ITEM004',
          productName: 'Beans',
          farmerId: 'FARM001',
          farmerName: 'Nimal Silva',
          farmName: 'Silva Organic Farm',
          farmLocation: 'Nuwara Eliya',
          quantity: 45,
          unit: 'kg',
          pricePerUnit: 150
        },
        {
          itemId: 'ITEM005',
          productName: 'Potato',
          farmerId: 'FARM004',
          farmerName: 'Anura Rathnayake',
          farmName: 'Hill Country Farm',
          farmLocation: 'Welimada',
          quantity: 100,
          unit: 'kg',
          pricePerUnit: 90
        }
      ]
    },
    {
      orderId: 'ORD2024003',
      buyerId: 'BUY003',
      buyerName: 'Mala Wickramasinghe',
      buyerAddress: '789 Kandy Road, Kandy',
      pickupLocation: 'Badulla',
      deliveryLocation: 'Kandy City Center',
      orderDate: '2024-10-18',
      status: 'Pending',
      distanceInKm: 35.2,
      items: [
        {
          itemId: 'ITEM006',
          productName: 'Pumpkin',
          farmerId: 'FARM002',
          farmerName: 'Kamal Perera',
          farmName: 'Green Valley Farm',
          farmLocation: 'Badulla',
          quantity: 75,
          unit: 'kg',
          pricePerUnit: 70
        }
      ]
    },
    {
      orderId: 'ORD2024004',
      buyerId: 'BUY004',
      buyerName: 'Dinesh Jayawardena',
      buyerAddress: '321 Temple Road, Negombo',
      pickupLocation: 'Kurunegala',
      deliveryLocation: 'Negombo Beach',
      orderDate: '2024-10-19',
      status: 'Shipped',
      distanceInKm: 18.7,
      items: [
        {
          itemId: 'ITEM007',
          productName: 'Cucumber',
          farmerId: 'FARM005',
          farmerName: 'Lakshman Gunasekara',
          farmName: 'Fresh Harvest Farm',
          farmLocation: 'Kurunegala',
          quantity: 80,
          unit: 'kg',
          pricePerUnit: 85
        },
        {
          itemId: 'ITEM008',
          productName: 'Leeks',
          farmerId: 'FARM003',
          farmerName: 'Sunil Bandara',
          farmName: 'Sunshine Farm',
          farmLocation: 'Matale',
          quantity: 35,
          unit: 'kg',
          pricePerUnit: 200
        }
      ]
    }
  ];
};

export default {
  fetchRevenueOrders,
  fetchOrderById,
  updateOrderStatus,
  fetchRevenueStatistics,
  getMockRevenueOrders
};
