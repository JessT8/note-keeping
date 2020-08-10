import { Injectable , ConflictException, InternalServerErrorException,  UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './user.input';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../constants';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		)
	{}
	//get all users
	async getUsers(): Promise<User[]>{
		return this.userRepository.find();
	}
	//create user
	async signUp( userInput: UserInput): Promise<boolean>{
		const { username, password } = userInput;
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

	async validatePassword( userInput: UserInput): Promise<string>{
		const { username ,password } = userInput;
		const user = await User.findOne({username});
		const { id } = user;
		const validation = await user.validatePassword(password);
		if( user && validation){
			return jwt.sign({id, username}, jwtConstants.secret);
		}else{
			throw new UnauthorizedException('Invalid Credential');
		}
	}
	private async hashPassword(password: string, salt:string){
		return bcrypt.hash(password,salt);
	}
}