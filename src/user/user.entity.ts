import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Note } from '../note/note.entity';
@Entity("users")
@Unique(['username'])
export class User extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username:string;

  @Column()
	password:string;

	@Column()
	salt:string;

	@OneToMany(type => Note, note => note.user, {eager:true})
  notes: Note[];
}