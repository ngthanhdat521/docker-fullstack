const { Client } = require("pg");
const client = new Client({
  user: "admin",
  host: "10.5.0.4",
  database: "postgres",
  password: "admin",
  port: 5432,
});

const cors = require('cors');
const express = require("express");
const app = express();

app.use(cors());
app.get("/", (req, res) => res.status(200).send("hello ae"));

app.get("/postgres/query", async (req, res) => {
  try {
    await client.connect();
    const data = await client.query("select * from users");
    await client.end();
    return res.status(200).json(data.rows);
  } catch (error) {
    return res.status(500).send("Disconnected!");
  }
});

app.listen(5001, () => console.log("server start"));
