import { Resolver, Query, Args , Mutation, Context} from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserService } from './user.service';
import { UserInput } from './user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver(of => UserType)

export class UserResolver{
	constructor(
			private userService: UserService,
		){}
	@Query (returns => [ UserType ])
	users(){
		return this.userService.getUsers();
	}

	@Query (returns => String)
	async signIn(
		@Args("userInput") userInput: UserInput)
	{
		return this.userService.validatePassword(userInput);
	}

	@Mutation (returns => Boolean)
	signUp(
		@Args("userInput") userInput: UserInput
		){
		return this.userService.signUp(userInput);
	}
}