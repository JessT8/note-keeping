import { ObjectType, Field, ID, ResolveField} from '@nestjs/graphql'
import { User } from '../user/user.entity';
@ObjectType('Note')
export class NoteType{
	@Field(type => ID )
	id:string;

	@Field()
	title:string;

	@Field()
	description:string;

	@Field()
	pin:boolean;

}