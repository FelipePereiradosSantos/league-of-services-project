import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes/index.js';

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));

app.use(routes);

export default app;

