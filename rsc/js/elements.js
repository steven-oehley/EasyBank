// DOM Elements
export const elements = {
  // label elements
  labelWelcome: document.querySelector('.welcome'),
  labelDate: document.querySelector('.date'),
  labelBalance: document.querySelector('.balance__value'),
  labelSumIn: document.querySelector('.summary__value--in'),
  labelSumOut: document.querySelector('.summary__value--out'),
  labelSumInterest: document.querySelector('.summary__value--interest'),
  labelErrorTransfer: document.querySelector('.error__message--transfer'),
  labelErrorLoan: document.querySelector('.error__message--loan'),
  labelErrorClose: document.querySelector('.error__message--close'),
  labelTimer: document.querySelector('.timer'),
  // container elements
  containerApp: document.querySelector('.app'),
  containerTransactions: document.querySelector('.movements'),
  // buttons
  btnLogin: document.querySelector('.login__btn'),
  btnTransfer: document.querySelector('.form__btn--transfer'),
  btnLoan: document.querySelector('.form__btn--loan'),
  btnClose: document.querySelector('.form__btn--close'),
  btnSort: document.querySelector('.btn--sort'),
  // inputs
  inputLoginUsername: document.querySelector('.login__input--user'),
  inputLoginPin: document.querySelector('.login__input--pin'),
  inputTransferTo: document.querySelector('.form__input--to'),
  inputTransferAmount: document.querySelector('.form__input--amount'),
  inputLoanAmount: document.querySelector('.form__input--loan-amount'),
  inputCloseUsername: document.querySelector('.form__input--user'),
  inputClosePin: document.querySelector('.form__input--pin'),
};
