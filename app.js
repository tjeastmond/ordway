const testData = require('./data');
const bestSeats = require('./bestSeats');

const res0 = bestSeats(testData[0]);
console.log('res0:', res0);

const res1 = bestSeats(testData[1], 2);
console.log('res1:', res1);

const res2 = bestSeats(testData[2], 3);
console.log('res2:', res2);
