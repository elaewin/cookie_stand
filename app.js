// NOTES FOR TUESDAY:
// MAKE THE storeName ALL LC, AS IT WOULD BE USED FOR AN ID OR CLASS VALUE.
// MAYBE CLEAR THE ARRAYS IN EACH STORE BEFORE RUNNING THE FUNCTIONS TO FILL THEM.

var firstAndPike = {
  identifier: 'firstAndPike',
  storeName: '1st and Pike',
  storeAddress: '102 Pike St, Seattle, WA 98101',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHoursArray: [],
  minCustsPerHour: 23,
  maxCustsPerHour: 65,
  avgCookiesPerCust: 6.3,
  custsPerHourArray: [],
  cookiesPerHourArray: [],
  dailySalesTotal: 0
};

var seatac = {
  identifier: 'seatac',
  storeName: 'Seatac Airport',
  storeAddress: 'Concourse D, 17801 International Blvd, Seattle, WA 98158',
  storePhone: '425-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHoursArray: [],
  minCustsPerHour: 3,
  maxCustsPerHour: 24,
  avgCookiesPerCust: 1.2,
  custsPerHourArray: [],
  cookiesPerHourArray: [],
  dailySalesTotal: 0
};

var seattleCenter = {
  identifier: 'seattleCenter',
  storeName: 'Seattle Center',
  storeAddress: '305 Harrison St, Seattle, WA 98109',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHoursArray: [],
  minCustsPerHour: 11,
  maxCustsPerHour: 38,
  avgCookiesPerCust: 3.7,
  custsPerHourArray: [],
  cookiesPerHourArray: [],
  dailySalesTotal: 0
};

var capitolHill = {
  identifier: 'capitolHill',
  storeName: 'Capitol Hill',
  storeAddress: '434 Broadway Avenue E, Seattle, WA 98102',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHoursArray: [],
  minCustsPerHour: 20,
  maxCustsPerHour: 38,
  avgCookiesPerCust: 2.3,
  custsPerHourArray: [],
  cookiesPerHourArray: [],
  dailySalesTotal: 0
};

var alki = {
  identifier: 'alki',
  storeName: 'Alki',
  storeAddress: '2742 Alki Ave SW; Seattle, WA 98116',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHoursArray: [],
  minCustsPerHour: 2,
  maxCustsPerHour: 16,
  avgCookiesPerCust: 4.6,
  custsPerHourArray: [],
  cookiesPerHourArray: [],
  dailySalesTotal: 0
};

// Array of stores
var allStores = [firstAndPike, seatac, seattleCenter, capitolHill, alki];


// Generate and array of the hours the store is open, in a string
// NOTES FOR TUESDAY: MAKE THIS THE FIRST FUNCTION AND THEN USE THE LENGTH OF THIS ARRAY TO RUN THE FOR LOOP FOR THE LATER CALCULATIONS.
function createOpenHours(store) {
  var storeIsOpen = store.storeCloses - store.storeOpens;

  for (var i = 0; i < storeIsOpen; i++) {
    var timeAsString = (i + store.storeOpens) + ':00 - ' + (i + store.storeOpens + 1) + ':00';
    // console.log('Time:', timeAsString);
    store.openHoursArray.push(timeAsString);
  }
}

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Updates a store's array of custsPerHourArray with a random number of customers per hour for each hour that the store is open.
function generateHourlyTraffic(store) {
  hoursOfOperation = createOpenHours(store);

  for (var i = 0; i < store.openHoursArray.length; i++) {
    var customers = getRandomIntInclusive(store.minCustsPerHour, store.maxCustsPerHour);
    // console.log('Customers per hour:', customers);
    store.custsPerHourArray.push(customers);
  }
}

// Updates a store's array of cookiesPerHourArray by multiplying each item in a store's custsPerHourArray array by the average number of cookies sold per customer for that store.
function projectedSales(store) {
  generateHourlyTraffic(store);
  var hourlyCookieAverage = store.avgCookiesPerCust;
  var totalCookies = 0;

  for (var i = 0; i < store.openHoursArray.length; i++) {
    var cookies = Math.floor(store.custsPerHourArray[i] * store.avgCookiesPerCust);
    // console.log('Cookies this hour:', cookies);
    totalCookies += cookies;
    store.cookiesPerHourArray.push(cookies);
  }
  store.dailySalesTotal = totalCookies;
  return totalCookies;
}

// Display the sales numbers for a given store as a list.
// CHANGE THE NAME OF THIS FUNCTION TO 'render'
function render(store) {
  var salesTotal = projectedSales(store);
  var salesList = document.getElementById(store.identifier);

  for (var i = 0; i < store.cookiesPerHourArray.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = store.openHoursArray[i] + ': ' + store.cookiesPerHourArray[i] + ' cookies';
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
    render(store);
  }
}

generateSalesNumbers();
