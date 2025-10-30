import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Rol } from './Rol';
import { Compra } from './Compra';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Rol, rol => rol.usuarios, { onDelete: 'RESTRICT', eager: true })
  @JoinColumn({ name: 'rol_id' })
  rol!: Rol;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn!: Date;

  @OneToMany(() => Compra, compra => compra.usuario)
  compras!: Compra[];
}
