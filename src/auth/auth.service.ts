import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private roleService: RoleService,
  ) { }

  async register(email: string, password: string, roleId: number): Promise<User> {
    try {
      const userExists = await this.findUserbyEmail(email)
      if (userExists) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'email already exists',
        }, HttpStatus.BAD_REQUEST);
      }
      const roleExists = await this.roleService.findRoleById(roleId);
      if (!roleExists) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'role not found',
        }, HttpStatus.BAD_REQUEST);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ email: email, password: hashedPassword, role: roleExists });
      return await this.userRepository.save(user);
    } catch (error) {
      console.log('AuthService register [error] : ', error);
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.response.error,
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
        error: error.response ? error.response : error.response.error,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserbyEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      console.log('AuthService findUserbyEmail [error] : ', error);
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.response.error,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUserRole(userId: number, roleId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['role'] });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const role = await this.roleService.findRoleById(roleId);
      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
      user.role = role;
      return await this.userRepository.save(user);
    } catch (error) {
      console.log('AuthService updateUserRole [error] : ', error);
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.response.error,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        relations: {
          role: {
            permissions: {
              roles: true
            }
          }
        }
      });
    } catch (error) {
      console.log('AuthService findUserById [error] : ', error);
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.response.error,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async allUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log('AuthService allUsers [error] : ', error);
      throw new HttpException({
        status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response ? error.response : error.response.error,
      }, error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
