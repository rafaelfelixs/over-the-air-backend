import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';

interface IRequestCreate {
  title: string;
  creator_id: string;
  date: Date;
}

// service não possui acesso direto aos dados da requisição e da resposta

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    title,
    creator_id,
    date,
  }: IRequestCreate): Promise<Project> {
    const projectDate = startOfHour(date);

    const findProjectInSamdeDate = await this.projectsRepository.findByDate(
      projectDate,
    );

    if (findProjectInSamdeDate) {
      throw new AppError('This project is already created');
    }

    const findProjectSameName = await this.projectsRepository.findByTitle(
      title,
    );

    if (findProjectSameName) {
      throw new AppError('This project is already created');
    }

    const project = await this.projectsRepository.create({
      title,
      creator_id,
      date: projectDate,
    });

    return project;
  }
}

export default CreateProjectService;
