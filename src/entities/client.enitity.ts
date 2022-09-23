import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { Contact } from "./contact.entity"

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ length: 250 })
  name: string

  @Column({ length: 120, unique: true })
  email: string

  @Column({ length: 128})
  password?: string
  
  @Column({ length: 60, unique: true })
  phone: string

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => Contact, (contact) => contact.client)
  contacts: Contact[]
}