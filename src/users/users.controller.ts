import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/udpate-user.dto';
import { parse } from 'path';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Get('/colours/:colour')
    setColor(@Param('color') color: string, @Session() session: any){
        session.color = color;
    }

    @Get('/colors')
    getColors(@Session() session: any) {
        return session.color;
    }

    @Post('/signup')
    async createUser(@Body() createUser: CreateUserDto, @Session() session: any) {
        // console.log(createUser)
        // this.usersService.create(createUser.email, createUser.password)
        const user = await this.authService.signup(createUser.email, createUser.password)

        session.userId = user.id;
        return user;
    }

    @Post('/sign-in')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
       const user = await this.authService.signin(body.email, body.password)
    }

    // @Get('/whoami')
    // whoAmI(@Session() session: any){
    //     return this.usersService.findOne(session.userId)
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: string){
        return user
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null
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
