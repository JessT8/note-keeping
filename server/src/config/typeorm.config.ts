import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Note } from '../note/note.entity';
import { User } from '../user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
 type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'jessica',
 password: null,
 database: 'notekeeper',
 entities: [ Note,User ],
 synchronize: true
}