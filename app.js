// NOTES FOR TUESDAY:
// MAKE THE storeName ALL LC, AS IT WOULD BE USED FOR AN ID OR CLASS VALUE.
// MAYBE CLEAR THE ARRAYS IN EACH STORE BEFORE RUNNING THE FUNCTIONS TO FILL THEM.

var firstAndPike = {
  storeName: 'firstAndPike',
  storeNamePretty: '1st and Pike',
  storeAddress: '102 Pike St, Seattle, WA 98101',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHoursArray: [],
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  avgCookiesPerCust: 6.3,
  custsPerHourArray: [],
  cookiesPerHourArray: [],
  dailySalesTotal: 0
};

var seatac = {
  storeName: 'seatac',
  storeNamePretty: 'Seatac Airport',
  storeAddress: 'Concourse D, 17801 International Blvd, Seattle, WA 98158',
  storePhone: '425-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHoursArray: [],
  minHourlyCustomers: 3,
  maxHourlyCustomers: 24,
  avgCookiesPerCust: 1.2,
  custsPerHourArray: [],
  cookiesPerHourArray: [],
  dailySalesTotal: 0
};

var seattleCenter = {
  storeName: 'seattleCenter',
  storeNamePretty: 'Seattle Center',
  storeAddress: '305 Harrison St, Seattle, WA 98109',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHoursArray: [],
  minHourlyCustomers: 11,
  maxHourlyCustomers: 38,
  avgCookiesPerCust: 3.7,
  custsPerHourArray: [],
  cookiesPerHourArray: [],
  dailySalesTotal: 0
};

var capitolHill = {
  storeName: 'capitolHill',
  storeNamePretty: 'Capitol Hill',
  storeAddress: '434 Broadway Avenue E, Seattle, WA 98102',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHoursArray: [],
  minHourlyCustomers: 20,
  maxHourlyCustomers: 38,
  avgCookiesPerCust: 2.3,
  custsPerHourArray: [],
  cookiesPerHourArray: [],
  dailySalesTotal: 0
};

var alki = {
  storeName: 'alki',
  storeNamePretty: 'Alki',
  storeAddress: '2742 Alki Ave SW; Seattle, WA 98116',
  storePhone: '206-xxx-xxxx',
  storeOpens: 6, // time the store opens, 24 hour clock
  storeCloses: 20, // time the store closes, 24 hour clock
  openHoursArray: [],
  minHourlyCustomers: 2,
  maxHourlyCustomers: 16,
  avgCookiesPerCust: 4.6,
  custsPerHourArray: [],
  cookiesPerHourArray: [],
  dailySalesTotal: 0
};

// Array of stores
var allStores = [firstAndPike, seatac, seattleCenter, capitolHill, alki];

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Updates a store's array of custsPerHourArray with a random number of customers per hour for each hour that the store is open.
function generateHourlyTraffic(store) {
  var storeIsOpen = store.storeCloses - store.storeOpens;
  for (var i = 0; i < storeIsOpen; i++) {
    var customers = getRandomIntInclusive(store.minHourlyCustomers, store.maxHourlyCustomers);
    console.log('hourly customers at ' + (i + 6) + ' to ' + (i + 7) + ': ' + customers);
    store.custsPerHourArray.push(customers);
  }
}

// Updates a store's array of cookiesPerHourArray by multiplying each item in a store's custsPerHourArray array by the average number of cookies sold per customer for that store.
function projectedHourlySales(store) {
  var hourlyCookieAverage = store.avgCookiesPerCust;
  for (var i = 0; i < store.custsPerHourArray.length; i++) {
    var cookies = Math.floor(store.custsPerHourArray[i] * store.avgCookiesPerCust);
    console.log('Cookies projected at ' + (i + 6) + ' to ' + (i + 7) + ': ' + cookies);
    store.cookiesPerHourArray.push(cookies);
  }
}

// Calculates the total number of cookies sold in a store based on the amounts in that store's cookiesPerHourArray array, returns the total amount sold.
// COMBINE THIS WITH THE FUNCTION ABOVE; RETURN TOTAL COOKIES FROM THERE.
function projectedDailySales(store) {
  var totalCookies = 0;
  for (var i = 0; i < store.cookiesPerHourArray.length; i++) {
    totalCookies += store.cookiesPerHourArray[i];
    console.log('Ongoing total: ' + totalCookies);
  }
  store.dailySalesTotal = totalCookies;
  return totalCookies;
}

// Generate and array of the hours the store is open, in a string
// NOTES FOR TUESDAY: MAKE THIS THE FIRST FUNCTION AND THEN USE THE LENGTH OF THIS ARRAY TO RUN THE FOR LOOP FOR THE LATER CALCULATIONS.
function createOpenHours(store) {
  for (var i = 0; i < store.custsPerHourArray.length; i++) {
    var timeAsString = (i + store.storeOpens) + ':00 - ' + (i + store.storeOpens + 1) + ':00';
    console.log('Time: ' + timeAsString);
    store.openHoursArray.push(timeAsString);
  }
}

// Display the sales numbers for a given store as a list.
// CHANGE THE NAME OF THIS FUNCTION TO 'render'
function displaySalesNumbers(store) {
  var salesList = document.getElementById(store.storeName);
  var salesTotal = projectedDailySales(store);

  for (var i = 0; i < store.cookiesPerHourArray.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = store.openHoursArray[i] + ': ' + store.cookiesPerHourArray[i] + ' cookies';
    salesList.appendChild(listItem);
  }
  var listItem = document.createElement('li');
  listItem.textContent = 'Total: ' + salesTotal + ' cookies';
  salesList.appendChild(listItem);
}

// TUESDAY NOTES: MAYBE NEST FUNCTIONS SO THAT EACH SUCCESSIVE FUNCTION CALLS FROM THE PREVIOUSLY REQUIRED FUNCTION, MAKING CALLING INDIVIDUAL FUNCTIONS HERE UNNECESSARY??? CASCADE THE CALLS WITHIN SUCCESSIVE FUNCTIONS INSTEAD.
// Generate sales numbers for each store in an array of stores
function generateSalesNumbers() {
  for (var i = 0; i < allStores.length; i++) {
    var store = allStores[i];
    generateHourlyTraffic(store);
    projectedHourlySales(store);
    createOpenHours(store); //MOVE THIS TO THE TOP AFTER THIS IS UPDATED.
    displaySalesNumbers(store);
  }
}

generateSalesNumbers();
