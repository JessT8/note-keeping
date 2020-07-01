import { Injectable } from '@nestjs/common';
// import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { NoteInput } from './note.input'
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';

@Injectable()
export class NoteService {
	constructor(
	@InjectRepository(Note) private noteRepository: Repository<Note>,
	){}
	async getNote(id:number):Promise<Note>{
		return this.noteRepository.findOne({id});
	}
	async getNotes():Promise<Note[]>{
		return this.noteRepository.find();
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
}