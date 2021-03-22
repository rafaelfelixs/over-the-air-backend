import { getRepository, Repository } from 'typeorm';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

// Conexão Persistência <-> Repositório <-> Rota
// 1 Repositório por model

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findByTitle(title: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne({
      where: { title },
    });

    return findProject;
  }

  public async findByDate(date: Date): Promise<Project | undefined> {
    /* const findProject = this.projects.find(project =>
      isEqual(date, project.date),
    ); */

    const findProject = await this.ormRepository.findOne({
      where: { date },
    });

    return findProject;
  }

  public async create({
    title,
    creator_id,
    date,
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({ title, creator_id, date });

    await this.ormRepository.save(project);

    return project;
  }
}

export default ProjectsRepository;
