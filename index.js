#! /usr/bin/env node
import inquirer from "inquirer";
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} successful. Remaining balance is $${this.balance}.`);
        }
        else {
            console.log("Insufficent balance.");
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remianing balacne: $${this.balance} `);
    }
    checkBalance() {
        console.log(`Current Balance: $${this.balance}`);
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const account = [
    new BankAccount(1001, 20000),
    new BankAccount(1010, 40000),
    new BankAccount(1020, 60000),
    new BankAccount(1050, 80000),
];
const customers = [
    new Customer("Ali", "Shaikh", "male", 25, 3452187865, account[0]),
    new Customer("Faizan", "ALam", "male", 34, 3482187865, account[1]),
    new Customer("Zain", "Rasheed", "male", 24, 3162187865, account[2]),
    new Customer("Zaid", "Farik", "male", 70, 3022187865, account[3]),
];
async function Services() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter Your Account Number Please:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName}${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an option",
                    choices: ["Diposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Diposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter Amount to Deposit"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter Amount to Withdraw"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank Program...!");
                    console.log("\n Thank You for using our Bank Services. Have a Great Day");
                    return;
            }
        }
        else {
            console.log("Invalid Account Number: Please Try Again.");
        }
    } while (true);
}
Services();
