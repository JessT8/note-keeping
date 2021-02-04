import { Module } from '@nestjs/common';
import { TypeOrmModule,  } from '@nestjs/typeorm';
import { NoteTagService } from './note-tag.service';
import { NoteTag } from './note-tag.entity';
import { TagModule } from '../tag/tag.module'
import { NoteModule } from '../note/note.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([NoteTag])
	],
  providers: [ NoteTagService ],
  exports:[ NoteTagService ]
})
export class NoteTagModule {}