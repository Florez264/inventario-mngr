import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30, unique: true })
  nombre!: string;

  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios!: Usuario[];
}
