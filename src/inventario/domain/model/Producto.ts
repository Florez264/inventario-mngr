import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { DetalleCompra } from './DetalleCompra';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'numero_lote', length: 100 })
  numeroLote!: string;

  @Column({ length: 255 })
  nombre!: string;

  @Column('numeric', { precision: 12, scale: 2 })
  precio!: number;

  @Column({ name: 'cantidad_disponible', type: 'int' })
  cantidadDisponible!: number;

  @Column({ name: 'fecha_ingreso', type: 'date' })
  fechaIngreso!: Date;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn!: Date;

  @OneToMany(() => DetalleCompra, detalle => detalle.producto)
  detalles!: DetalleCompra[];
}
