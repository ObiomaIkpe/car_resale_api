import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/udpate-user.dto';
import { parse } from 'path';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Post('/signup')
    createUser(@Body() createUser: CreateUserDto) {
        // console.log(createUser)
        // this.usersService.create(createUser.email, createUser.password)
        return this.authService.signup(createUser.email, createUser.password)
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('handler is running!')
        const user = await this.usersService.findOne(parseInt(id));

        if(!user) throw new NotFoundException()
    }

    @Get()
    findAllUsers(@Query('email') email: string){
        return this.usersService.find(email)
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
        return this.usersService.update(parseInt(id), updateUser)
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        this.usersService.remove(parseInt(id))
    }
}
