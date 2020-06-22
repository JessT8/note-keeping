import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { typeOrmConfig } from './config/typeorm.config';
import { NoteModule } from './note/note.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
 		TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
    	autoSchemaFile: true
    }),
    NoteModule,
    UserModule
  ],
})
export class AppModule {}