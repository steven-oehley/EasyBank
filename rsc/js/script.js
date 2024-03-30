'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// EASYBANK APP

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

let activeAccount;
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

function calcDisplayBalance(account) {
  const balance = account.transactions.reduce(
    (acc, transaction) => acc + transaction,
    0
  );
  account.balance = balance;
  labelBalance.textContent = `${balance} ZAR`;
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

  labelSumIn.textContent = `R ${depositsTotal}`;
  labelSumOut.textContent = `R ${Math.abs(withdrawalsTotal)}`;
  labelSumInterest.textContent = `R ${interestTotal}`;
}

function updateUIForAccount() {
  // display transactions
  displayTransactions(activeAccount.transactions);
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
    updateUIForAccount();
    containerApp.style.opacity = 100;
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
    activeAccount.transactions.push(-transferAmount);
    transferAccount.transactions.push(transferAmount);
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
  const loanRequest = +inputLoanAmount.value;
  // only grant loan if at least one deposit is >= 10% of loan request
  if (
    activeAccount.transactions.some(
      transaction => transaction >= loanRequest * 0.1
    )
  ) {
    activeAccount.transactions.push(loanRequest);
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

// ==========================================================================
// Create Object Properties - usernames
// ==========================================================================
createUsernames(accounts);
