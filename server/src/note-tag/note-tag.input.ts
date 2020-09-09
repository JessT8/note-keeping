import { InputType , Field} from '@nestjs/graphql'
import { Note } from '../note/note.entity';
import { Tag } from '../tag/tag.entity';

@InputType()
export class NoteTagInput {

	@Field()
	note: Note

	@Field()
	tag: Tag

}