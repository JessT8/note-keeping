import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { typeOrmConfig } from './config/typeorm.config';
import { NoteModule } from './note/note.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { NoteTagModule } from './note-tag/note-tag.module';
console.log(typeOrmConfig);
@Module({
  imports: [
  	ConfigModule.forRoot(),
 		TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
    	autoSchemaFile: true,
    	playground: true,
    	context: ({ req }) => ({ headers: req.headers})
    }),
    NoteModule,
    UserModule,
    TagModule,
    NoteTagModule
  ],
})

export class AppModule {}