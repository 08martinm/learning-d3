var data = [];
// this is our data array

var startingDate = new Date(2012, 8, 18);
// this is a date object

for (var i = 0; i < 10; i++) { // loop 10 times to create 10 data objects
  var tmpObj = {};

  // this is a temporary data object
  tmpObj.date = new Date(
      startingDate.getFullYear(),
      startingDate.getMonth(),
      startingDate.getDate() + i
  );

  // the data for this data object. Increment it from the starting date.
  tmpObj.dailyAverageUsers = Math.round(Math.random() * 300); // random value. Round it to a whole number.

  data.push(tmpObj); // push the object into our data array
}

console.log(data);
