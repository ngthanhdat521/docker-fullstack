const { Pool } = require("pg");
const client = new Pool({
  user: "admin",
  host: "10.5.0.4",
  database: "postgres",
  password: "admin",
  port: 5432,
});

const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.get("/", (req, res) => res.status(200).send("hello ae"));

app.get("/postgres/query", async (req, res) => {
  try {
    client.connect((err, clientPool, done) => {
      if (err) {
        return res.status(500).send('error connection');
      }
      clientPool.query("select * from user", async (err, data) => {
        done();
        
        if (err) {
          return res.status(500).send('error data');
        } else {
          return res.status(200).json(data.rows);
        }
      });
    });
  } catch (error) {
    console.log("error db", error);
    return res.status(500).send("Disconnected!");
  }
});

app.listen(5001, () => console.log("server start"));
