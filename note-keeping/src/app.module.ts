import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { typeOrmConfig } from './config/typeorm.config';
import { NoteModule } from './note/note.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { NoteTagModule } from './note-tag/note-tag.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
  	ConfigModule.forRoot(),
 		TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
    	autoSchemaFile: true,
    	playground: false,
    	context: ({ req }) => ({ headers: req.headers})
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
    }),
    NoteModule,
    UserModule,
    TagModule,
    NoteTagModule
  ],
})

export class AppModule {}