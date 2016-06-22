// Array of stores
var allStoresArray = [];

// Array of hours the stores are open
var openHoursArray = ['6:00 - 7:00am', '7:00 - 8:00am', '8:00 - 9:00am', '9:00 - 10:00am', '10:00 - 11:00am', '11:00 - 12:00pm', '12:00 - 1:00pm', '1:00 - 2:00pm', '2:00 - 3:00pm', '3:00 - 4:00pm', '4:00 - 5:00pm', '5:00 - 6:00pm', '6:00 - 7:00pm', '7:00 - 8:00pm'];
 //Access the DOM at the table on the sales page
var salesTable = document.getElementById('sales');

//Access the form in the DOM
var salesForm = document.getElementById('new_store_form');


// CookieHut constructor function
function CookieHut(identifier, storeName, storeAddress, storePhone, minCustsPerHour, maxCustsPerHour, avgCookiesPerCust) {
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

  allStoresArray.push(this);

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
  // ADD CLASS FOR CELLS WITH THE LOC NAMES
  // ADD IDS TO THE ROWS AS THEY'RE CREATED
  this.render = function(rowColorCheck) {
    var salesTotal = this.projectedSales();
    var trEl = document.createElement('tr');
    if((rowColorCheck % 2) === 0) {
      trEl.className = 'grey';
    }
    var tdEl = document.createElement('td');
    tdEl.textContent = storeName;
    trEl.appendChild(tdEl);
    // GET RID OF VAR ON VARIABLES THAT ARE ALREADY DECLARED IN THE FUNCTION
    var tdEl = document.createElement('td');
    tdEl.textContent = salesTotal;
    trEl.appendChild(tdEl);
    for(var i = 0; i < this.cookiesPerHourArray.length; i++) {
      var tdEl = document.createElement('td');
      tdEl.textContent = this.cookiesPerHourArray[i];
      trEl.appendChild(tdEl);
    }
    salesTable.appendChild(trEl);
  };
};

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Create instance of CookieHut for all existing stores.
var firstAndPike = new CookieHut('firstandpike', '1st and Pike', '102 Pike St, Seattle, WA 98101', '206-xxx-xxxx', 23, 65, 6.3);

var seatac = new CookieHut('seatac', 'Seatac Airport', 'Concourse D, 17801 International Blvd, Seattle, WA 98158', '425-xxx-xxxx', 3, 24, 1.2);

var seattleCenter = new CookieHut('seattlecenter', 'Seattle Center', '305 Harrison St, Seattle, WA 98109', '206-xxx-xxxx', 11, 38, 3.7);

var capitolHill = new CookieHut('capitolhill', 'Capitol Hill', '434 Broadway Avenue E, Seattle, WA 98102', '206-xxx-xxxx', 20, 38, 2.3);

var alki = new CookieHut('alki', 'Alki', '2742 Alki Ave SW; Seattle, WA 98116', '206-xxx-xxxx', 2, 16, 4.6);


// Populate the sales table with projected sales information
// Generate header row
// ADD CLASSES TO THE CELLS IN THE HEADER ROW
function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th'); // blank space in header row
  thEl.textContent = '';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  trEl.appendChild(thEl);
  for(i = 0; i < openHoursArray.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = openHoursArray[i];
    trEl.appendChild(thEl);
  }
  salesTable.appendChild(trEl);
}

// Generate footer row
// ADD CLASSES TO THE CELLS IN THE FOOTER ROW
function makeFooterRow() {
  var trEl = document.createElement('tr');
  trEl.id = 'footer';
  var tdEl = document.createElement('td'); // blank space in footer row
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);
  tdEl = document.createElement('td');
  grandTotal = 0;
  for(var i = 0; i < allStoresArray.length; i++) {
    grandTotal += allStoresArray[i].dailySalesTotal;
  }
  tdEl.textContent = grandTotal;
  trEl.appendChild(tdEl);
  for( i = 0; i < openHoursArray.length; i++) {
    tdEl = document.createElement('td');
    var totalByHour = 0;
    for(var j = 0; j < allStoresArray.length; j++) {
      totalByHour += allStoresArray[j].cookiesPerHourArray[i];
    }
    tdEl.textContent = totalByHour;
    trEl.appendChild(tdEl);
  }
  salesTable.appendChild(trEl);
};

// Generate sales numbers for each store in an array of stores
function generateSalesNumbers() {
  for(var i = 0; i < allStoresArray.length; i++) {
    // console.dir(allStoresArray[i]);
    allStoresArray[i].render(i);
  }
}
// function testInConsole() {
//   for (var i = 0; i < allStoresArray.length; i++){
//     allStoresArray[i].generateHourlyTraffic();
//     console.dir(allStoresArray[i]);
//   }
// }
makeHeaderRow();
generateSalesNumbers();
makeFooterRow();
//add new store

function handleNewStoreSubmit(event){
  event.preventDefault();
  var counter = 0;

  var identifier = event.target.identifier.value;
  var storeName = event.target.storeName.value;
  var storeAddress = event.target.storeAddress.value;
  var storePhone = event.target.storePhone.value;
  var minCustsPerHour = event.target.minCustsPerHour.value;
  var maxCustsPerHour = event.target.maxCustsPerHour.value;
  var avgCookiesPerCust = event.target.avgCookiesPerCust.value;

  if (!identifier || !storeName || !storeAddress || !storePhone || !minCustsPerHour || !maxCustsPerHour || !avgCookiesPerCust) {
    return alert('Fields cannot be empty!');
  }

  var newStore = new CookieHut(identifier, storeName, storeAddress, storePhone, minCustsPerHour, maxCustsPerHour, avgCookiesPerCust);

  document.getElementById('footer').innerHTML = '';
  // salesTable.innerHTML = '';

  // console.log('salesTable', salesTable);

  newStore.render(counter);
  makeFooterRow();
  counter++;

  event.target.identifier.value = null;
  event.target.storeName.value = null;
  event.target.storeAddress.value = null;
  event.target.storePhone.value = null;
  event.target.minCustsPerHour.value = null;
  event.target.maxCustsPerHour.value = null;
  event.target.avgCookiesPerCust.value = null;
  // console.log(event.target);

}

new_store_form.addEventListener('submit',handleNewStoreSubmit);
