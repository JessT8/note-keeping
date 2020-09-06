import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { typeOrmConfig } from './config/typeorm.config';
import { NoteModule } from './note/note.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
 		TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
    	autoSchemaFile: true,
    	context: ({ req }) => ({ headers: req.headers})
    }),
    NoteModule,
    UserModule,
    TagModule
  ],
})
export class AppModule {}