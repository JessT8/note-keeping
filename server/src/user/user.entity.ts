import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Note } from '../note/note.entity';
import * as bcrypt from 'bcrypt';

@Entity("users")
@Unique(['username'])
export class User extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username:string;

  @Column({ select: false })
	password:string;

	@Column()
	salt:string;

	@OneToMany(type => Note, note => note.user, {eager:true})
  notes: Note[];

  async validatePassword(password:string) : Promise<boolean>{
  	const hash = await bcrypt.hash(password, this.salt);
  	return hash === this.password;
  };
}