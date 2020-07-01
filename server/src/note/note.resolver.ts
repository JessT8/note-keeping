import { Resolver , Query , Mutation, Args, Context} from '@nestjs/graphql';
import { NoteType } from './note.type';
import { NoteService } from './note.service';
import { NoteInput } from './note.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../user/auth.guard';
import { User } from '../user/user.entity';

@UseGuards(new AuthGuard())
@Resolver(of => NoteType )
export class NoteResolver {
	constructor(
		private noteService: NoteService
		){}
	@Query(returns => NoteType)
	note(
		@Args('id') id:number
		){
		return this.noteService.getNote(id);
	}
	@Query(returns => [ NoteType ])
	notes(
		){
		return this.noteService.getNotes();
	}
	@Mutation(returns => NoteType)
	createNote(
		@Args("noteInput") noteInput : NoteInput,
		@Context('user') user: User
	){
		return this.noteService.createNote(noteInput, user);
	}
}