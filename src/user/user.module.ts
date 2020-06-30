import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule,  } from '@nestjs/typeorm';
import { User } from './user.entity';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([User])
	],
  providers: [
 		UserService,
  	UserResolver
  ],
})
export class UserModule {}