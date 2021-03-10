import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import axios from 'axios';

const app = express();
app.use(cors());
dotenv.config();
const API_URL = process.env.API_URL;

app.get('/', (req,res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><body><p>This is server side.</p></body></html>');
  res.end();
})
async function getFromAPI() {
  let data = '';
    await axios.get(API_URL).then((result) => data =  result.data);
  return data;

}

app.get('/data', (req, res) => {
  console.log("1")
  let data = ''
  async function getData() {
    try {
    data = await getFromAPI();
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(data));
      res.end();
      res.next();
    }catch (error) {
      return res.status(400).json({ error: error.toString() });
    }
  }
  getData();
})

app.listen(5000, () => {
  console.log('Running on port 5000');
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));