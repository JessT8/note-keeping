import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("tags")
export class Tag extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name:string;
}