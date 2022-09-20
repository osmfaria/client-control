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

  @Column({ length: 250 })
  name: string

  @Column({ length: 120, unique: true })
  email: string

  @Column({ length: 60, unique: true })
  phone: string

  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  @JoinColumn()
  client: Client
}
