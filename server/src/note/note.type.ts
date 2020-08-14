import { ObjectType, Field, ID, ResolveField} from '@nestjs/graphql'
import { UserType } from '../user/user.type';
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

	@Field(type => UserType)
  user: UserType;
}