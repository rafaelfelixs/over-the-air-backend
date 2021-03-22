import { container } from 'tsyringe';

import '@modules/users/providers';

import '@shared/container/providers';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
