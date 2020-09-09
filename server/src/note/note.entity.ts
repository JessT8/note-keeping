import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne , JoinColumn, OneToMany , JoinTable} from 'typeorm';
import { User } from '../user/user.entity';
import { NoteTag } from '../note-tag/note-tag.entity';
import { Tag } from '../tag/tag.entity';
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

	@OneToMany(type => NoteTag, noteTag => noteTag.tag)
  noteTag: NoteTag[];

 //  @Field(type=> [Tag])
 //  async tags(@Ctx() { tagLoader}): MyContext): Promise<Tag[]>{
	// 	return tagLoader.load(this.id)
	// }

}