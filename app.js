"use scrict";
/**********************/
/*** DOM elements. ***/
/********************/
const loanElement = document.getElementById("loan");
const earnElement = document.getElementById("earn");
const transferElement = document.getElementById("transfer");
const workElement = document.getElementById("work");
const salaryBalanceElement = document.getElementById("salary-balance");
const bankBalanceElement = document.getElementById("bank-balance");
const bankLoanToPayBalanceElement = document.getElementById(
  "bank-loan-to-pay-balance"
);
const bankLoanInfoElement = document.getElementById("bank-loan-info");
const workLoanButtonElement = document.getElementById("work-loan-button");
const repayLoanElement = document.getElementById("repay-loan");
const laptopSelect = document.getElementById("laptops-select");
const laptopTitle = document.getElementById("laptop-title");
const laptopImage = document.getElementById("laptop-image");
const laptopDescription = document.getElementById("laptop-description");
const laptopSpecs = document.getElementById("laptops-features");
const laptopPrice = document.getElementById("laptop-price");
const buyNowBtn = document.getElementById("showcase-buy-laptop");

/************************************************/
/*** Declared variables in the window scope. ***/
/**********************************************/
let outstandingLoan = 0;
let bankBalance = 0;
let interestRate = 0.1;
let interestAmount = 0;
let salaryBalance = 0;

/*******************/
/*** Functions. ***/
/*****************/

function formatCurrency(value, currency) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
}

/*
 * Functions: Work Module.
 */
function WorkToGetSalary() {
  salaryBalance += 100;
  alert(
    `You have earned: $100.00. Your salary balance is now: $${salaryBalance.toFixed(
      2
    )}.`
  );
  salaryBalanceElement.innerHTML = formatCurrency(salaryBalance, "USD");
}

function TransferToBank() {
  if (!salaryBalance > 0) {
    alert("There are no funds to transfer as your salary balance is nill.");
  } else {
    CalculateInterest();
    if (interestAmount > outstandingLoan) {
      alert(
        `An interest amount of: $${outstandingLoan} has been deducted from your salary to pay the outstanding loan. Your outstanding loan after deduction is: $${
          outstandingLoan - outstandingLoan
        }`
      );
      salaryBalance -= outstandingLoan;
      outstandingLoan -= outstandingLoan;
      salaryBalanceElement.innerHTML = formatCurrency(salaryBalance, "USD");
      bankLoanToPayBalanceElement.innerHTML = formatCurrency(
        outstandingLoan,
        "USD"
      );
    }
    if (interestAmount < outstandingLoan) {
      salaryBalance -= interestAmount;
      outstandingLoan -= interestAmount;
      salaryBalanceElement.innerHTML = formatCurrency(salaryBalance, "USD");
      bankLoanToPayBalanceElement.innerHTML = formatCurrency(
        outstandingLoan,
        "USD"
      );
      alert(
        `An interest amount of: $${interestAmount} has been deducted from your salary to pay the outstanding loan. Your outstanding loan after deduction is: $${outstandingLoan}`
      );
    }
    bankBalance += salaryBalance;
    salaryBalance -= salaryBalance;
    bankBalanceElement.innerHTML = formatCurrency(bankBalance, "USD");
    salaryBalanceElement.innerHTML = formatCurrency(salaryBalance, "USD");
    alert(`Transfer completed.`);
  }
}
/*
 * Functions: Bank Module.
 */
function GetALoan() {
  if (outstandingLoan > 0) {
    alert(
      `You already have an outstanding loan of $${outstandingLoan}. You may not have two loans at once. The initial loan should be paid back in full.`
    );
  } else {
    const amount = prompt("Enter amount to borrow.");
    const amountInt = parseInt(amount);
    if (isNaN(amountInt) || !Number.isInteger(+amountInt)) {
      alert("Please enter a valid integer amount.");
    } else if (amountInt > bankBalance * 2) {
      alert(
        `You cannot get more than double the loan of your bank balance. Your current bank balance is: $${bankBalance}.`
      );
    } else {
      outstandingLoan += amountInt;
      alert(`A loan of amount $${amountInt} has been granted to you.`);
      bankLoanInfoElement.classList.remove("hidden");
      workLoanButtonElement.classList.remove("hidden");
      bankLoanToPayBalanceElement.innerHTML = formatCurrency(
        outstandingLoan,
        "USD"
      );
    }
  }
}
function CalculateInterest() {
  if (outstandingLoan > 0) {
    interestAmount = salaryBalance * interestRate;
  }
}
function RepayLoan() {
  if (salaryBalance === 0) {
    alert(
      `You cannot repay while your salary balance is nill. Try again after working.`
    );
  }
  if (
    outstandingLoan > 0 &&
    salaryBalance > 0 &&
    outstandingLoan <= salaryBalance
  ) {
    alert(
      `An amount of: ${outstandingLoan} has been deducted from your salary balance to pay the outstanding loan.`
    );
    salaryBalance -= outstandingLoan;
    outstandingLoan -= outstandingLoan;
    bankLoanToPayBalanceElement.innerHTML = formatCurrency(
      outstandingLoan,
      "USD"
    );
    salaryBalanceElement.innerHTML = formatCurrency(salaryBalance, "USD");
  }
}

/*
 * Functions: Laptop Module.
 */

// API endpoint for fetching laptop data
const API_URL = "https://hickory-quilled-actress.glitch.me/computers";

// make API call to retrieve laptop data
fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    // populate select box with laptop options
    data.forEach((laptop) => {
      const option = document.createElement("option");
      option.value = laptop.id;
      option.text = laptop.title;
      laptopSelect.appendChild(option);
    });

    // display initial laptop data
    const initialLaptop = data[0];
    displayLaptopData(initialLaptop);

    // add event listener for select box
    laptopSelect.addEventListener("change", () => {
      const selectedLaptop = data.find(
        (laptop) => laptop.id == laptopSelect.value
      );
      displayLaptopData(selectedLaptop);
    });

    // add event listener for buy now button
    buyNowBtn.addEventListener("click", () => {
      const selectedLaptop = data.find(
        (laptop) => laptop.id == laptopSelect.value
      );
      if (selectedLaptop.price > bankBalance) {
        alert("You cannot afford this laptop.");
      } else {
        bankBalance -= selectedLaptop.price;
        bankBalanceElement.innerHTML = bankBalance;
        alert(
          `Congratulations, you are now the owner of a ${
            selectedLaptop.title
          }! Your bank balance is now $${bankBalance.toFixed(2)}.`
        );
      }
    });
  });

// function to display laptop data in Info section
function displayLaptopData(laptop) {
  laptopTitle.textContent = laptop.title;
  laptopImage.src = `https://hickory-quilled-actress.glitch.me/${laptop.image}`;
  laptopDescription.textContent = laptop.description;
  laptopSpecs.innerHTML = "";
  laptop.specs.forEach((spec) => {
    const li = document.createElement("li");
    li.textContent = spec;
    laptopSpecs.appendChild(li);
  });
  laptopPrice.textContent = formatCurrency(laptop.price, "USD");
  buyNowBtn.disabled = laptop.price > bankBalance;
}

/************************/
/*** Event handlers. ***/
/**********************/
earnElement.addEventListener("click", (e) => {
  e.preventDefault();
  WorkToGetSalary();
});
transferElement.addEventListener("click", (e) => {
  e.preventDefault();
  TransferToBank();
});
loanElement.addEventListener("click", (e) => {
  e.preventDefault();
  GetALoan();
});
workLoanButtonElement.addEventListener("click", (e) => {
  e.preventDefault();
  RepayLoan();
});
