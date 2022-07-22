import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor( 
    @InjectModel(User.name) private readonly userModule: Model<UserDocument>, 
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> { 
    const { password } = createUserDto;
    const plainToHash = await bcrypt.hash(password, 10);

    createUserDto = {...createUserDto, password:plainToHash};
    return this.userModule.create(createUserDto);
  }

  async findAll(request: Request): Promise<User[]> { 
    return this.userModule
      .find(request.query) 
      .setOptions({ sanitizeFilter: true }) 
      .exec();
  }

  async findOne(id: string): Promise<User> { 
    return this.userModule.findOne({ _id: id }).exec(); 
  }

  async update(id: string, updateUserDto: UpdateUserDto) { 
    return this.userModule.findOneAndUpdate({ _id: id }, updateUserDto, { 
      new: true, 
    });
  }

  async remove(id: string) { 
    return this.userModule.findByIdAndRemove({ _id: id }).exec(); 
  }
}
