import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import { container } from 'tsyringe';

import CreateProjectService from '@modules/projects/services/CreateProjectService';

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, creator_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createProjectService = container.resolve(CreateProjectService);

    const project = await createProjectService.execute({
      title,
      creator_id,
      date: parsedDate,
    });

    return response.json(project);
  }
}
