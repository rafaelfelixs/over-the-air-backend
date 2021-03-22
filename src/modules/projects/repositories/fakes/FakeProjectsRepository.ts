import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

class ProjectsRepository implements IProjectsRepository {
  private projects: Project[] = [];

  public async findByTitle(title: string): Promise<Project | undefined> {
    const findProjectByTitle = this.projects.find(
      project => project.title === title,
    );

    return findProjectByTitle;
  }

  public async findByDate(date: Date): Promise<Project | undefined> {
    const findProjectByDate = this.projects.find(project =>
      isEqual(project.date, date),
    );

    return findProjectByDate;
  }

  public async create({
    title,
    creator_id,
    date,
  }: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, { id: uuid(), title, date, creator_id });

    this.projects.push(project);

    return project;
  }
}

export default ProjectsRepository;
