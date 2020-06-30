import { InputType , Field, ID} from '@nestjs/graphql'
import { MinLength, IsString, MaxLength} from 'class-validator'


@InputType()
export class CreateUserInput {
	@MinLength(4)
	@MaxLength(20)
	@Field()
	username: string;

  @MinLength(8)
  @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W)+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*s/)
	@Field()
	password: string;
}