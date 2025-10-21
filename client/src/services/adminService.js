/**
 * Admin Service
 * Handles API calls for admin dashboard and report generation
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * Fetch all farmers
 * @returns {Promise<Array>} - Array of farmers
 */
export const fetchFarmers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/farmers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch farmers');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching farmers:', error);
    // Return mock data for development
    return getMockFarmers();
  }
};

/**
 * Fetch all buyers
 * @returns {Promise<Array>} - Array of buyers
 */
export const fetchBuyers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/buyers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch buyers');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching buyers:', error);
    // Return mock data for development
    return getMockBuyers();
  }
};

/**
 * Fetch all vendors
 * @returns {Promise<Array>} - Array of vendors
 */
export const fetchVendors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/vendors`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vendors');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    // Return mock data for development
    return getMockVendors();
  }
};

/**
 * Fetch all drivers
 * @returns {Promise<Array>} - Array of drivers
 */
export const fetchDrivers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/drivers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch drivers');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    // Return mock data for development
    return getMockDrivers();
  }
};

/**
 * Fetch all QA staff
 * @returns {Promise<Array>} - Array of QA staff
 */
export const fetchQAStaff = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/qa-staff`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch QA staff');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching QA staff:', error);
    // Return mock data for development
    return getMockQAStaff();
  }
};

/**
 * Fetch all orders
 * @returns {Promise<Array>} - Array of orders
 */
export const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Return mock data for development
    return getMockOrders();
  }
};

/**
 * Fetch revenue statistics
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
        'Authorization': `Bearer ${getAuthToken()}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch revenue statistics');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching revenue statistics:', error);
    // Return mock data for development
    return getMockRevenueStatistics();
  }
};

/**
 * Fetch dashboard statistics
 * @returns {Promise<Object>} - Dashboard statistics
 */
export const fetchDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    // Return mock data for development
    return getMockDashboardStats();
  }
};

// ============================================================================
// MOCK DATA FOR DEVELOPMENT
// ============================================================================

export const getMockFarmers = () => {
  return [
    {
      farmerId: 'F001',
      name: 'Kamal Perera',
      email: 'kamal.perera@gmail.com',
      phone: '+94 77 123 4567',
      location: 'Matale',
      district: 'Matale',
      registeredDate: '2024-01-15',
      status: 'Active',
      productsCount: 25,
      totalSales: 425000,
      farmSize: '5 acres',
      specialization: 'Vegetables'
    },
    {
      farmerId: 'F002',
      name: 'Nimal Silva',
      email: 'nimal.silva@gmail.com',
      phone: '+94 77 234 5678',
      location: 'Kandy',
      district: 'Kandy',
      registeredDate: '2024-02-20',
      status: 'Active',
      productsCount: 18,
      totalSales: 298000,
      farmSize: '3 acres',
      specialization: 'Organic Vegetables'
    },
    {
      farmerId: 'F003',
      name: 'Sunil Fernando',
      email: 'sunil.fernando@gmail.com',
      phone: '+94 77 345 6789',
      location: 'Gampaha',
      district: 'Gampaha',
      registeredDate: '2024-03-10',
      status: 'Active',
      productsCount: 32,
      totalSales: 556000,
      farmSize: '7 acres',
      specialization: 'Mixed Farming'
    },
    {
      farmerId: 'F004',
      name: 'Ravi Kumar',
      email: 'ravi.kumar@gmail.com',
      phone: '+94 77 456 7890',
      location: 'Kurunegala',
      district: 'Kurunegala',
      registeredDate: '2024-01-25',
      status: 'Active',
      productsCount: 22,
      totalSales: 387500,
      farmSize: '4 acres',
      specialization: 'Leafy Greens'
    },
    {
      farmerId: 'F005',
      name: 'Anil Jayawardena',
      email: 'anil.jay@gmail.com',
      phone: '+94 77 567 8901',
      location: 'Anuradhapura',
      district: 'Anuradhapura',
      registeredDate: '2024-02-14',
      status: 'Active',
      productsCount: 28,
      totalSales: 489000,
      farmSize: '6 acres',
      specialization: 'Root Vegetables'
    },
    {
      farmerId: 'F006',
      name: 'Mahesh Bandara',
      email: 'mahesh.b@gmail.com',
      phone: '+94 77 678 9012',
      location: 'Badulla',
      district: 'Badulla',
      registeredDate: '2024-03-05',
      status: 'Active',
      productsCount: 19,
      totalSales: 345000,
      farmSize: '3.5 acres',
      specialization: 'Fruits & Vegetables'
    },
    {
      farmerId: 'F007',
      name: 'Chandana Wijesinghe',
      email: 'chandana.w@gmail.com',
      phone: '+94 77 789 0123',
      location: 'Nuwara Eliya',
      district: 'Nuwara Eliya',
      registeredDate: '2024-04-12',
      status: 'Active',
      productsCount: 35,
      totalSales: 678000,
      farmSize: '8 acres',
      specialization: 'High-altitude Vegetables'
    },
    {
      farmerId: 'F008',
      name: 'Lalith Gunasekara',
      email: 'lalith.g@gmail.com',
      phone: '+94 77 890 1234',
      location: 'Polonnaruwa',
      district: 'Polonnaruwa',
      registeredDate: '2024-05-20',
      status: 'Active',
      productsCount: 26,
      totalSales: 421000,
      farmSize: '5.5 acres',
      specialization: 'Organic Produce'
    },
    {
      farmerId: 'F009',
      name: 'Pradeep Amarasinghe',
      email: 'pradeep.a@gmail.com',
      phone: '+94 77 901 2345',
      location: 'Ampara',
      district: 'Ampara',
      registeredDate: '2024-06-08',
      status: 'Active',
      productsCount: 21,
      totalSales: 367000,
      farmSize: '4.5 acres',
      specialization: 'Green Vegetables'
    },
    {
      farmerId: 'F010',
      name: 'Tharaka Rathnayake',
      email: 'tharaka.r@gmail.com',
      phone: '+94 77 012 3456',
      location: 'Embilipitiya',
      district: 'Ratnapura',
      registeredDate: '2024-07-15',
      status: 'Active',
      productsCount: 29,
      totalSales: 512000,
      farmSize: '6.5 acres',
      specialization: 'Tropical Vegetables'
    },
    {
      farmerId: 'F011',
      name: 'Upul Dissanayake',
      email: 'upul.d@gmail.com',
      phone: '+94 77 123 9876',
      location: 'Dambulla',
      district: 'Matale',
      registeredDate: '2024-08-03',
      status: 'Active',
      productsCount: 24,
      totalSales: 398000,
      farmSize: '4 acres',
      specialization: 'Seasonal Vegetables'
    },
    {
      farmerId: 'F012',
      name: 'Samantha De Silva',
      email: 'samantha.ds@gmail.com',
      phone: '+94 77 234 8765',
      location: 'Kegalle',
      district: 'Kegalle',
      registeredDate: '2024-08-20',
      status: 'Active',
      productsCount: 20,
      totalSales: 356000,
      farmSize: '3 acres',
      specialization: 'Herbs & Greens'
    },
    {
      farmerId: 'F013',
      name: 'Roshan Jayasuriya',
      email: 'roshan.j@gmail.com',
      phone: '+94 77 345 7654',
      location: 'Monaragala',
      district: 'Monaragala',
      registeredDate: '2024-09-10',
      status: 'Active',
      productsCount: 27,
      totalSales: 445000,
      farmSize: '5 acres',
      specialization: 'Mixed Crops'
    },
    {
      farmerId: 'F014',
      name: 'Nuwan Karunaratne',
      email: 'nuwan.k@gmail.com',
      phone: '+94 77 456 6543',
      location: 'Hambantota',
      district: 'Hambantota',
      registeredDate: '2024-09-25',
      status: 'Active',
      productsCount: 18,
      totalSales: 289000,
      farmSize: '3.5 acres',
      specialization: 'Dry Zone Vegetables'
    },
    {
      farmerId: 'F015',
      name: 'Asanka Wickramasinghe',
      email: 'asanka.w@gmail.com',
      phone: '+94 77 567 5432',
      location: 'Chilaw',
      district: 'Puttalam',
      registeredDate: '2024-10-05',
      status: 'Active',
      productsCount: 23,
      totalSales: 378000,
      farmSize: '4.5 acres',
      specialization: 'Coastal Vegetables'
    }
  ];
};

export const getMockBuyers = () => {
  return [
    {
      buyerId: 'B001',
      name: 'Sasha Bandara',
      email: 'sasha.bandara@gmail.com',
      phone: '+94 71 123 4567',
      address: '123 Main Street, Colombo 07',
      city: 'Colombo',
      registeredDate: '2024-01-10',
      status: 'Active',
      totalOrders: 45,
      totalSpent: 1250000,
      lastOrderDate: '2024-10-20'
    },
    {
      buyerId: 'B002',
      name: 'Ravi Fernando',
      email: 'ravi.fernando@gmail.com',
      phone: '+94 71 234 5678',
      address: '456 Galle Road, Galle',
      city: 'Galle',
      registeredDate: '2024-02-15',
      status: 'Active',
      totalOrders: 32,
      totalSpent: 895000,
      lastOrderDate: '2024-10-19'
    },
    {
      buyerId: 'B003',
      name: 'Mala Wickramasinghe',
      email: 'mala.w@gmail.com',
      phone: '+94 71 345 6789',
      address: '789 Kandy Road, Kandy',
      city: 'Kandy',
      registeredDate: '2024-03-20',
      status: 'Active',
      totalOrders: 28,
      totalSpent: 756000,
      lastOrderDate: '2024-10-18'
    },
    {
      buyerId: 'B004',
      name: 'Dinesh Jayawardena',
      email: 'dinesh.j@gmail.com',
      phone: '+94 71 456 7890',
      address: '321 Temple Road, Negombo',
      city: 'Negombo',
      registeredDate: '2024-04-05',
      status: 'Active',
      totalOrders: 19,
      totalSpent: 524000,
      lastOrderDate: '2024-10-17'
    },
    {
      buyerId: 'B005',
      name: 'Chamari Dissanayake',
      email: 'chamari.d@gmail.com',
      phone: '+94 71 567 8901',
      address: '555 Hospital Road, Matara',
      city: 'Matara',
      registeredDate: '2024-05-12',
      status: 'Active',
      totalOrders: 15,
      totalSpent: 398000,
      lastOrderDate: '2024-10-16'
    },
    {
      buyerId: 'B006',
      name: 'Priyantha Cooray',
      email: 'priyantha.c@gmail.com',
      phone: '+94 71 678 9012',
      address: '88 Beach Road, Mount Lavinia',
      city: 'Colombo',
      registeredDate: '2024-06-08',
      status: 'Active',
      totalOrders: 22,
      totalSpent: 612000,
      lastOrderDate: '2024-10-15'
    },
    {
      buyerId: 'B007',
      name: 'Sanduni Perera',
      email: 'sanduni.p@gmail.com',
      phone: '+94 71 789 0123',
      address: '45 Park Street, Jaffna',
      city: 'Jaffna',
      registeredDate: '2024-07-14',
      status: 'Active',
      totalOrders: 18,
      totalSpent: 487000,
      lastOrderDate: '2024-10-14'
    },
    {
      buyerId: 'B008',
      name: 'Lakshan Gunathilake',
      email: 'lakshan.g@gmail.com',
      phone: '+94 71 890 1234',
      address: '67 Station Road, Anuradhapura',
      city: 'Anuradhapura',
      registeredDate: '2024-08-22',
      status: 'Active',
      totalOrders: 12,
      totalSpent: 334000,
      lastOrderDate: '2024-10-13'
    },
    {
      buyerId: 'B009',
      name: 'Niluka Rajapakse',
      email: 'niluka.r@gmail.com',
      phone: '+94 71 901 2345',
      address: '99 Market Street, Kurunegala',
      city: 'Kurunegala',
      registeredDate: '2024-09-05',
      status: 'Active',
      totalOrders: 10,
      totalSpent: 278000,
      lastOrderDate: '2024-10-12'
    },
    {
      buyerId: 'B010',
      name: 'Tharindu Senanayake',
      email: 'tharindu.s@gmail.com',
      phone: '+94 71 012 3456',
      address: '222 High Street, Batticaloa',
      city: 'Batticaloa',
      registeredDate: '2024-09-18',
      status: 'Active',
      totalOrders: 8,
      totalSpent: 215000,
      lastOrderDate: '2024-10-11'
    }
  ];
};

export const getMockVendors = () => {
  return [
    {
      vendorId: 'V001',
      name: 'Fresh Mart Colombo',
      email: 'freshmart@gmail.com',
      phone: '+94 11 234 5678',
      location: 'Colombo 07',
      registeredDate: '2024-01-05',
      status: 'Active',
      monthlySales: 1250000,
      productsListed: 85
    },
    {
      vendorId: 'V002',
      name: 'Organic Store Kandy',
      email: 'organic.store@gmail.com',
      phone: '+94 81 345 6789',
      location: 'Kandy',
      registeredDate: '2024-02-10',
      status: 'Active',
      monthlySales: 980000,
      productsListed: 62
    },
    {
      vendorId: 'V003',
      name: 'Green Grocers Galle',
      email: 'green.grocers@gmail.com',
      phone: '+94 91 456 7890',
      location: 'Galle',
      registeredDate: '2024-03-15',
      status: 'Active',
      monthlySales: 1560000,
      productsListed: 98
    },
    {
      vendorId: 'V004',
      name: 'Super Veggies Negombo',
      email: 'super.veggies@gmail.com',
      phone: '+94 31 567 8901',
      location: 'Negombo',
      registeredDate: '2024-04-20',
      status: 'Active',
      monthlySales: 875000,
      productsListed: 54
    },
    {
      vendorId: 'V005',
      name: 'Farm Fresh Matara',
      email: 'farmfresh@gmail.com',
      phone: '+94 41 678 9012',
      location: 'Matara',
      registeredDate: '2024-05-08',
      status: 'Active',
      monthlySales: 720000,
      productsListed: 47
    },
    {
      vendorId: 'V006',
      name: 'Nature Basket Kurunegala',
      email: 'nature.basket@gmail.com',
      phone: '+94 37 789 0123',
      location: 'Kurunegala',
      registeredDate: '2024-06-12',
      status: 'Active',
      monthlySales: 640000,
      productsListed: 41
    }
  ];
};

export const getMockDrivers = () => {
  return [
    {
      driverId: 'D001',
      name: 'Prasanna Silva',
      email: 'prasanna.silva@gmail.com',
      phone: '+94 77 111 2222',
      vehicleNumber: 'CAB-1234',
      vehicleType: 'Van',
      licenseNumber: 'B123456',
      registeredDate: '2024-01-08',
      status: 'Active',
      totalDeliveries: 145,
      rating: 4.8,
      currentStatus: 'Available'
    },
    {
      driverId: 'D002',
      name: 'Mahesh Fernando',
      email: 'mahesh.fernando@gmail.com',
      phone: '+94 77 222 3333',
      vehicleNumber: 'CAB-2345',
      vehicleType: 'Truck',
      licenseNumber: 'B234567',
      registeredDate: '2024-02-12',
      status: 'Active',
      totalDeliveries: 128,
      rating: 4.6,
      currentStatus: 'On Delivery'
    },
    {
      driverId: 'D003',
      name: 'Kumara Bandara',
      email: 'kumara.bandara@gmail.com',
      phone: '+94 77 333 4444',
      vehicleNumber: 'CAB-3456',
      vehicleType: 'Van',
      licenseNumber: 'B345678',
      registeredDate: '2024-03-18',
      status: 'Active',
      totalDeliveries: 167,
      rating: 4.9,
      currentStatus: 'Available'
    }
  ];
};

export const getMockQAStaff = () => {
  return [
    {
      qaId: 'QA001',
      name: 'Dilshan Ratnayake',
      email: 'dilshan.qa@govimansala.lk',
      phone: '+94 71 111 2222',
      specialization: 'Vegetables Quality',
      registeredDate: '2024-01-05',
      status: 'Active',
      inspectionsCompleted: 256,
      pendingInspections: 8,
      rating: 4.7
    },
    {
      qaId: 'QA002',
      name: 'Samantha Perera',
      email: 'samantha.qa@govimansala.lk',
      phone: '+94 71 222 3333',
      specialization: 'Fruits Quality',
      registeredDate: '2024-02-10',
      status: 'Active',
      inspectionsCompleted: 198,
      pendingInspections: 5,
      rating: 4.8
    },
    {
      qaId: 'QA003',
      name: 'Lakshmi Dissanayake',
      email: 'lakshmi.qa@govimansala.lk',
      phone: '+94 71 333 4444',
      specialization: 'Organic Certification',
      registeredDate: '2024-03-15',
      status: 'Active',
      inspectionsCompleted: 145,
      pendingInspections: 3,
      rating: 4.9
    }
  ];
};

export const getMockOrders = () => {
  return [
    {
      orderId: 'ORD001',
      buyerId: 'B001',
      buyerName: 'Sasha Bandara',
      farmerId: 'F001',
      farmerName: 'Kamal Perera',
      orderDate: '2024-10-15',
      deliveryDate: '2024-10-17',
      status: 'Completed',
      totalAmount: 25000,
      items: 5,
      paymentStatus: 'Paid',
      deliveryAddress: 'Colombo 07'
    },
    {
      orderId: 'ORD002',
      buyerId: 'B002',
      buyerName: 'Ravi Fernando',
      farmerId: 'F002',
      farmerName: 'Nimal Silva',
      orderDate: '2024-10-16',
      deliveryDate: '2024-10-18',
      status: 'Completed',
      totalAmount: 18500,
      items: 3,
      paymentStatus: 'Paid',
      deliveryAddress: 'Galle'
    },
    {
      orderId: 'ORD003',
      buyerId: 'B003',
      buyerName: 'Mala Wickramasinghe',
      farmerId: 'F003',
      farmerName: 'Sunil Fernando',
      orderDate: '2024-10-17',
      deliveryDate: '2024-10-19',
      status: 'Processing',
      totalAmount: 32000,
      items: 7,
      paymentStatus: 'Paid',
      deliveryAddress: 'Kandy'
    },
    {
      orderId: 'ORD004',
      buyerId: 'B004',
      buyerName: 'Dinesh Jayawardena',
      farmerId: 'F001',
      farmerName: 'Kamal Perera',
      orderDate: '2024-10-18',
      deliveryDate: '2024-10-20',
      status: 'Pending',
      totalAmount: 15200,
      items: 4,
      paymentStatus: 'Paid',
      deliveryAddress: 'Negombo'
    },
    {
      orderId: 'ORD005',
      buyerId: 'B005',
      buyerName: 'Chamari Dissanayake',
      farmerId: 'F005',
      farmerName: 'Anil Jayawardena',
      orderDate: '2024-10-19',
      deliveryDate: '2024-10-21',
      status: 'Completed',
      totalAmount: 42000,
      items: 6,
      paymentStatus: 'Paid',
      deliveryAddress: 'Matara'
    },
    {
      orderId: 'ORD006',
      buyerId: 'B006',
      buyerName: 'Priyantha Cooray',
      farmerId: 'F006',
      farmerName: 'Mahesh Bandara',
      orderDate: '2024-10-14',
      deliveryDate: '2024-10-16',
      status: 'Completed',
      totalAmount: 28500,
      items: 4,
      paymentStatus: 'Paid',
      deliveryAddress: 'Mount Lavinia'
    },
    {
      orderId: 'ORD007',
      buyerId: 'B007',
      buyerName: 'Sanduni Perera',
      farmerId: 'F007',
      farmerName: 'Chandana Wijesinghe',
      orderDate: '2024-10-13',
      deliveryDate: '2024-10-15',
      status: 'Completed',
      totalAmount: 35700,
      items: 8,
      paymentStatus: 'Paid',
      deliveryAddress: 'Jaffna'
    },
    {
      orderId: 'ORD008',
      buyerId: 'B008',
      buyerName: 'Lakshan Gunathilake',
      farmerId: 'F008',
      farmerName: 'Lalith Gunasekara',
      orderDate: '2024-10-12',
      deliveryDate: '2024-10-14',
      status: 'Completed',
      totalAmount: 19800,
      items: 3,
      paymentStatus: 'Paid',
      deliveryAddress: 'Anuradhapura'
    },
    {
      orderId: 'ORD009',
      buyerId: 'B009',
      buyerName: 'Niluka Rajapakse',
      farmerId: 'F009',
      farmerName: 'Pradeep Amarasinghe',
      orderDate: '2024-10-11',
      deliveryDate: '2024-10-13',
      status: 'Completed',
      totalAmount: 22400,
      items: 5,
      paymentStatus: 'Paid',
      deliveryAddress: 'Kurunegala'
    },
    {
      orderId: 'ORD010',
      buyerId: 'B010',
      buyerName: 'Tharindu Senanayake',
      farmerId: 'F010',
      farmerName: 'Tharaka Rathnayake',
      orderDate: '2024-10-10',
      deliveryDate: '2024-10-12',
      status: 'Completed',
      totalAmount: 31200,
      items: 6,
      paymentStatus: 'Paid',
      deliveryAddress: 'Batticaloa'
    },
    {
      orderId: 'ORD011',
      buyerId: 'B001',
      buyerName: 'Sasha Bandara',
      farmerId: 'F011',
      farmerName: 'Upul Dissanayake',
      orderDate: '2024-10-09',
      deliveryDate: '2024-10-11',
      status: 'Completed',
      totalAmount: 27600,
      items: 4,
      paymentStatus: 'Paid',
      deliveryAddress: 'Colombo 07'
    },
    {
      orderId: 'ORD012',
      buyerId: 'B002',
      buyerName: 'Ravi Fernando',
      farmerId: 'F012',
      farmerName: 'Samantha De Silva',
      orderDate: '2024-10-08',
      deliveryDate: '2024-10-10',
      status: 'Completed',
      totalAmount: 16800,
      items: 3,
      paymentStatus: 'Paid',
      deliveryAddress: 'Galle'
    },
    {
      orderId: 'ORD013',
      buyerId: 'B003',
      buyerName: 'Mala Wickramasinghe',
      farmerId: 'F013',
      farmerName: 'Roshan Jayasuriya',
      orderDate: '2024-10-07',
      deliveryDate: '2024-10-09',
      status: 'Cancelled',
      totalAmount: 0,
      items: 2,
      paymentStatus: 'Refunded',
      deliveryAddress: 'Kandy'
    },
    {
      orderId: 'ORD014',
      buyerId: 'B004',
      buyerName: 'Dinesh Jayawardena',
      farmerId: 'F014',
      farmerName: 'Nuwan Karunaratne',
      orderDate: '2024-10-06',
      deliveryDate: '2024-10-08',
      status: 'Completed',
      totalAmount: 24300,
      items: 5,
      paymentStatus: 'Paid',
      deliveryAddress: 'Negombo'
    },
    {
      orderId: 'ORD015',
      buyerId: 'B005',
      buyerName: 'Chamari Dissanayake',
      farmerId: 'F015',
      farmerName: 'Asanka Wickramasinghe',
      orderDate: '2024-10-05',
      deliveryDate: '2024-10-07',
      status: 'Completed',
      totalAmount: 38900,
      items: 7,
      paymentStatus: 'Paid',
      deliveryAddress: 'Matara'
    }
  ];
};

export const getMockRevenueStatistics = () => {
  return {
    totalRevenue: 2547800,
    totalOrders: 123,
    completedOrders: 98,
    pendingOrders: 15,
    processingOrders: 8,
    cancelledOrders: 2,
    averageOrderValue: 20714,
    totalServiceCharges: 223500,
    totalDeliveryFees: 89300,
    totalFarmerEarnings: 1985500,
    totalCrateCharges: 49500,
    revenueGrowth: 12.5,
    monthlyBreakdown: [
      { month: 'Jan', revenue: 180000 },
      { month: 'Feb', revenue: 195000 },
      { month: 'Mar', revenue: 210000 },
      { month: 'Apr', revenue: 225000 },
      { month: 'May', revenue: 240000 },
      { month: 'Jun', revenue: 255000 },
      { month: 'Jul', revenue: 270000 },
      { month: 'Aug', revenue: 285000 },
      { month: 'Sep', revenue: 300000 },
      { month: 'Oct', revenue: 386800 }
    ]
  };
};

export const getMockDashboardStats = () => {
  return {
    ordersCount: 15,
    farmersCount: 15,
    vendorsCount: 6,
    driversCount: 3,
    qasCount: 3,
    pendingQA: 2,
    activeDrivers: 2,
    totalRevenue: 378000,
    monthlyGrowth: 12.5,
    activeUsers: 37,
    completedOrders: 12
  };
};

export default {
  fetchFarmers,
  fetchBuyers,
  fetchVendors,
  fetchDrivers,
  fetchQAStaff,
  fetchOrders,
  fetchRevenueStatistics,
  fetchDashboardStats,
  // Mock data exports
  getMockFarmers,
  getMockBuyers,
  getMockVendors,
  getMockDrivers,
  getMockQAStaff,
  getMockOrders,
  getMockRevenueStatistics,
  getMockDashboardStats
};
