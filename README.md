
# EasyBank Web Application 🏦
<hr>
<p align="center">
  <img width="680" height="auto" height="300" src="./rsc/images/EASY_BANK-removebg.png">
</p>

Welcome to EasyBank 💰, a simple and intuitive banking web application that provides various features for managing your finances.         
A live project demo can be viewed here : <a href="https://easybanklivedemo.netlify.app/">EASYBANK live demo</a>
Below is an overview of the functionality and features available in the EasyBank application:

## Functionality Overview 💳
#### Transfer Money 💵
Users can transfer money between their accounts or to other users.
Simply enter the recipient's username and the amount to transfer.
#### Loan Application 🤑
Users can request a loan from EasyBank.
Loan requests are processed realistically using a setTimeout function to add realism.
Upon successful loan approval, a modal pop-up confirms the loan application.
#### Close Account ❌
Users have the option to close their account.
To close an account, users need to confirm their username and PIN.
#### Sort Transactions 🏦
Users can sort their transaction history by date or amount.
Clicking the "Sort" button toggles between sorting by date and sorting by amount.
#### Dynamic Welcome Message 👋
Upon logging in, users are greeted with a dynamic welcome message that includes their name.
Login Functionality
Users can log in using their username and PIN.
After successful login, users gain access to their account dashboard.
#### Logout Timer ⌛
To enhance security, a logout timer automatically logs the user out after 5 minutes of inactivity.
The timer resets on mouse move or keyboard press, ensuring continuous activity during the user's session.
#### Dynamic Data Display 💹
All data, including account balance, transaction history, and summary, is dynamically loaded and updated in real-time.
Transactions are labeled as withdrawals or deposits and display the date of the transaction.
EasyBank keeps track of the number of withdrawals, deposits, and total transactions.
#### Account Calculations ➕
EasyBank calculates and displays various account metrics, including total money in, total money out, interest earned, and account balance.
Interest is calculated based on the deposited amount and the predefined interest rate.
Best Practices Implemented
#### Modular Code Organization 📂
All DOM elements and their event listeners are kept in a separate JavaScript file (elements.js).
This practice enhances maintainability and readability by separating concerns and promoting modular code.
#### Seperate Data File 📃
Account data is stored in a separate JavaScript file (accounts.js) and loaded into the application.
Separating data from the main codebase improves scalability and makes it easier to manage account information.

## Project Structure 📁
The project consists of an HTML file (index.html) that serves as the main entry point for the web application. The JavaScript functionality is divided into three files:

- script.js: Contains the main application logic, including event listeners, data manipulation, and UI updates.
- accounts.js: Contains the accounts data for all accounts
- elements.js: Contains references to all DOM elements used in the application, along with their corresponding selectors.

## Usage 👨‍💻
To run the EasyBank web application, simply open the index.html file in a web browser. You can then interact with the various features mentioned above.

## Credits 💰

This is a modifaction of one of the projects from Jonas Schmedtmann <a href='https://www.udemy.com/course/the-complete-javascript-course/?couponCode=KEEPLEARNING'>The Complete JavaScript Course 2024: From Zero to Expert!</a>
You can keep up with Jonas <a href="https://twitter.com/jonasschmedtman?lang=en">here</a>.
Modularisation of code, additions of modals, styling of application and logo were all my work. 
The deeper tracking of transactions was another of my own additions. 
If you would like to learn JS, I highly recommend taking his course and thank him for putting such a great learning resource together!

<hr>

### Thank you for using EasyBank! 🏦💵
