import { Resolver, Query, Args , Mutation, Context, Parent } from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserService } from './user.service';
import { UserInput } from './user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { User } from './user.entity';
import { NoteService } from '../note/note.service';

@Resolver(of => UserType)

export class UserResolver{
	constructor(
			private userService: UserService,
		  private noteService: NoteService
		){}
	@Query (returns => [ UserType ])
	users(){
		return this.userService.getUsers();
	}
	@Query (returns =>  UserType )
	user(@Args('id') id: number){
		return this.userService.getUser(id);
	}

	@Query (returns => String)
	async signIn(
		@Args("userInput") userInput: UserInput)
	{
		return this.userService.validatePassword(userInput);
	}

	@Mutation (returns => String)
	signUp(
		@Args("userInput") userInput: UserInput
		){
		return this.userService.signUp(userInput);
	}
  @Resolver(of => UserType)
  getNotes(@Parent() user: UserType) {
  	const  id  =  {user};
    return this.noteService.findAll({userId: id});
  }
}