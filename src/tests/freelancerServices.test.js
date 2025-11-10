import { jest } from '@jest/globals';

import * as freelancerServices from "../services/freelancerServices.js";
import * as freelancerRepositories from "../repositories/freelancerRepositories.js";


jest.mock("../repositories/freelancerRepositories.js");

describe("testando freelancerServices", () => {

    beforeEach(() => {
    jest.clearAllMocks();
  });

    test('deve lançar um erro se o nome não for fornecido', async () => {
    const dadosInvalidos = {
      imagem: 'http://imagem.com/img.png',
      descricao: 'Freelancer sem nome'
    };
    expect.assertions(2);

    try {
      await freelancerServices.create(dadosInvalidos);
    } catch (error) {
      expect(error.message).toBe('Dados incompletos: nome, imagem e descrição são obrigatórios.');
      expect(freelancerRepositories.create).not.toHaveBeenCalled();
    }
  });

  test('deve criar um freelancer com sucesso', async () => {
      const dadosValidos = {
        nome: 'Joaquim',
        imagem: 'http://imagem.com/img.png',
        descricao: 'Freelancer sem nome'
      };
      const freelancerSalvo = {
        id: 1,
        ...dadosValidos
      };
      freelancerRepositories.create.mockResolvedValue(freelancerSalvo);
  
      const freelancerCriado = await freelancerServices.create(dadosValidos);

      expect(freelancerRepositories.create).toHaveBeenCalledTimes(1);

      expect(freelancerRepositories.create).toHaveBeenCalledWith(dadosValidos);
  
      expect(freelancerCriado).toEqual(freelancerSalvo);
  })
});