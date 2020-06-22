import { Resolver , Query , Mutation, Args} from '@nestjs/graphql';
import { NoteType } from './note.type';
import { NoteService } from './note.service';
import { CreateNoteInput } from './note.input';

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
		@Args("createNoteInput") createNoteInput : CreateNoteInput,
		// @Args("user") user : User
	){
		return this.noteService.createNote(createNoteInput);
	}
}