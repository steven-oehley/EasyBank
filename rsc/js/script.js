'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// slice method - does not mutate, copy of original
console.log(arr.slice(-2));
console.log(arr.slice(0, 2)); // end - stop but don't include
console.log(arr.slice(1, -2));

// shallow copy with spread operator or ...spread
// use slice if want to chain

// splice is similar but mutates array - think of slice as copy, splice as cut
console.log(arr.splice(2));
console.log(arr);

// reverse - reverses the array, mutates the original
const arr2 = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5];
arr2.reverse();
console.log(arr2);

// concat - does not mutate
const arr3 = [1, 2, 3, 2, 2, 34, 3, 445, 5];
const arr4 = [90, 23, 423, 54, 453, 5, 35, 35, 35, 323, 23, 3, 45, 56, 6, 7];

const allNums = arr3.concat(arr4);
console.log(allNums);

// alternative
// const allNums = [...arr3, ...arr4];

// join
console.log(allNums.join(' + '));

// push, pop, shift, unshift

// at method, same as indexing with square brackets []
console.log(allNums.at(0)); // same as allNums[0]

// .at() good for getting last element (also works on strings)
allNums.at(-1);
// could also use allNums.slice(-1)[0] need to index as returns an array
// or allNums[allNums.length - 1]

allNums.forEach(num => num % 2 === 0 && console.log(`${num} is even!`));
allNums.forEach(
  (num, index) =>
    num % 2 === 0 && console.log(`${num} is even at index position ${index}!`)
);
allNums.forEach(
  (num, index, arr) =>
    num % 2 === 0 &&
    console.log(`${num} is even at index position ${index} in array - ${arr}!`)
);

// continue and break do not work in a forEach - one reason might want to use for of

const car = {
  color: 'red',
  paint(newColor) {
    this.color = newColor;
    console.log(`The car has been painted ${this.color}.`);
  },
};

const colorsToPaint = ['blue', 'green', 'yellow'];

// Using forEach without changing the context of 'this'
colorsToPaint.forEach(color => {
  // 'this' inside this callback refers to the global object
  car.paint(color); // This will not work as expected
});

// Output:
// The car has been painted undefined.
// The car has been painted undefined.
// The car has been painted undefined.
