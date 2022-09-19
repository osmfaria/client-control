import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Client } from './client.enitity'

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  @JoinColumn()
  client: Client
}
