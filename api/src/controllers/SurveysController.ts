import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveysRepository';

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveryRepository = getCustomRepository(SurveyRepository);

    const survey = surveryRepository.create({
      title,
      description
    });

    await surveryRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveyRepository);

    const all = await surveysRepository.find();

    return response.json(all);
  }
}

export { SurveysController };