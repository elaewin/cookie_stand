// Array of stores
var allStores = [];

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Store constructor function
function Store(identifier, storeName, storeAddress, storePhone, storeOpens, storeCloses, minCustsPerHour, maxCustsPerHour, avgCookiesPerCust) {
  this.identifier = identifier;
  this.storeName = storeName;
  this.storeAddress = storeAddress;
  this.storePhone = storePhone;
  this.storeOpens = storeOpens;
  this.storeCloses = storeCloses;
  this.minCustsPerHour = minCustsPerHour;
  this.maxCustsPerHour = maxCustsPerHour;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.openHoursArray = [];
  this.custsPerHourArray = [];
  this.cookiesPerHourArray = [];
  this.dailySalesTotal = 0;

  allStores.push(this);

  // Generate and array of the hours the store is open, in a string
  this.createOpenHours = function() {
    var storeIsOpen = this.storeCloses - this.storeOpens;
    for (var i = 0; i < storeIsOpen; i++) {
      var timeAsString = (i + this.storeOpens) + ':00 - ' + (i + this.storeOpens + 1) + ':00';
      // console.log('Time:', timeAsString);
      this.openHoursArray.push(timeAsString);
    }
  };

  // Updates a store's array of custsPerHourArray with a random number of customers per hour for each hour that the store is open.
  this.generateHourlyTraffic = function() {
    hoursOfOperation = this.createOpenHours();

    for (var i = 0; i < this.openHoursArray.length; i++) {
      var customers = getRandomIntInclusive(this.minCustsPerHour, this.maxCustsPerHour);
      // console.log('Customers per hour:', customers);
      this.custsPerHourArray.push(customers);
    }
  }
};

var firstAndPike = new Store('firstandpike', '1st and Pike', '102 Pike St, Seattle, WA 98101', '206-xxx-xxxx', 6, 20, 23, 65, 6.3);

var seatac = new Store('seatac', 'Seatac Airport', 'Concourse D, 17801 International Blvd, Seattle, WA 98158', '425-xxx-xxxx', 6, 20, 3, 24, 1.2);

var seattleCenter = new Store('seattlecenter', 'Seattle Center', '305 Harrison St, Seattle, WA 98109', '206-xxx-xxxx', 6, 20, 11, 38, 3.7);

var capitolHill = new Store('capitolhill', 'Capitol Hill', '434 Broadway Avenue E, Seattle, WA 98102', '206-xxx-xxxx', 6, 20, 20, 38, 2.3);

var alki = new Store('alki', 'Alki', '2742 Alki Ave SW; Seattle, WA 98116', '206-xxx-xxxx', 6, 20, 2, 16, 4.6);

// show objects in the console for testing
function testInConsole() {
  for (var i = 0; i < allStores.length; i++) {
    allStores[i].generateHourlyTraffic();
    console.dir(allStores[i]);
  }
}

testInConsole();

// // Generate sales numbers for each store in an array of stores
// function generateSalesNumbers() {
//   for (var i = 0; i < allStores.length; i++) {
//     var store = allStores[i];
//     render(store);
//   }
// }
//
// generateSalesNumbers();
//

//

//
// // Updates a store's array of cookiesPerHourArray by multiplying each item in a store's custsPerHourArray array by the average number of cookies sold per customer for that store.
// function projectedSales(store) {
//   generateHourlyTraffic(store);
//   var hourlyCookieAverage = store.avgCookiesPerCust;
//   var totalCookies = 0;
//
//   for (var i = 0; i < store.openHoursArray.length; i++) {
//     var cookies = Math.floor(store.custsPerHourArray[i] * store.avgCookiesPerCust);
//     // console.log('Cookies this hour:', cookies);
//     totalCookies += cookies;
//     store.cookiesPerHourArray.push(cookies);
//   }
//   store.dailySalesTotal = totalCookies;
//   return totalCookies;
// }
//
// // Display the sales numbers for a given store as a list.
// // CHANGE THE NAME OF THIS FUNCTION TO 'render'
// function render(store) {
//   var salesTotal = projectedSales(store);
//   var salesList = document.getElementById(store.identifier);
//
//   for (var i = 0; i < store.cookiesPerHourArray.length; i++) {
//     var listItem = document.createElement('li');
//     listItem.textContent = store.openHoursArray[i] + ': ' + store.cookiesPerHourArray[i] + ' cookies';
//     salesList.appendChild(listItem);
//   }
//   var listItem = document.createElement('li');
//   listItem.textContent = 'Total: ' + salesTotal + ' cookies';
//   salesList.appendChild(listItem);
// }
