import { Resolver , Query , Mutation, Args, Context, Parent, ResolveField } from '@nestjs/graphql';
import { NoteType } from './note.type';
import { Note } from './note.entity';
import { NoteService } from './note.service';
import { NoteInput } from './note.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../user/auth.guard';
import { User } from '../user/user.entity';
import { TagService } from '../tag/tag.service';
import { TagInput } from '../tag/tag.input';
import { Tag } from '../tag/tag.entity';
import { NoteTagService } from '../note-tag/note-tag.service';

@UseGuards(new AuthGuard())
@Resolver(of => NoteType )
export class NoteResolver {
	constructor(
		private noteService: NoteService,
		private tagService: TagService,
		private noteTagService: NoteTagService,
		){}
	@Query(returns => NoteType)
	note(
		@Args('id') id:number
		){
		return this.noteService.getNote(id);
	}
	findAll(
		@Args('id') id:number
		){
		return this.noteService.findAll({userId:id});
	}
	@Query(returns => [ NoteType ])
	notes(
	@Context('user') user: User
		)
	{
		return this.noteService.getNotes(user);
	}
	@Mutation(returns => NoteType)
	createNote(
		@Args("noteInput") noteInput : NoteInput,
		@Context('user') user: User
	){
		return this.noteService.createNote(noteInput, user);
	}
	@Mutation(returns => NoteType)
	updateNote(
		@Args("noteInput") noteInput : NoteInput,
		@Args("id") id:number,
		@Context('user') user: User
	){
		return this.noteService.updateNote(id, noteInput, user);
	}
	@Mutation(returns => Boolean)
	deleteNote(
		@Args("id") id:number,
		@Context('user') user: User
	){
		return this.noteService.deleteNote(id, user);
	}
	@Mutation(returns => Boolean )
	async addTagsToNote(
		@Args("tagInput")
		tagInput : TagInput,
		@Args("noteId")
		noteId : number,
		@Context('user') user: User
	){
		const tag =await this.tagService.getTag(tagInput);
		const note = await this.noteService.getNote(noteId);
		return this.noteTagService.addTagToNote({note, tag});
	}
	@ResolveField()
  async tags(@Parent() noteType: NoteType) {
  const note = await this.noteService.getNote(noteType.id);
   return this.noteTagService.getTags(note);
  }
}