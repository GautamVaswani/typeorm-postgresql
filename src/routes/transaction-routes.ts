import { Transaction } from "../entities/Transaction";
import { Client } from "../entities/Client";
import { TransactionTypes } from "../constants/constants";
import { AppDataSource } from "../data-source";

const express = require("express");

const router = new express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params;
  const { type, amount } = req.body;
  const usersRepository = await AppDataSource.manager.getRepository(Client);
  const client = await usersRepository.findOneBy({
    id: parseInt(clientId),
  });

  if (!client) {
    return res.json({
      msg: "Client not forn",
    });
  }

  const transaction = Transaction.create({
    type,
    amount,
    client,
  });

  await transaction.save();

  if (type === TransactionTypes.DEPOSIT) {
    client.balance += parseInt(amount);
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance -= parseInt(amount);
  }

  await client.save();

  return res.json({
    msg: "Transaction added",
  });
});

export { router as createTransactionRouter };
