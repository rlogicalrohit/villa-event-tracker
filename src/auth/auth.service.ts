import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async register(email: string, password: string): Promise<User> {
    try {
      const userExists = await this.findUserbyEmail(email)
      if (userExists) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'email already exists',
        }, HttpStatus.BAD_REQUEST);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ email, password: hashedPassword });
      return await this.userRepository.save(user);
    } catch (error) {
      console.log('AuthService register [error] : ', error);
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response.error : 'Internal server error',
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    try {
      if (user && await bcrypt.compare(password, user.password)) {
        const payload = { username: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
      throw new HttpException({ status: HttpStatus.UNAUTHORIZED, error: 'invalid credentials' }, HttpStatus.UNAUTHORIZED);
    } catch (error) {
      console.log('AuthService login [error] : ', error);
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response.error : 'Internal server error',
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserbyEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });

    } catch (error) {
      throw error
    }
  }
}


