import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Note } from '../note/note.entity';
import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';
import { NoteTag } from '../note-tag/note-tag.entity';
import { join } from 'path';
require('dotenv').config();
const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DATABASE_URL } = process.env;
export let typeOrmConfig: TypeOrmModuleOptions = {
  type:'postgres',
  entities: [ User, Note, Tag, NoteTag ],
  synchronize: true,
  ssl: { rejectUnauthorized: false }
};
if(DATABASE_URL){
  typeOrmConfig = {
    ...typeOrmConfig,
    url:DATABASE_URL
  }
}else{
  typeOrmConfig = {
    ...typeOrmConfig,
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  }
}