import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

const app = express();
app.use(cors());
dotenv.config();
const API_URL = "http://api.nbp.pl/api/exchangerates/tables/a/";

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<body><p>This is server side.</p></body>");
  res.end();
});

async function fetchCurrencyData() {
  let data = "";
  await axios.get(API_URL).then((result) => (data = result.data));
  return data;
}

app.get("/data", (req, res) => {
  async function getData() {
    try {
      const data = await fetchCurrencyData();
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(data));
      res.end();
    } catch (error) {
      return res.status(400).json({ error: error.toString() });
    }
  }

  getData().catch((err) => console.log("Caught error: ", err));
});

app.listen(5000, () => {
  console.log("Running on port 5000");
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
