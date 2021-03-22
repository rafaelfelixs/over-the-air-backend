import { Router } from 'express';
import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
