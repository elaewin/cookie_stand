var firstAndPike = {
  storeName: 'firstAndPike',
  storeNamePretty: '1st and Pike',
  storeAddress: '102 Pike St, Seattle, WA 98101',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHours: [],
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  averageCookiesSold: 6.3,
  hourlyProjectedCustomers: [],
  hourlyProjectedCookiesSold: [],
  dailySalesTotal: 0
};

var seatac = {
  storeName: 'seatac',
  storeNamePretty: 'Seatac Airport',
  storeAddress: 'Concourse D, 17801 International Blvd, Seattle, WA 98158',
  storePhone: '425-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHours: [],
  minHourlyCustomers: 3,
  maxHourlyCustomers: 24,
  averageCookiesSold: 1.2,
  hourlyProjectedCustomers: [],
  hourlyProjectedCookiesSold: [],
  dailySalesTotal: 0
};

var seattleCenter = {
  storeName: 'seattleCenter',
  storeNamePretty: 'Seattle Center',
  storeAddress: '305 Harrison St, Seattle, WA 98109',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHours: [],
  minHourlyCustomers: 11,
  maxHourlyCustomers: 38,
  averageCookiesSold: 3.7,
  hourlyProjectedCustomers: [],
  hourlyProjectedCookiesSold: [],
  dailySalesTotal: 0
};

var capitolHill = {
  storeName: 'capitolHill',
  storeNamePretty: 'Capitol Hill',
  storeAddress: '434 Broadway Avenue E, Seattle, WA 98102',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHours: [],
  minHourlyCustomers: 20,
  maxHourlyCustomers: 38,
  averageCookiesSold: 2.3,
  hourlyProjectedCustomers: [],
  hourlyProjectedCookiesSold: [],
  dailySalesTotal: 0
};

var alki = {
  storeName: 'alki',
  storeNamePretty: 'Alki',
  storeAddress: '2742 Alki Ave SW; Seattle, WA 98116',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHours: [],
  minHourlyCustomers: 2,
  maxHourlyCustomers: 16,
  averageCookiesSold: 4.6,
  hourlyProjectedCustomers: [],
  hourlyProjectedCookiesSold: [],
  dailySalesTotal: 0
};

// Array of the object for each store
var allStores = [firstAndPike, seatac, seattleCenter, capitolHill, alki];

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
    console.log('hourly customers at ' + (i + 6) + ' to ' + (i + 7) + ': ' + customers);
    store.hourlyProjectedCustomers.push(customers);
  }
}

// Updates a store's array of hourlyProjectedCookiesSold by multiplying each item in a store's hourlyProjectedCustomers array by the average number of cookies sold per customer for that store.
function projectedHourlySales(store) {
  var hourlyCookieAverage = store.averageCookiesSold;
  for (var i = 0; i < store.hourlyProjectedCustomers.length; i++) {
    var cookies = Math.floor(store.hourlyProjectedCustomers[i] * store.averageCookiesSold);
    console.log('Cookies projected at ' + (i + 6) + ' to ' + (i + 7) + ': ' + cookies);
    store.hourlyProjectedCookiesSold.push(cookies);
  }
}

// Calculates the total number of cookies sold in a store based on the amounts in that store's hourlyProjectedCookiesSold array.
function projectedDailySales(store) {
  var totalCookies = 0;
  for (var i = 0; i < store.hourlyProjectedCookiesSold.length; i++) {
    totalCookies += store.hourlyProjectedCookiesSold[i];
    console.log('Ongoing total: ' + totalCookies);
  }
  store.dailySalesTotal = totalCookies;
  return totalCookies;
}

// Generate and array of the hours the store is open, in a string
function createOpenHours(store) {
  for (var i = 0; i < store.hourlyProjectedCustomers.length; i++) {
    var timeAsString = (i + store.storeOpens + 1) + ':00';
    console.log('Time: ' + timeAsString);
    store.openHours.push(timeAsString);
  }
}

// Display the sales numbers for a given store as a list.
function displaySalesNumbers(store) {
  var salesList = document.getElementById(store.storeName);
  var salesTotal = projectedDailySales(store);

  for (var i = 0; i < store.hourlyProjectedCookiesSold.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = store.openHours[i] + ': ' + store.hourlyProjectedCookiesSold[i] + ' cookies';
    salesList.appendChild(listItem);
  }
  var listItem = document.createElement('li');
  listItem.textContent = 'Total: ' + salesTotal + ' cookies';
  salesList.appendChild(listItem);
}

// Generate sales numbers for each store in an array of stores
function generateSalesNumbers() {
  for (var i = 0; i < allStores.length; i++) {
    var store = allStores[i];
    generateHourlyTraffic(store);
    projectedHourlySales(store);
    createOpenHours(store);
    displaySalesNumbers(store);
  }
}

generateSalesNumbers();
