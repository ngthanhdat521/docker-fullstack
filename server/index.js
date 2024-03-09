const { Client } = require("pg");
const client = new Client({
  user: "admin",
  host: "10.5.0.4",
  database: "postgres",
  password: "admin",
  port: 5432,
});

const express = require("express");
const app = express();

app.get("/", (req, res) => res.status(200).send("hello ae"));

app.get("/postgres/connect", async (req, res) => {
  try {
    await client.connect();
    return res.status(200).send("Connected!");
  } catch (error) {
    console.log('error', error);
    return res.status(200).send("Disconnected!");
  }
});

app.get("/postgres/query", (req, res) => {
  client.connect(async (err) => {
    if (err) return res.status(200).send("Disconnected!");

    const data = await client.query("select * from users");
    return res.status(200).json(data.rows);
  });
});

app.listen(5001, () => console.log("server start"));
