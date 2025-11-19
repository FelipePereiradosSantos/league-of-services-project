import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port:parseInt(process.env.DB_PORT || 5432, 10),

  ssl:{
    rejectUnauthorized:false
  }
});

pool.on('connect', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso');
})

pool.on('error' , (err) => {
  console.log('Erro na conexão com o banco de dados', err);
  process.exit(-1);
})

export const initDatabase = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS freelancers (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        imagem TEXT NOT NULL,
        descricao TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try{
    await pool.query(sql);
    console.log('Tabela freelancers criada com sucesso');
  } catch (error) {
    console.error('Erro ao criar a tabela freelancers', error);
    process.exit(1);
  }
};

export const query = (text, params) => pool.query(text, params);