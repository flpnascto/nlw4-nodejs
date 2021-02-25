import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";


class SendMailController {

  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExist = await usersRepository.findOne({ email });
    if (!userAlreadyExist) {
      return response.status(400).json({
        error: "User does not exists",
      })
    }

    const surveyAlreadyExists = await surveyRepository.findOne({ id: survey_id })
    if (!surveyAlreadyExists) {
      return response.status(400).json({
        error: "Survey does not exists",
      })
    }

    const surveyUser = surveyUserRepository.create({
      user_id: userAlreadyExist.id,
      survey_id
    })
    await surveyUserRepository.save(surveyUser);

    return response.json(surveyUser);

  }
}

export { SendMailController };