/**
 * Revenue Calculator Utility
 * Handles all calculations related to order revenue, delivery fees, and service charges
 */

// Constants
const DELIVERY_FEE_PER_KM = 10; // Rs. 10 per kilometer
const SERVICE_CHARGE_PERCENTAGE = 0.10; // 10% service charge
const CRATE_CAPACITY_KG = 25; // 25kg per crate
const CRATE_CHARGE_PER_UNIT = 20; // Rs. 20 per crate

/**
 * Calculate delivery fee based on distance
 * @param {number} distanceInKm - Distance in kilometers
 * @returns {number} - Delivery fee in Rs
 */
export const calculateDeliveryFee = (distanceInKm) => {
  if (!distanceInKm || distanceInKm < 0) return 0;
  return distanceInKm * DELIVERY_FEE_PER_KM;
};

/**
 * Calculate subtotal from order items
 * @param {Array} items - Array of order items with pricePerUnit and quantity
 * @returns {number} - Subtotal in Rs
 */
export const calculateSubtotal = (items) => {
  if (!items || !Array.isArray(items)) return 0;
  
  return items.reduce((total, item) => {
    const itemTotal = (item.pricePerUnit || 0) * (item.quantity || 0);
    return total + itemTotal;
  }, 0);
};

/**
 * Calculate service charge (10% of subtotal)
 * @param {number} subtotal - Subtotal amount
 * @returns {number} - Service charge in Rs
 */
export const calculateServiceCharge = (subtotal) => {
  if (!subtotal || subtotal < 0) return 0;
  return subtotal * SERVICE_CHARGE_PERCENTAGE;
};

/**
 * Calculate total bill including all charges
 * @param {number} subtotal - Subtotal of items
 * @param {number} deliveryFee - Delivery fee
 * @param {number} serviceCharge - Service charge
 * @returns {number} - Total amount in Rs
 */
export const calculateTotal = (subtotal, deliveryFee, serviceCharge) => {
  return (subtotal || 0) + (deliveryFee || 0) + (serviceCharge || 0);
};

/**
 * Calculate complete revenue breakdown for an order
 * @param {Array} items - Array of order items
 * @param {number} distanceInKm - Delivery distance in kilometers
 * @returns {Object} - Complete breakdown of the order
 */
export const calculateOrderRevenue = (items, distanceInKm) => {
  const subtotal = calculateSubtotal(items);
  const deliveryFee = calculateDeliveryFee(distanceInKm);
  const serviceCharge = calculateServiceCharge(subtotal);
  const total = calculateTotal(subtotal, deliveryFee, serviceCharge);

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    deliveryFee: parseFloat(deliveryFee.toFixed(2)),
    serviceCharge: parseFloat(serviceCharge.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    itemCount: items ? items.length : 0,
    totalQuantity: items ? items.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0
  };
};

/**
 * Calculate number of crates needed based on total weight
 * @param {number} totalWeightKg - Total weight in kilograms
 * @returns {number} - Number of crates needed (rounded up)
 */
export const calculateCratesNeeded = (totalWeightKg) => {
  if (!totalWeightKg || totalWeightKg <= 0) return 0;
  return Math.ceil(totalWeightKg / CRATE_CAPACITY_KG);
};

/**
 * Calculate crate charges based on total weight
 * @param {number} totalWeightKg - Total weight in kilograms
 * @returns {number} - Total crate charges in Rs
 */
export const calculateCrateCharges = (totalWeightKg) => {
  const cratesNeeded = calculateCratesNeeded(totalWeightKg);
  return cratesNeeded * CRATE_CHARGE_PER_UNIT;
};

/**
 * Calculate farmer's revenue breakdown for their items
 * @param {Array} farmerItems - Array of items from this farmer
 * @param {string} farmerId - Farmer's unique ID
 * @param {string} farmerName - Farmer's name
 * @returns {Object} - Farmer's revenue breakdown
 */
export const calculateFarmerRevenue = (farmerItems, farmerId, farmerName) => {
  if (!farmerItems || !Array.isArray(farmerItems) || farmerItems.length === 0) {
    return {
      farmerId,
      farmerName,
      items: [],
      itemsSubtotal: 0,
      totalWeight: 0,
      cratesNeeded: 0,
      crateCharges: 0,
      farmerEarnings: 0
    };
  }

  const itemsSubtotal = farmerItems.reduce((total, item) => {
    return total + ((item.pricePerUnit || 0) * (item.quantity || 0));
  }, 0);

  const totalWeight = farmerItems.reduce((total, item) => {
    return total + (item.quantity || 0);
  }, 0);

  const cratesNeeded = calculateCratesNeeded(totalWeight);
  const crateCharges = calculateCrateCharges(totalWeight);
  const farmerEarnings = itemsSubtotal - crateCharges;

  return {
    farmerId,
    farmerName,
    items: farmerItems,
    itemsSubtotal: parseFloat(itemsSubtotal.toFixed(2)),
    totalWeight: parseFloat(totalWeight.toFixed(2)),
    cratesNeeded,
    crateCharges: parseFloat(crateCharges.toFixed(2)),
    farmerEarnings: parseFloat(farmerEarnings.toFixed(2))
  };
};

/**
 * Group order items by farmer and calculate each farmer's bill
 * @param {Array} items - Array of all order items
 * @returns {Array} - Array of farmer revenue breakdowns
 */
export const calculateFarmerBills = (items) => {
  if (!items || !Array.isArray(items)) return [];

  // Group items by farmer
  const farmerGroups = items.reduce((groups, item) => {
    const farmerId = item.farmerId || 'unknown';
    if (!groups[farmerId]) {
      groups[farmerId] = {
        farmerId,
        farmerName: item.farmerName || 'Unknown Farmer',
        items: []
      };
    }
    groups[farmerId].items.push(item);
    return groups;
  }, {});

  // Calculate revenue for each farmer
  return Object.values(farmerGroups).map(group => 
    calculateFarmerRevenue(group.items, group.farmerId, group.farmerName)
  );
};

/**
 * Format currency value to Rs format
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return 'Rs. 0.00';
  return `Rs. ${parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Calculate revenue summary for multiple orders
 * @param {Array} orders - Array of orders
 * @returns {Object} - Summary statistics
 */
export const calculateRevenueSummary = (orders) => {
  if (!orders || !Array.isArray(orders)) {
    return {
      totalRevenue: 0,
      totalServiceCharge: 0,
      totalDeliveryFees: 0,
      orderCount: 0,
      averageOrderValue: 0
    };
  }

  const summary = orders.reduce((acc, order) => {
    const revenue = calculateOrderRevenue(order.items || [], order.distanceInKm || 0);
    
    return {
      totalRevenue: acc.totalRevenue + revenue.total,
      totalServiceCharge: acc.totalServiceCharge + revenue.serviceCharge,
      totalDeliveryFees: acc.totalDeliveryFees + revenue.deliveryFee,
      orderCount: acc.orderCount + 1
    };
  }, {
    totalRevenue: 0,
    totalServiceCharge: 0,
    totalDeliveryFees: 0,
    orderCount: 0
  });

  summary.averageOrderValue = summary.orderCount > 0 
    ? summary.totalRevenue / summary.orderCount 
    : 0;

  return {
    totalRevenue: parseFloat(summary.totalRevenue.toFixed(2)),
    totalServiceCharge: parseFloat(summary.totalServiceCharge.toFixed(2)),
    totalDeliveryFees: parseFloat(summary.totalDeliveryFees.toFixed(2)),
    orderCount: summary.orderCount,
    averageOrderValue: parseFloat(summary.averageOrderValue.toFixed(2))
  };
};

export default {
  calculateDeliveryFee,
  calculateSubtotal,
  calculateServiceCharge,
  calculateTotal,
  calculateOrderRevenue,
  calculateCratesNeeded,
  calculateCrateCharges,
  calculateFarmerRevenue,
  calculateFarmerBills,
  formatCurrency,
  calculateRevenueSummary,
  DELIVERY_FEE_PER_KM,
  SERVICE_CHARGE_PERCENTAGE,
  CRATE_CAPACITY_KG,
  CRATE_CHARGE_PER_UNIT
};
