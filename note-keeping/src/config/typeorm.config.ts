import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Note } from '../note/note.entity';
import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';
import { NoteTag } from '../note-tag/note-tag.entity';
import { join } from 'path';
require('dotenv').config();
const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;
console.log(process.env);
export const typeOrmConfig: TypeOrmModuleOptions = {
 type:'postgres',
 host: DB_HOST,
 port: parseInt(DB_PORT),
 username: DB_USERNAME,
 password: DB_PASSWORD,
 database: DB_DATABASE,
 entities: [ User, Note, Tag, NoteTag ],
 synchronize: true
}