import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, ManyToOne , JoinColumn} from 'typeorm';
import { Note } from '../note/note.entity';
import { Tag } from '../tag/tag.entity';

@Entity("notetags")
@Unique(['note', 'tag'])
export class NoteTag extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

  @ManyToOne(type => Note, note => note.noteTag, {primary: true, eager:true})
  @JoinColumn({name: "noteId"})
  note: Note;

  @ManyToOne(type => Tag, tag => tag.noteTag, {primary: true, eager:true})
  @JoinColumn({name: "tagId"})
  tag: Tag;
}