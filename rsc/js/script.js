'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Steven OEhley',
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  transactions: [430, 1000, 700, 50, 90],
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
const containerTransactions = document.querySelector('.movements');

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

function displayTransactions(transactionsArr) {
  let withdrawalNumber = 1;
  let depositNumber = 1;
  transactionsArr.forEach((transaction, index) => {
    const transactionType = transaction > 0 ? 'deposit' : 'withdrawal';
    const htmlToRender = `
    <div class="movements__row">
          <div class="movements__type movements__type--${transactionType}">T${
      index + 1
    } ${transactionType} #${
      transactionType === 'deposit' ? depositNumber : withdrawalNumber
    }</div>
          <div class="movements__value movements__value--${transactionType}">R ${transaction}
          </div>
        </div>
    `;
    containerTransactions.insertAdjacentHTML('afterbegin', htmlToRender);

    transactionType === 'deposit' ? depositNumber++ : withdrawalNumber++;
  });
}

function createUsernames(accs) {
  accs.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(flName => flName[0])
      .join('');
  });
}

function calcDisplayBalance(transactions) {
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction,
    0
  );
  labelBalance.textContent = `${balance} ZAR`;
}

function calcDisplaySummary(transactions, interestRate) {
  const depositsTotal = transactions
    .filter(transac => transac > 0)
    .reduce((acc, transac) => acc + transac);
  const withdrawalsTotal = transactions
    .filter(transac => transac < 0)
    .reduce((acc, transac) => acc + transac);
  const interestTotal = transactions
    .filter(transac => transac > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter(interestPayment => interestPayment > 1) // bank not pay interest on cents
    .reduce((acc, interest) => acc + interest);

  labelSumIn.textContent = `R ${depositsTotal}`;
  labelSumOut.textContent = `R ${Math.abs(withdrawalsTotal)}`;
  labelSumInterest.textContent = `R ${interestTotal}`;
}

createUsernames(accounts);
displayTransactions(account1.transactions);
calcDisplayBalance(account1.transactions);
calcDisplaySummary(account1.transactions, account1.interestRate);
