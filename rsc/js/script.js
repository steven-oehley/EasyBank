'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// EASYBANK APP

// Data
const account1 = {
  owner: 'Steven OEhley',
  transactions: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  transactionDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-07-26T17:01:17.194Z',
    '2023-07-28T23:36:17.929Z',
    '2023-08-01T10:51:36.790Z',
  ],
  currency: 'ZAR',
  locale: 'en-GB',
};

const account2 = {
  owner: 'Jessica Davis',
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  transactionDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  transactionDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  transactionDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
  ],
  currency: 'USD',
  locale: 'en-GB',
};

const accounts = [account1, account2, account3, account4];

let activeAccount;
let sortedDisplay = false;
// ==========================================================================
// Elements
// ==========================================================================

// label elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelErrorTransfer = document.querySelector('.error__message--transfer');
const labelErrorLoan = document.querySelector('.error__message--loan');
const labelErrorClose = document.querySelector('.error__message--close');
const labelTimer = document.querySelector('.timer');

// container elements
const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.movements');

// buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

// input elements
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// ==========================================================================
// Functions
// ==========================================================================
function displayTransactions(account, sort = false) {
  let withdrawalNumber = 1;
  let depositNumber = 1;

  // prevent users from seeing others transactions if log in one after the other
  containerTransactions.innerHTML = '';

  const transactions = sort
    ? [...account.transactions].sort((a, b) => a - b)
    : account.transactions;

  transactions.forEach((transaction, index) => {
    const transactionDate = new Date(activeAccount.transactionDates[index]);
    const day = `${transactionDate.getDate()}`.padStart(2, 0); // padStart will insert a zero if value less than 2 in length
    const month = `${transactionDate.getMonth() + 1}`.padStart(2, 0); // month are zero indexed add one then padStart ie 3 will be 03
    const year = transactionDate.getFullYear();
    const dateToRender = `${day}/${month}/${year}`;

    const transactionType = transaction > 0 ? 'deposit' : 'withdrawal';
    const htmlToRender = `
    <div class="movements__row">
          <div class="movements__type movements__type--${transactionType}">T${
      index + 1
    } ${transactionType} #${
      transactionType === 'deposit' ? depositNumber : withdrawalNumber
    }     </div>
          <div class="movements__date">${dateToRender}</div>       
 
          <div class="movements__value movements__value--${transactionType}">R ${transaction.toFixed(
      2
    )}
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

function createDate(time = true) {
  const currentDate = new Date();
  // want - day / month / year
  const day = `${currentDate.getDate()}`.padStart(2, 0); // padStart will insert a zero if value less than 2 in length
  const month = `${currentDate.getMonth()}`.padStart(2, 0); // month are zero indexed add one then padStart ie 3 will be 03
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const dateToRender = time
    ? `${day}/${month}/${year}, ${hour}:${minute}`
    : `${day}/${month}/${year}`;
  return dateToRender;
}

function calcDisplayBalance(account) {
  const balance = account.transactions.reduce(
    (acc, transaction) => acc + transaction,
    0
  );
  account.balance = balance;
  labelBalance.textContent = `${balance.toFixed(2)} ZAR`;
}

function calcDisplaySummary(account) {
  const depositsTotal = account.transactions
    .filter(transac => transac > 0)
    .reduce((acc, transac) => acc + transac);
  const withdrawalsTotal = account.transactions
    .filter(transac => transac < 0)
    .reduce((acc, transac) => acc + transac);
  const interestTotal = account.transactions
    .filter(transac => transac > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interestPayment => interestPayment > 1) // bank not pay interest on cents
    .reduce((acc, interest) => acc + interest);

  labelSumIn.textContent = `R ${depositsTotal.toFixed(2)}`;
  labelSumOut.textContent = `R ${Math.abs(withdrawalsTotal).toFixed(2)}`;
  labelSumInterest.textContent = `R ${interestTotal.toFixed(2)}`;
}

function updateUIForAccount() {
  // display transactions
  displayTransactions(activeAccount);
  // display balance
  calcDisplayBalance(activeAccount);
  // display summary
  calcDisplaySummary(activeAccount);
  // show app & clear input fields
}

// ==========================================================================
// Event Handlers
// ==========================================================================

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  activeAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  if (activeAccount?.pin === +inputLoginPin.value) {
    // display welcome message
    labelWelcome.textContent = `Hi ${activeAccount.owner}`;
    // update UI with account info
    updateUIForAccount();
    //set date before showing app
    labelDate.textContent = createDate(true);
    // show app
    containerApp.style.opacity = 100;
    // reset login form / information
    inputLoginPin.value = '';
    inputLoginUsername.value = '';
    inputLoginPin.blur(); // remove focus
  }
});

btnTransfer.addEventListener('click', e => {
  // prevent form default
  e.preventDefault();

  // transfer to and amount values
  const transferTo = inputTransferTo.value;
  const transferAmount = +inputTransferAmount.value;

  // find transferTo account from username
  const transferAccount = accounts.find(acc => acc.username === transferTo);

  // move money out of activeAccount and into transferAccount
  if (
    activeAccount.balance >= transferAmount &&
    transferAmount > 0 &&
    transferAccount &&
    transferAccount?.username !== activeAccount.username
  ) {
    // transfer money
    const dateToPush = new Date().toISOString();

    activeAccount.transactions.push(-transferAmount);
    transferAccount.transactions.push(transferAmount);
    activeAccount.transactionDates.push(dateToPush);
    transferAccount.transactionDates.push(dateToPush);
    updateUIForAccount();
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
    inputTransferAmount.blur();
    labelErrorTransfer.innerHTML = '';
    console.log('VALID TRANSFER');
  } else {
    labelErrorTransfer.innerHTML =
      '<p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span> Error with details, please try again.</p>';
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
    inputTransferAmount.blur();
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanRequest = Math.floor(inputLoanAmount.value); // Math.floor() does type coercion no need to convert
  // only grant loan if at least one deposit is >= 10% of loan request
  if (
    activeAccount.transactions.some(
      transaction => transaction >= loanRequest * 0.1
    )
  ) {
    const dateToPush = new Date().toISOString();
    activeAccount.transactions.push(loanRequest);
    activeAccount.transactionDates.push(dateToPush);
    updateUIForAccount();
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
    labelErrorLoan.innerHTML = '';
  } else {
    labelErrorLoan.innerHTML =
      '<p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span> No deposit, at least 10% of the requested loan</p>';
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});

btnClose.addEventListener('click', e => {
  // prevent default
  e.preventDefault();
  const accountUser = inputCloseUsername.value;
  const accountPin = +inputClosePin.value;
  if (
    activeAccount.username === accountUser &&
    activeAccount.pin === accountPin
  ) {
    const accToDeleteIndex = accounts.findIndex(
      acc => acc.username === activeAccount.username
    );
    // delete account
    accounts.splice(accToDeleteIndex, 1);

    //hide UI
    containerApp.style.opacity = 0;

    // reset welcome message
    labelWelcome.textContent = 'Log in to get started';

    // reset labelErrorClose
    labelErrorClose.innerHTML = '';
  } else {
    labelErrorClose.innerHTML =
      '<p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span> Error with details, please try again.</p>';
  }

  // reset labels
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  inputClosePin.blur();
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  sortedDisplay = !sortedDisplay;
  displayTransactions(activeAccount, sortedDisplay);
});

// ==========================================================================
// Create Object Properties - usernames
// ==========================================================================
createUsernames(accounts);
