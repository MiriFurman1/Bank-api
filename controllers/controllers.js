import { readFileSync,writeFileSync } from "fs"


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
    console.log(account);
    
    if (!account.cash) {
        account.cash = 0
    }
    if (! account.credit) {
         account.credit = 0
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

function findAccount(id) {
    const accounts = loadAccounts();
    const findAccount = accounts.find((account) => account.id === id);
    if (!findAccount) {
      throw new Error("The movie does not exist!");
    }
    return findAccount;
}
function updateAccount() {

}
function deleteAccount() {

}


export { loadAccounts,saveAccounts, addNewAccount, findAccount, updateAccount, deleteAccount }