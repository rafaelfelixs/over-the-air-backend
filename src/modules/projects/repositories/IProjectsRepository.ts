import Project from '@modules/projects/infra/typeorm/entities/Project';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

export default interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  findByTitle(title: string): Promise<Project | undefined>;
  findByDate(date: Date): Promise<Project | undefined>;
}
