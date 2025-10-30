import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Compra } from './Compra';
import { Producto } from './Producto';

@Entity('detalle_compras')
export class DetalleCompra {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Compra, compra => compra.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compra_id' })
  compra!: Compra;

  @ManyToOne(() => Producto, producto => producto.detalles, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'producto_id' })
  producto!: Producto;

  @Column({ type: 'int' })
  cantidad!: number;

  @Column('numeric', { precision: 12, scale: 2 })
  precioUnitario!: number;

  @Column('numeric', { precision: 14, scale: 2 })
  subtotal!: number;

  @BeforeInsert()
  @BeforeUpdate()
  calcularSubtotal() {
    this.subtotal = Number(this.cantidad) * Number(this.precioUnitario);
  }
}
