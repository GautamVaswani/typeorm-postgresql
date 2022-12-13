import { Transaction } from "../entities/Transaction";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";
import { AppDataSource } from "../data-source";

const express = require("express");

const router = new express.Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;
  const client = await AppDataSource.manager.getRepository(Client).findOneBy({
    id: parseInt(clientId),
  });
  const banker = await AppDataSource.manager.getRepository(Banker).findOneBy({
    id: parseInt(bankerId),
  });

  if (!banker || !client) {
    return res.json({
      msg: "Banker or client not found",
    });
  }

  banker.clients = [client];

  await banker.save();

  return res.json({
    msg: "Banker connected to client",
  });
});

export { router as connectBankerToClientRouter };
