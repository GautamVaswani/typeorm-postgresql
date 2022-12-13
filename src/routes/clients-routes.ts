import { AppDataSource } from "../data-source";
import { Client } from "../entities/Client";

const express = require("express");

const router = new express.Router();

router.get("/api/client", async (req, res) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository
    .createQueryBuilder()
    .select("client.first_name")
    .addSelect("client.balance")
    .from(Client, "client")
    .leftJoinAndSelect("client.transactions", "transactions")
    .where("client.balance >= :balance", { balance: 1000 })
    .getMany();
  return res.json(client);
  // return res.send("hello");
});

router.post("/api/client", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;
  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    card_number: cardNumber,
    balance: balance,
  });

  await client.save();

  return res.json(client);
});

router.delete("/api/client/:clientId", async (req, res) => {
  const { clientId } = req.params;
  const response = await Client.delete(parseInt(clientId));
  return res.json(response);
});

export { router as createClientRouter };
