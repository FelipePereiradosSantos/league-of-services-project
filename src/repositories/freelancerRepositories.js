import { query } from "../.config/db.js";

export const create = async (freelancerData) => {
  const { nome, imagem, descricao } = freelancerData;

  const sql = `
      INSERT INTO freelancers (nome, imagem, descricao) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;

  const { rows } = await query(sql, [nome, imagem, descricao]);

  return rows[0];
};

export const getAll = async () => {
  const sql = `
    SELECT * FROM freelancers
  `;
  const { rows } = await query(sql);
  return rows;
};

export const getById = async (id) => {
  const sql = `
    SELECT * FROM freelancers WHERE id = $1
  `;
  const { rows } = await query(sql, [id]);
  return rows[0];
};
