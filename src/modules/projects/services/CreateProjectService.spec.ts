import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import AppError from '@shared/errors/AppError';
import addDays from 'date-fns/addDays';

describe('CreateProject', () => {
  it('should be able to create a new project', async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    const createProject = new CreateProjectService(fakeProjectsRepository);

    const project = await createProject.execute({
      title: 'Project Test',
      date: new Date(),
      creator_id: '123123',
    });

    expect(project).toHaveProperty('id');
  });

  it('should not be able to create two projects with the same date', async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    const createProject = new CreateProjectService(fakeProjectsRepository);

    const projectDate = new Date();

    await createProject.execute({
      title: 'Project Test1',
      date: projectDate,
      creator_id: '123123',
    });

    expect(
      createProject.execute({
        title: 'Project Test2',
        date: projectDate,
        creator_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two projects with the same title', async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    const createProject = new CreateProjectService(fakeProjectsRepository);

    const projectDate = new Date();

    await createProject.execute({
      title: 'Project Test2',
      date: projectDate,
      creator_id: '123123',
    });

    expect(
      createProject.execute({
        title: 'Project Test2',
        date: addDays(projectDate, 1),
        creator_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
