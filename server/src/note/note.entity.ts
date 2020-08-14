import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne , JoinColumn} from 'typeorm';
import { User } from '../user/user.entity';

@Entity("notes")
export class Note extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title:string;

  @Column()
	description:string;

	@Column({default: false})
	pin:boolean;

	@ManyToOne(type => User, user => user.notes )
	@JoinColumn()
  user: User;

}