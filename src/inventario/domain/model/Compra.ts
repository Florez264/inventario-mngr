import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Usuario } from './Usuario';
import { DetalleCompra } from './DetalleCompra';

@Entity('compras')
export class Compra {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, usuario => usuario.compras, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @CreateDateColumn({ name: 'fecha_compra' })
  fechaCompra!: Date;

  @Column('numeric', { precision: 14, scale: 2, default: 0 })
  total!: number;

  @OneToMany(() => DetalleCompra, detalle => detalle.compra, { cascade: true, eager: true })
  detalles!: DetalleCompra[];
}
