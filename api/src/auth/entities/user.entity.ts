import { Min, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @MinLength(3)
  username: string;

  @Column()
  @MinLength(5)
  password: string;
}
