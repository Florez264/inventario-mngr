import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './core/infrastructure/connection';
import authRouter from './inventario/infrastructure/rest-api/auth/auth.router';
import productoRouter from './inventario/infrastructure/rest-api/producto/productoRouter';
import compraRouter from './inventario/infrastructure/rest-api/compra/compraRouter';
import path from 'path';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/productos", productoRouter); 
app.use("/api/compras", compraRouter);
app.use('/api-docs', express.static(path.join(__dirname, '../docs/api')));

export const initApp = async () => {
  await connectDB();
  return app;
};
