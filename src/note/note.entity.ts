import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity("notes")
export class Note extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title:string;

  @Column()
	description:string;

	@ManyToOne(type => User, user => user.notes, {eager:false})
  user: User;
}