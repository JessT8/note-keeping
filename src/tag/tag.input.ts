import { InputType , Field, ID} from '@nestjs/graphql'
import { MinLength } from 'class-validator'
import { User } from '../user/user.entity';

@InputType()
export class TagInput {

	@MinLength(1)
	@Field()
	name: string;

}