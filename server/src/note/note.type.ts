import { ObjectType, Field, ID} from '@nestjs/graphql'

@ObjectType('Note')
export class NoteType{
	@Field(type => ID )
	id:string;

	@Field()
	title:string;

	@Field()
	description:string;

}