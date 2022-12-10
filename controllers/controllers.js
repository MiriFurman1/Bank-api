import { readFileSync, writeFileSync } from "fs"


function loadAccounts() {
    try {
        const dataBuffer = readFileSync("./db/accounts.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        console.log(e);
        return []
    }
}

const saveAccounts = (accounts) => {
    const dataJSON = JSON.stringify(accounts);
    writeFileSync("./db/accounts.json", dataJSON);
};

function addNewAccount(account) {
    const accounts = loadAccounts();
    if (!accounts.find((a) => a.id === account.id)) {
        if (!account.cash) {
            account.cash = 0
        }
        if (!account.credit) {
            account.credit = 0
        }
        if(account.id.length<9){
            throw new Error("id must be at least 9 digits")
        }
        if(parseInt(account.id)!=(account.id)){
            throw new Error("no letters allowed in the id field")
        }
        const newAccount = {
            cash: account.cash,
            credit: account.credit,
            ...account
        };
        accounts.push(newAccount);
        saveAccounts(accounts);
        return newAccount;
    }
    else {
        throw new Error("Error, try again")
    }

}

function findAccount(id) {
    const accounts = loadAccounts();
    const findAccount = accounts.find((account) => account.id === id);
    if (!findAccount) {
        throw new Error("The account does not exist!");
    }
    return findAccount;
}

function depositMoney(id, moneyToDeposit) {
    const accounts = loadAccounts();
    console.log(moneyToDeposit);
    if(parseInt(moneyToDeposit.deposit)!=(moneyToDeposit.deposit)){
        throw new Error("no letters allowed in the deposit field")
    }
    const foundAccount = accounts.find((a) => {
        return a.id === id;
    });
    if (!foundAccount) {
        throw new Error("The account does not exist, cannot update!");
    }
    if (moneyToDeposit.deposit < 0) {
        throw new Error("Can deposit only positive number");
    }
    let updatedCash = parseInt(foundAccount.cash) + parseInt(moneyToDeposit.deposit);
    const updatedAccount = {
        ...foundAccount,
        cash: updatedCash
    };
    const index = accounts.findIndex((a) => a.id === id);
    accounts[index] = updatedAccount;
    saveAccounts(accounts);
    return updatedAccount;
}

function withdrawMoney(id, moneyToWithdraw) {
    const accounts = loadAccounts();
    if(parseInt(moneyToWithdraw.withdraw)!=(moneyToWithdraw.withdraw)){
        throw new Error("no letters allowed in the withdraw field")
    }
    
        if (moneyToWithdraw.withdraw< 0) {
        throw new Error("Can withdraw only positive number");
    }
    const foundAccount = accounts.find((a) => {
        return a.id === id;
    });
    if (!foundAccount) {
        throw new Error("The account does not exist, cannot update!");
    }
    if (parseInt(moneyToWithdraw.withdraw) < 0) {
        throw new Error("Can withdraw only positive number");
    }
    if (parseInt(moneyToWithdraw.withdraw) > parseInt(foundAccount.cash) + parseInt(foundAccount.credit)){
        throw new Error("Can withdraw only less than cash+credit");
    }
    let updatedCash = parseInt(foundAccount.cash) - parseInt(moneyToWithdraw.withdraw);
    const updatedAccount = {
        ...foundAccount,
        cash: updatedCash
    };
    const index = accounts.findIndex((a) => a.id === id);
    accounts[index] = updatedAccount;
    saveAccounts(accounts);
    return updatedAccount;
}

function transferMoney(idToWithdraw,idToDeposit,amount){
    const accounts = loadAccounts();
    // console.log(idToDeposit);
    const withdrawAccount = accounts.find((a) => {
        return a.id === idToWithdraw;
    });
    const depositAccount = accounts.find((a) => {
        return a.id === idToDeposit;
    });
if (idToWithdraw===idToDeposit){
    throw new Error("You can't transfer money to the same id as the withdraw id")
}
if(amount<0){
    throw new Error("You can't transfer negative amount")
}
if(amount!=parseInt(amount)){
    throw new Error("the amount field can't have a letter in it")
}

if(parseInt(withdrawAccount.cash)+parseInt(withdrawAccount.credit)<parseInt(amount)){
    throw new Error("can't transfer more money than you have")
}

withdrawMoney(idToWithdraw, {"withdraw":amount})
depositMoney(idToDeposit, {"deposit":amount})
return "transfer succeeded"
}

function updateCredit(id, credit) {
    const accounts = loadAccounts();
    if(parseInt(credit.credit)!=(credit.credit)){
        throw new Error("no letters allowed in the credit field")
    }
    const foundAccount = accounts.find((a) => {
        return a.id === id;
    });
    if (!foundAccount) {
        throw new Error("The account does not exist, cannot update!");
    }
    if (credit.credit < 0) {
        throw new Error("credit can be positive number");
    }
   
    const updatedAccount = {
        ...foundAccount,
        credit:credit.credit
    };
    const index = accounts.findIndex((a) => a.id === id);
    accounts[index] = updatedAccount;
    saveAccounts(accounts);
    return updatedAccount;
}

function deleteAccount(id) {
    const accounts = loadAccounts();
    const index = accounts.findIndex((a) => a.id === id);
    if (index !== -1) {
        accounts.splice(index, 1);
        saveAccounts(accounts);
        return accounts;
    } else {
        throw new Error("The account does not exist, cannot delete!");
    }
}


export { loadAccounts, saveAccounts, addNewAccount, findAccount, depositMoney, deleteAccount, withdrawMoney,transferMoney,updateCredit }