import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QueryParamsPipe } from 'src/common/pipes/query-params/query-params.pipe';
import { TransformedQueryParams } from 'src/common/transformed-query-params';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  postUser(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }

  @Get()
  getAll(@Query(QueryParamsPipe) queryParams: TransformedQueryParams) {
    return this.userService.getAll(queryParams);
  }
}
