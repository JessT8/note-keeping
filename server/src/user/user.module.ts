import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule,  } from '@nestjs/typeorm';
import { User } from './user.entity';
import {  NoteModule } from '../note/note.module';
@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		NoteModule
	],
  providers: [
 		UserService,
  	UserResolver
  ]
})
export class UserModule {}