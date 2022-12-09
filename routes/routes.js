import { Router } from "express";
const router = Router();
import {
    loadAccounts,
    addNewAccount,
    findAccount,
    updateAccount,
    deleteAccount
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
    console.log(req.body);
    try {
      const createAccount = addNewAccount(req.body);
      res.status(201).send(createAccount);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
});

router.put("/accounts/:id", (req, res) => {
    // Update the account with the specified id
});

router.delete("/accounts/:id", (req, res) => {
    try {
        res.status(200).send(deleteMovie(req.params.id));
      } catch (e) {
        res.status(400).send({ error: e.message });
      }
});


export default router;