import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteTagInput } from './note-tag.input';
import { NoteTag } from './note-tag.entity';
import { Tag } from '../tag/tag.entity';
import { Note } from '../note/note.entity';

@Injectable()
export class NoteTagService {
	constructor(
	@InjectRepository(NoteTag) private noteTagRepository: Repository<NoteTag>,
	){}
	async addTagToNote(
		noteTagInput: NoteTagInput
		): Promise<boolean>{
		try{
			const { note, tag } = noteTagInput;
		  const noteTag = this.noteTagRepository.create({
				  note,
				  tag
			});
			await this.noteTagRepository.save(noteTag);
			return true;
		}catch(err){
			console.log(err);
			return false;
		}
	}
	async getTags(note: Note) : Promise<Tag[]>{
		const tags = await this.noteTagRepository.find({ where:{note}, relations: ['tag'] });
		return tags.map(n=>n.tag)
	}
}