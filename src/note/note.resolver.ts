import { Resolver , Query , Mutation, Args} from '@nestjs/graphql';
import { NoteType } from './note.type';
import { NoteService } from './note.service';


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

	@Mutation(returns => NoteType)
	createNote(
		@Args('title') title:string,
		@Args('description') description: string
	){
		return this.noteService.createNote(title, description);
	}
}