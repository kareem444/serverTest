import { Injectable } from '@nestjs/common'
import {
  BadRequestException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common/exceptions'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/schemas/user.schema'
import { LoginAuthDto } from './dto/login-auth.dto'
import { UserRepository } from 'src/users/repositories/user.repository'
import { CreateUserDto } from 'src/users/auth/dto/create-user.dto'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) { }

  private async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.create(createUserDto)
    } catch (error) {
      console.log(`error`, error);
      throw new BadRequestException()
    }
  }

  private async hashPassword(pass: string) {
    const saltOrRounds = 10
    return await bcrypt.hash(pass, saltOrRounds)
  }

  private async isMatchPass(pass: string, hash: string) {
    return bcrypt.compare(pass, hash)
  }

  private async validateUser(loginAuthDto: LoginAuthDto): Promise<User> {
    const user = await this.userRepository.findOne({
      phone: loginAuthDto.phone,
    })

    if (
      user &&
      (await this.isMatchPass(loginAuthDto.password, user.password))
    ) {
      return user
    }
    return null
  }

  private async createToken(
    user: User,
    res: Response,
  ) {
    const payload = {
      userId: user['_id'],
      email: user.email,
      role: user.role,
    }
    const access_token = this.jwtService.sign(payload)

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    }).json({
      access_token: this.jwtService.sign(payload),
      user,
    })
  }

  async login(
    loginAuthDto: LoginAuthDto,
    res: Response,
  ) {
    const user: User = await this.validateUser(loginAuthDto)

    if (!user) {
      throw new UnauthorizedException('Error in credentials')
    }

    return this.createToken(user, res)
  }

  async register(createUserDto: CreateUserDto, res: Response) {
    const user: User = await this.userRepository.findOne({
      email: createUserDto.email,
    })
    if (user) {
      throw new NotAcceptableException('This user already exists')
    } else {
      createUserDto.password = await this.hashPassword(createUserDto.password)
      let response = await this.create(createUserDto)
      if (response) {
        return await this.createToken(response, res)
      }
    }
  }
}
