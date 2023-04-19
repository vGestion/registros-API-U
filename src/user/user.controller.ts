import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Delete('/deleteCertificate/:id')
  deleteOneField(@Query('campo') campo: string,@Param('id') id: string){
    return this.userService.deleteCertificate(id,campo);
  }

  @Post('/addCertificate/:id')
  addUser(@Body() certificate: {event:string,url:string}, @Param('id') id: string){
    return this.userService.addCertificate(id,certificate)
  }

  @Post('/login')
  login(@Body() registro: {id: string, password: string}){
    return this.userService.login(registro.id, registro.password)
  }

  @Post('/loginAuth')
  loginAuth(@Body() registro: {id: string, password: string}){
    return this.userService.loginAuth(registro.id, registro.password)
  }
}