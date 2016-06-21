// Array of stores
var allStores = [];

// Array of hours the stores are open
var openHoursArray = ['6:00 - 7:00am', '7:00 - 8:00am', '8:00 - 9:00am', '9:00 - 10:00am', '10:00 - 11:00am', '11:00 - 12:00pm', '12:00 - 1:00pm', '1:00 - 2:00pm', '2:00 - 3:00pm', '3:00 - 4:00pm', '4:00 - 5:00pm', '5:00 - 6:00pm', '6:00 - 7:00pm', '7:00 - 8:00pm'];

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Store constructor function
function Store(identifier, storeName, storeAddress, storePhone, storeOpens, storeCloses, minCustsPerHour, maxCustsPerHour, avgCookiesPerCust) {
  this.identifier = identifier; // identifier should be all lowercase
  this.storeName = storeName;
  this.storeAddress = storeAddress;
  this.storePhone = storePhone;
  this.minCustsPerHour = minCustsPerHour;
  this.maxCustsPerHour = maxCustsPerHour;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.custsPerHourArray = [];
  this.cookiesPerHourArray = [];
  this.dailySalesTotal = 0;
  allStores.push(this);

  // Updates a store's array of custsPerHourArray with a random number of customers per hour for each hour that the store is open.
  this.generateHourlyTraffic = function() {
    for (var i = 0; i < openHoursArray.length; i++) {
      var customers = getRandomIntInclusive(this.minCustsPerHour, this.maxCustsPerHour);
      // console.log('Customers per hour:', customers);
      this.custsPerHourArray.push(customers);
    }
  };

  // Updates a store's array of cookiesPerHourArray by multiplying each item in a store's custsPerHourArray array by the average number of cookies sold per customer for that store.
  this.projectedSales = function() {
    this.generateHourlyTraffic();
    var hourlyCookieAverage = this.avgCookiesPerCust;
    var totalCookies = 0;
    for (var i = 0; i < openHoursArray.length; i++) {
      var cookies = Math.floor(this.custsPerHourArray[i] * this.avgCookiesPerCust);
      // console.log('Cookies this hour:', cookies);
      totalCookies += cookies;
      this.cookiesPerHourArray.push(cookies);
    }
    this.dailySalesTotal = totalCookies;
    return totalCookies;
  };

  // Display the sales numbers for a given store as a list.
  this.render = function() {
    var salesTotal = this.projectedSales();
    var salesList = document.getElementById(this.identifier);
    for (var i = 0; i < this.cookiesPerHourArray.length; i++) {
      var listItem = document.createElement('li');
      listItem.textContent = openHoursArray[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
      salesList.appendChild(listItem);
    }
    var listItem = document.createElement('li');
    listItem.textContent = 'Total: ' + salesTotal + ' cookies';
    salesList.appendChild(listItem);
  };
};

var firstAndPike = new Store('firstandpike', '1st and Pike', '102 Pike St, Seattle, WA 98101', '206-xxx-xxxx', 23, 65, 6.3);

var seatac = new Store('seatac', 'Seatac Airport', 'Concourse D, 17801 International Blvd, Seattle, WA 98158', '425-xxx-xxxx', 3, 24, 1.2);

var seattleCenter = new Store('seattlecenter', 'Seattle Center', '305 Harrison St, Seattle, WA 98109', '206-xxx-xxxx', 11, 38, 3.7);

var capitolHill = new Store('capitolhill', 'Capitol Hill', '434 Broadway Avenue E, Seattle, WA 98102', '206-xxx-xxxx', 20, 38, 2.3);

var alki = new Store('alki', 'Alki', '2742 Alki Ave SW; Seattle, WA 98116', '206-xxx-xxxx', 2, 16, 4.6);

// Generate header row
function makeHeaderRow() {
  for(i = 0; i < openHoursArray.length; i++) {
    
  }
}

// Generate sales numbers for each store in an array of stores
// function generateSalesNumbers() {
//   for (var i = 0; i < allStores.length; i++) {
//     console.dir(allStores[i]);
//     allStores[i].render();
//   }
// }
//
// generateSalesNumbers();
