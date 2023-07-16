import { Controller, Get, Post , Res , Body, Redirect, Query, Param, BadRequestException} from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {Response} from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService
    ) { }


  @Get('/test')
  getName(): string {
    return "test";
  }



  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  //User login signup

 @Post('register')
  async register(@Body('name') name: string , 
                 @Body('email') email: string,
                 @Body('password') password:string){

    const hashedPasword = await bcrypt.hash(password , 12);

    return this.appService.create({
      name,
      email,
      password: hashedPasword
    })

  }

  @Post('login')
  async login( @Body('email') email: string,
               @Body('password') password:string,
               @Res({passthrough : true}) response : Response){

    const user = await this.appService.getUserByEmail(email);

    if(!user){

      throw new BadRequestException('Invalid credentials!');

    }

    if(!await bcrypt.compare(password , user.password)){
      throw new BadRequestException('Invalid credentials!');
    }

    const jwt = this.jwtService.signAsync({id: user.email});

    response.cookie('jwt' , jwt ,{httpOnly : true})

    return {
      message : 'success'
    }};
  
}
