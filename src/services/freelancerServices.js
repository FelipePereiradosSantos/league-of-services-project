import * as freelancerRepositories from "../repositories/freelancerRepositories.js";

export const create = async (freelancerData) => {
  const { nome, imagem, descricao } = freelancerData;

  if (!nome || !imagem || !descricao) {
    throw new Error(
      "Dados incompletos: nome, imagem e descrição são obrigatórios."
    );
  }
  if (nome.length < 3) {
    throw new Error("Nome inválido.");
  }

  const novoFreelancer = await freelancerRepositories.create({
    nome,
    imagem,
    descricao,
  });

  return novoFreelancer;
};

export const getAll = async () => {
  const freelancers = await freelancerRepositories.getAll();
  return freelancers;
};
