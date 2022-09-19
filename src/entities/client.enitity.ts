import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { Contact } from "./contact.entity"

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => Contact, (contact) => contact.client)
  contacts: Contact[]
}