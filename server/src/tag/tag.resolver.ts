import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { TagType } from './Tag.type';
import { TagService } from './tag.service';
import { TagInput } from './tag.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../user/auth.guard';
import { User } from '../user/user.entity';

@UseGuards( new AuthGuard() )
@Resolver( of => TagType )
export class TagResolver {
	constructor(
		private tagService: TagService
		){}
	@Mutation(returns => TagType)
	createNote(
		@Args("tagInput") tagInput : TagInput,
		@Context('user') user: User
	){
		return this.tagService.createTag(tagInput, user);
	}
	@Mutation(returns => TagType)
	updateTag(
		@Args("tagInput") tagInput : TagInput,
		@Context('user') user: User
	){
		return this.tagService.updateTag(tagInput, user);
	}
}