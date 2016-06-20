// Stores needed:
// Location	Min / Cust	Max / Cust	Avg Cookie / Sale
// 1st and Pike	23	65	6.3
// SeaTac Airport	3	24	1.2
// Seattle Center	11	38	3.7
// Capitol Hill	20	38	2.3
// Alki	2	16	4.6

var firstAndPike = {
  storeName: '1st and Pike',
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

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Updates a store's array of hourlyProjectedCustomers with a random number of customers per hour for each hour that the store is open.
function generateHourlyTraffic(store) {
  var openHours = store.storeCloses - store.storeOpens;
  for (var i = 0; i < openHours; i++) {
    var customers = getRandomIntInclusive(store.minHourlyCustomers, store.maxHourlyCustomers);
    console.log(customers);
    store.hourlyProjectedCustomers.push(customers);
  }
}

// Updates a store's array of hourlyProjectedCookiesSold by multiplying each item in hourlyProjectedCustomers by the average number of cookies sold per customer for that store.
function projectedHourlySales(store) {
  var hourlyCookieAverage = store.averageCookiesSold;
  for (var i = 0; i < store.hourlyProjectedCustomers.length; i++) {
    var cookies = store.hourlyProjectedCustomers[i] * store.averageCookiesSold;
    console.log(cookies);
    store.hourlyProjectedCookiesSold.push(cookies);
  }
}

function projectedDailySales(store) {
  var totalCookies = 0;
  for (var i = 0; i < store.hourlyProjectedCookiesSold.length; i++) {
    totalCookies += store.hourlyProjectedCookiesSold[i];
    console.log(totalCookies);
  }
  store.dailySalesTotal = totalCookies;
  return totalCookies;
}
