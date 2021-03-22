import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // user.password -> senha criptografada
    // password -> senha não-criptografada

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    // key md5 online : 1op56ui09jagfd9ogq3t4kfdsg
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
