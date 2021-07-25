import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'note_name',
  })
  noteName: string;

  @Column()
  content: string;

  @Column()
  order: string;

  @Column({
    name: 'modified_at',
  })
  modifiedAt: string;
}
