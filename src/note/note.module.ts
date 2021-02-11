import { Module  } from '@nestjs/common';
import { NoteResolver } from './note.resolver';
import { NoteService } from './note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { TagModule } from '../tag/tag.module';
import { NoteTagModule } from '../note-tag/note-tag.module';

@Module({
	imports: [
	TypeOrmModule.forFeature([Note]),
	TagModule,
	NoteTagModule,

	],
	providers: [
	NoteResolver,
	NoteService
	],
  exports: [NoteService]
})
export class NoteModule {}