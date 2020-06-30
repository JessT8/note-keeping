import { InputType , Field, ID} from '@nestjs/graphql'
import { MinLength } from 'class-validator'

@InputType()
export class CreateNoteInput {

	@MinLength(1)
	@Field()
	title: string;

  @MinLength(1)
	@Field()
	description: string;

}