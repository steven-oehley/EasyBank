'use strict';

// EASYBANK APP

import { accounts } from './accounts.js';
import { elements } from './elements.js';

let activeAccount;
let sortedDisplay = false;

// ==========================================================================
// Functions
// ==========================================================================
function calcDaysPassed(d1, d2) {
  const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
  const diffInMilliseconds = Math.abs(d2 - d1);
  return Math.floor(diffInMilliseconds / oneDay); // return the number of whole days
}

function displayTransactions(account, sort = false) {
  let withdrawalNumber = 1;
  let depositNumber = 1;

  // prevent users from seeing others transactions if log in one after the other
  elements.containerTransactions.innerHTML = '';

  const transactions = sort
    ? [...account.transactions].sort((a, b) => a - b)
    : account.transactions;

  transactions.forEach((transaction, index) => {
    const currentDate = new Date();
    const transactionDate = new Date(account.transactionDates[index]);
    const day = `${transactionDate.getDate()}`.padStart(2, 0); // padStart will insert a zero if value less than 2 in length
    const month = `${transactionDate.getMonth() + 1}`.padStart(2, 0); // month are zero indexed add one then padStart ie 3 will be 03
    const year = transactionDate.getFullYear();
    const daysPassed = calcDaysPassed(transactionDate, currentDate);
    let dateToRender;

    if (daysPassed === 0) {
      dateToRender = 'today';
    } else if (daysPassed === 1) {
      dateToRender = 'yesterday';
    } else if (daysPassed <= 7) {
      dateToRender = `${daysPassed} days ago`;
    } else {
      dateToRender = `${day}/${month}/${year}`;
    }

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
    elements.containerTransactions.insertAdjacentHTML(
      'afterbegin',
      htmlToRender
    );

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
  elements.labelBalance.textContent = `${balance.toFixed(2)} ZAR`;
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

  elements.labelSumIn.textContent = `R ${depositsTotal.toFixed(2)}`;
  elements.labelSumOut.textContent = `R ${Math.abs(withdrawalsTotal).toFixed(
    2
  )}`;
  elements.labelSumInterest.textContent = `R ${interestTotal.toFixed(2)}`;
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

elements.btnLogin.addEventListener('click', e => {
  e.preventDefault();
  activeAccount = accounts.find(
    account => account.username === elements.inputLoginUsername.value
  );
  if (activeAccount?.pin === +elements.inputLoginPin.value) {
    // display welcome message
    elements.labelWelcome.textContent = `Hi ${activeAccount.owner}`;
    // update UI with account info
    updateUIForAccount();
    //set date before showing app
    elements.labelDate.textContent = createDate(true);
    // show app
    elements.containerApp.style.opacity = 100;
    // reset login form / information
    elements.inputLoginPin.value = '';
    elements.inputLoginUsername.value = '';
    elements.inputLoginPin.blur(); // remove focus
    console.log(activeAccount);
  }
});

elements.btnTransfer.addEventListener('click', e => {
  // prevent form default
  e.preventDefault();

  // transfer to and amount values
  const transferTo = elements.inputTransferTo.value;
  const transferAmount = +elements.inputTransferAmount.value;

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
    // push transfer amounts
    activeAccount.transactions.push(-transferAmount);
    transferAccount.transactions.push(transferAmount);
    // push same date for transactions
    activeAccount.transactionDates.push(dateToPush);
    transferAccount.transactionDates.push(dateToPush);

    // reset UI
    updateUIForAccount();
    elements.inputTransferTo.value = '';
    elements.inputTransferAmount.value = '';
    elements.inputTransferAmount.blur();
    elements.labelErrorTransfer.innerHTML = '';
  } else {
    elements.labelErrorTransfer.innerHTML =
      '<p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span> Error with details, please try again.</p>';
    elements.inputTransferTo.value = '';
    elements.inputTransferAmount.value = '';
    elements.inputTransferAmount.blur();
  }
});

elements.btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanRequest = Math.floor(elements.inputLoanAmount.value); // Math.floor() does type coercion no need to convert
  // only grant loan if at least one deposit is >= 10% of loan request
  if (
    activeAccount.transactions.some(
      transaction => transaction >= loanRequest * 0.1
    )
  ) {
    // get date
    const dateToPush = new Date().toISOString();
    // push date and amount
    activeAccount.transactions.push(loanRequest);
    activeAccount.transactionDates.push(dateToPush);
    // update UI
    updateUIForAccount();
    elements.inputLoanAmount.value = '';
    elements.inputLoanAmount.blur();
    elements.labelErrorLoan.innerHTML = '';
    console.log(activeAccount);
  } else {
    elements.labelErrorLoan.innerHTML =
      '<p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span> No deposit, at least 10% of the requested loan</p>';
    elements.inputLoanAmount.value = '';
    elements.inputLoanAmount.blur();
  }
});

elements.btnClose.addEventListener('click', e => {
  // prevent default
  e.preventDefault();
  const accountUser = elements.inputCloseUsername.value;
  const accountPin = +elements.inputClosePin.value;
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
    elements.containerApp.style.opacity = 0;

    // reset welcome message
    elements.labelWelcome.textContent = 'Log in to get started';

    // reset labelErrorClose
    elements.labelErrorClose.innerHTML = '';
  } else {
    elements.labelErrorClose.innerHTML =
      '<p><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span> Error with details, please try again.</p>';
  }

  // reset labels
  elements.inputCloseUsername.value = '';
  elements.inputClosePin.value = '';
  elements.inputClosePin.blur();
});

elements.btnSort.addEventListener('click', e => {
  e.preventDefault();
  sortedDisplay = !sortedDisplay;
  displayTransactions(activeAccount, sortedDisplay);
});

// ==========================================================================
// Create Object Properties - usernames
// ==========================================================================
createUsernames(accounts);
