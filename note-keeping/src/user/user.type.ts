import { ObjectType, Field, ID} from '@nestjs/graphql'
import { NoteType } from '../note/note.type';

@ObjectType('User')
export class UserType{
	@Field( type => ID )
	id:number;

	@Field()
	username:string;

	@Field()
	password:string;

	@Field(type => [NoteType])
  notes: NoteType[];
}