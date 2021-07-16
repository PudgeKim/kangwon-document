import { Module } from '@nestjs/common';
import { HelloController } from './hello/hello.controller';
import { HelloService } from './hello/hello.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'user123',
    password: 'password',
    database: 'kangwon_document',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [HelloController],
  providers: [HelloService],
})
export class AppModule {}
 