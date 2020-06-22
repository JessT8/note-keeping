import { Injectable , ConflictException, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>)
	{}
	//get user by id
	async getUser(id:number):Promise<User>{
		return this.userRepository.findOne({id});
	}
	//get all users
	async getUsers( ): Promise<User[]>{
		return this.userRepository.find();
	}
	//create user
	async createUser( createUserInput: CreateUserInput): Promise<boolean>{
		const { username, password } = createUserInput;
		const user = new User();
		user.username = username;
		user.salt = await bcrypt.genSalt();
		user.password = await this.hashPassword(password, user.salt);
		try{
			await user.save();
			return true;
		}catch(error){
			if(error.code === '23505'){
				throw new ConflictException("username already taken");
			}else{
				throw new InternalServerErrorException();
			}
		}
	}
	async validatePassword( createUserInput: CreateUserInput): Promise<string>{
		const { username ,password } = createUserInput;
		const user = await User.findOne({username});
		const validation = await user.validatePassword(password);
		if( user && validation){
			return user.username;
		}else{
			return null;
		}
	}
	private async hashPassword(password: string, salt:string){
		return bcrypt.hash(password,salt);
	}
}