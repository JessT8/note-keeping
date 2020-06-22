import { Injectable } from '@nestjs/common';
// import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { CreateNoteInput } from './note.input'
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
		createNoteInput: CreateNoteInput,
		// @GetUser() user: User
		): Promise<Note>{
		const { title, description } = createNoteInput;
		const note = this.noteRepository.create({
			title,
			description,
		});

		return this.noteRepository.save(note);
		// delete note.user;
		// return note;
	}
}