import { ObjectType, Field, ID, ResolveField} from '@nestjs/graphql'
import { UserType } from '../user/user.type';
import { TagType } from '../tag/tag.type';

@ObjectType('Note')
export class NoteType{
	@Field(type => ID )
	id:number;

	@Field()
	title:string;

	@Field()
	description:string;

	@Field()
	pin:boolean;

	@Field(type => UserType)
  user: UserType;

  @Field(type => [TagType])
  tags: TagType[];
}