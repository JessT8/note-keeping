import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository, createQueryBuilder, getConnection } from 'typeorm';
import { NoteInput } from './note.input'
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';
import { TagInput } from '../tag/tag.input';
import { NoteTag } from '../note-tag/note-tag.entity';
@Injectable()
export class NoteService {
	constructor(
	@InjectRepository(Note) private noteRepository: Repository<Note>,
	){}
	async getNote(id:number):Promise<Note>{
		 return await this.noteRepository.findOne({id});
	}
	async getNotes(
		@GetUser() user: User
		):Promise<Note[]>{
		return this.noteRepository.find({where:{user: user.id}, order: { "id": "DESC" } , relations: ['user']});
	}
	async findAll({userId:number}):Promise<Note[]>{
		return this.noteRepository.find(User);
		}
	async createNote(
		noteInput: NoteInput,
		@GetUser() user: User
		): Promise<Note>{
		const { title, description } = noteInput;
		const note = this.noteRepository.create({
			title,
			description,
			user
		});
		return this.noteRepository.save(note);
	}
	async updateNote(
		id:number,
		noteInput: NoteInput,
		@GetUser() user: User
		): Promise<Note>{
		const { title, description } = noteInput;
		const note = await this.noteRepository.findOne({id});
		note.title = title;
		note.description = description;
		return this.noteRepository.save(note);
	}
	async deleteNote(
		id:number,
		@GetUser() user: User
		): Promise<Boolean>{
			const result = await this.noteRepository.delete(id);
			return (result.affected !== 0)? true : false;
	}
}