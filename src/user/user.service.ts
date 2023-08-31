import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransformedQueryParams } from 'src/common/transformed-query-params';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getAll(params?: TransformedQueryParams) {
    //TODO: mettre la logique de filtre, sort, etc dans un package correspondant à la refCard pour mutualiser au sein de toute la squad?
    const totalCount = await this.userModel.countDocuments(params.filters);
    return {
      users: await this.userModel
        .find()
        .where(params.filters)
        .limit(params.limit ?? 10)
        .skip(params.offset ?? 0)
        .sort(params.sortParamsArray),
      count: totalCount,
    };
  }

  //TODO: rajotuer la logique attribute, attribute- avec select
  async findById(id: string) {
    return this.userModel.findById(id);
  }
}
