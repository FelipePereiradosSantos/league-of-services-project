import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import client from 'prom-client'

import routes from './routes/index.js';

dotenv.config();
const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));

app.use(routes);

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

export default app;

