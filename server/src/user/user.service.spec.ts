import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException, InternalServerErrorException} from '@nestjs/common';

const mockUser = { username:'test ureser', password:'password123'}
const repositoryMockFactory= () =>(
{
  find:  jest.fn(),
  createUser: jest.fn()
});

describe('UserService',() => {
	let userService;
	let userRepository;

	beforeEach( async () =>{
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(User),
			 		useFactory: repositoryMockFactory
			 	},
			],
		}).compile();
		userService = await module.get<UserService>(UserService);
		userRepository = module.get<Repository<User>>(getRepositoryToken(User));
	})
	 it('service should be defined', () => {
    expect(userService).toBeDefined();
  })
	describe('getUsers', () => {
		it('gets all users from the repository', async ()=>{
			userRepository.find.mockResolvedValue('someValue');

			expect(userRepository.find).not.toHaveBeenCalled();
			const result = await userService.getUsers();
			expect(userRepository.find).toHaveBeenCalled();
			expect(result).toEqual('someValue');
  	});
	});
	describe('signUp', () => {
		it('successfully signs up a user', async() => {
			userRepository.createUser.mockResolvedValue('someValue');
			expect(userRepository.createUser).not.toHaveBeenCalled();
				const result = await userRepository.createUser(mockUser);
				expect(userRepository.createUser).toHaveBeenCalledWith(mockUser);
				expect(result).toEqual('someValue');
			});
		it('should throw a conflict exception as username already exists', async() => {
			userRepository.createUser.mockRejectedValue({ code: '23505' });
			expect(userRepository.createUser(mockUser)).rejects.toThrow(InternalServerErrorException);
		})
	});
	describe('validate password', ()=>{
		let user;
		beforeEach(() => {
			userRepository.findOne = jest.fn();
			user = new User();
			user.username = 'TestUsername';
			user.validatePassword = jest.fn();
		});
		it('returns validate successfully' ()=>{

		});
		it('return null as user cannot be found', () => {
		 });
		it('returns null as password is invalid', ()=>{

		});
	})
});