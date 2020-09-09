import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Note } from '../note/note.entity';
import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';
import { NoteTag } from '../note-tag/note-tag.entity';
export const typeOrmConfig: TypeOrmModuleOptions = {
 type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'jessica',
 password: null,
 database: 'notekeeper',
 entities: [ User, Note, Tag, NoteTag ],
 synchronize: true
}