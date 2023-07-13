import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: 'ansh1234', 
      database: 'nestjs-crud',
      entities:[User],
      synchronize: true, 
    }),

    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret : 'secret',
      signOptions: {expiresIn:'1d'}
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
