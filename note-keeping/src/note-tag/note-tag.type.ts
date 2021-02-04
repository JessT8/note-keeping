import { ObjectType, Field, ID } from '@nestjs/graphql'
import { NoteType } from '../note/note.type';
import { TagType } from '../tag/tag.type';

@ObjectType('NoteTag')
export class NoteTagType{

	@Field(type => ID )
	id:number;

  @Field(type =>  TagType )
  tags: TagType

	@Field(type =>  NoteType )
	notes: NoteType;
}