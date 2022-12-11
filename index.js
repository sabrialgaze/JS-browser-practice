
const balance = document.getElementById("balance-total");
const incomePositive = document.getElementById("income-text");
const expenseNegative = document.getElementById("expense-text");
const list = document.getElementById("list");   
const form = document.getElementById("form");
const concept = document.getElementById("concept"); 
const amount = document.getElementById("amount");


let transactions = []

function generateRandomID(){
    return Math.floor(Math.random()*1000000000);
}

function addTransaction(event){
    event.preventDefault();
    if(
        concept.value.trim() === "" || amount.value.trim() === ""
    ){
        alert("Concept and amount should be filled")
    }else{
        const transaction ={
            id: generateRandomID(),
            concept: concept.value,
            amount: +amount.value
        }

        transactions.push(transaction);
        addTransactionToDOM(transaction);
        updateValues();
        concept.value = "";
        amount.value = "";

    }
}

function removeTransaction(id){
    transactions = transactions.filter((transaction) => transaction.id !== id);
    initialization();
}

function addTransactionToDOM(transaction){
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    )
        
    item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-button" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);
}


function updateValues(){
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0)* -1).toFixed(2);
    
    balance.innerText=`${total}€`;
    incomePositive.innerText = `${income}€`;
    expenseNegative.innerText = `${expense}€`;
}

function initialization(){
    list.innerHTML = "";
    transactions.forEach(addTransactionToDOM);
    updateValues();
}


initialization();

form.addEventListener("submit", addTransaction)