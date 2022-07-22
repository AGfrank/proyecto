import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor (
    @InjectModel(User.name) private readonly userModule: Model<UserDocument>,
    private jwtService:JwtService
  ) {}

  async login(userLoginObject:LoginAuthDto) {
    const { email, password } = userLoginObject;
    const findUser = await this.userModule.findOne({email});

    if(!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { id: findUser._id, name: findUser.name };
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token
    };

    return data;
  }
}
