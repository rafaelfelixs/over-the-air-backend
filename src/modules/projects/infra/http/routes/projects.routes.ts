import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '@modules/projects/infra/http/controllers/ProjectsController';

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.use(ensureAuthenticated);

// Rota: Receber a requisição, chamar outra arquivo, devolver uma resposta

/* projectsRouter.get('/', async (request, response) => {
  // console.log(request.user);
  const projects = await projectsRepository.find();

  return response.json(projects);
}); */

projectsRouter.post('/', projectsController.create);

export default projectsRouter;
