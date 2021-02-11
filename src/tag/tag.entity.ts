import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NoteTag } from '../note-tag/note-tag.entity';

@Entity("tags")
export class Tag extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name:string;

	@OneToMany(type => NoteTag, noteTag => noteTag.note)
  noteTag: NoteTag[];
}