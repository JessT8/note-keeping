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
	@UseGuards(new AuthGuard())
	users(@Context('user') user: UserType){
		return this.userService.getUsers();
	}

	@Query (returns => String)
	async signIn(
		@Args("userInput") userInput: UserInput)
	{
		return this.userService.validatePassword(userInput)
	}

	@Mutation (returns => Boolean)
	createUser(
		@Args("userInput") userInput: UserInput
		){
		return this.userService.createUser(userInput);
	}
}