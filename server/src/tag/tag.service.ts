import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { TagInput } from './tag.input'
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';

@Injectable()
export class TagService {
constructor(
	@InjectRepository(Tag) private tagRepository: Repository<Tag>,
	){}
	async createTag(
		tagInput: TagInput,
		@GetUser() user: User
		): Promise<Tag>{
		const { name } = tagInput;
		const tag = this.tagRepository.create({
			name
		});
		return this.tagRepository.save(tag);
	}
	async updateTag(
		tagInput: TagInput,
		@GetUser() user: User
		): Promise<Tag>{
		const { name } = tagInput;
		const tag = await this.tagRepository.findOne({name});
		// if(tag){

		// }
		return this.tagRepository.save(tag);
	}
}