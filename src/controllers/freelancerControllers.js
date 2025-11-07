import * as freelancerServices from "../services/freelancerServices.js";

export const createFreelancer = async (req, res) => {
  try {
    const { nome, imagem, descricao } = req.body;
    const novoFreelancer = await freelancerServices.create({
      nome,
      imagem,
      descricao,
    });
    res.status(201).json(novoFreelancer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllFreelancers = async (req, res) => {
  try {
    const freelancers = await freelancerServices.getAll();
    res.status(200).json(freelancers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
