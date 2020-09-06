import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType('Tag')
export class TagType{

	@Field(type => ID )
	id:number;

	@Field()
	name:string;

}