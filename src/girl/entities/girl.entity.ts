import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

@Entity()
export class Girl {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', default: '' })
  skill: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_time: Date;

  @Generated('uuid')
  uuid: string;
}
