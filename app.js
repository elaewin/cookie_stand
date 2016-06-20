// Stores needed:
// Location	Min / Cust	Max / Cust	Avg Cookie / Sale
// 1st and Pike	23	65	6.3
// SeaTac Airport	3	24	1.2
// Seattle Center	11	38	3.7
// Capitol Hill	20	38	2.3
// Alki	2	16	4.6

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateHourlyTraffic(hours) {
  for each hour that the store is open
  generate a random number of customers
  store that number in an array
  return the array
}

function projectedHourlySales(array name, average cookies sold) {
  for each item in the array of hourly customers
  multiply that number by the average cookies sold per hour
  store that number in an array
  return the array
}

function projectedDailySales(array name) {
  for each item in an array of hour sales
  add that number to a total number
  return the total number at the end.
}

var firstAndPike = {
  storeAddress: '102 Pike St, Seattle, WA 98101',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  averageCookiesSold: 1.2,
  hourlyProjectedCustomers: [],
  hourlyProjectedCookiesSold: [],
  dailySalesTotal: 0
};
