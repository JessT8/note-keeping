import { Module } from '@nestjs/common';
import { NoteResolver } from './note.resolver';
import { NoteService } from './note.service';
import { TypeOrmModule,  } from '@nestjs/typeorm';
import { Note } from './note.entity';

@Module({
	imports: [
	TypeOrmModule.forFeature([Note])]
	,
	providers: [
	NoteResolver,
	NoteService
	]
})
export class NoteModule {}