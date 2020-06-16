import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity("notes")
export class Note extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title:string;

  @Column()
	description:string;
}