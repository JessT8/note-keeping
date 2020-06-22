import { Resolver, Query, Args , Mutation} from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserService } from './user.service';
import { CreateUserInput } from './create-user.input';

@Resolver(of => UserType)
export class UserResolver{
	constructor(
		private userService: UserService
		){}
	@Query( returns => UserType )
	user(
		@Args('id') id:number
		){
		return this.userService.getUser(id);
		}

	@Query (returns => [ UserType ])
	users(){
		return this.userService.getUsers();
	}
	@Query (returns => Boolean)
	signUp(
		@Args("createUserInput") createUserInput: CreateUserInput){
		return this.userService.validatePassword(createUserInput);
		}

	@Mutation (returns => Boolean)
	createUser(
		@Args("createUserInput") createUserInput: CreateUserInput
		){
		return this.userService.createUser(createUserInput);
	}
}