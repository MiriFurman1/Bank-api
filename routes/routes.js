import { Router } from "express";
const router = Router();
import {
    loadAccounts,
    addNewAccount,
    findAccount,
    depositMoney,
    deleteAccount,
    withdrawMoney,
    transferMoney,
    updateCredit
} from "../controllers/controllers.js";

router.get("/accounts", (req, res) => {
    //get all accounts
    res.status(200).send(loadAccounts());
});

router.get("/accounts/:id", (req, res) => {
    // get account with the specified id
    try {
        res.status(200).send(findAccount(req.params.id));
      } catch (e) {
        res.status(400).send({ error: e.message });
      }
});

router.post("/accounts", (req, res) => {
  //add new account
    try {
      const createAccount = addNewAccount(req.body);
      res.status(201).send(createAccount);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
});

router.put("/accounts/:id/deposit", (req, res) => {
    // deposit money to a specific account
    const { id } = req.params;
    const moneyToDeposit = req.body;
    try {
      const depositMoneyById = depositMoney(id,moneyToDeposit);
      res.status(201).send(depositMoneyById);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
});

router.put("/accounts/:id/withdraw", (req, res) => {
  // withdraw money to a specific account
  const { id } = req.params;
  const  moneyToWithdraw = req.body;
  try {
    const withdrawMoneyById = withdrawMoney(id, moneyToWithdraw);
    res.status(201).send(withdrawMoneyById);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.put("/accounts/transfer", (req, res) => {
  // transfer money from one account to another
  const {idToWithdraw,idToDeposit,amount} = req.body;
  try {
    const transfer= transferMoney(idToWithdraw,idToDeposit,amount);
    res.status(201).send(transfer);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.put("/accounts/:id/credit", (req, res) => {
  // change credit
  const { id } = req.params;
  const credit = req.body;
  try {
    const creditUpdateFunc= updateCredit(id,credit);
    res.status(201).send(creditUpdateFunc);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete("/accounts/:id", (req, res) => {
  // delete the account with the specified id
    try {
        res.status(200).send(deleteAccount(req.params.id));
      } catch (e) {
        res.status(400).send({ error: e.message });
      }
});


export default router;