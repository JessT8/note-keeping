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
		): Promise<Tag>{
		try{
			const { note, tag } = noteTagInput;
		  const noteTag = this.noteTagRepository.create({
				  note,
				  tag
			});
			await this.noteTagRepository.save(noteTag);
			return tag;
		}catch(err){
			console.log(err);
		}
	}
	async removeTagFromNote(
		noteTagInput: NoteTagInput
		): Promise<boolean>{
		try{
			const { note, tag } = noteTagInput;
		  const noteTag = await this.noteTagRepository.findOne({
				  note,
				  tag
			});
			await this.noteTagRepository.delete({id:noteTag.id, note: note, tag: tag});
			return true;
		}catch(err){
			console.log(err);
			return false;
		}
	}
	async removeNotes(
			note : Note
		): Promise<boolean>{
		try{
			const noteTag = await this.noteTagRepository.find({where:{note}});
			await this.noteTagRepository.remove(noteTag);
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