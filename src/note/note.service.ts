import { Injectable } from '@nestjs/common';
// import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
	constructor(
	@InjectRepository(Note) private noteRepository: Repository<Note>,
	){}
	async getNote(id:number):Promise<Note>{
		return this.noteRepository.findOne({id});
	}
	async createNote(title, description): Promise<Note>{
		const note = this.noteRepository.create({
			title,
			description
		});
		return this.noteRepository.save(note);
	}
}