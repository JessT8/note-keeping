import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Note } from '../note/note.entity';


export const typeOrmConfig: TypeOrmModuleOptions = {
 type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'jessica',
 password: null,
 database: 'notekeeper',
 entities: [Note],
 synchronize: true
}