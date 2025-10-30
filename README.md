# 🧾 Inventario Manager API

API REST desarrollada con **Node.js**, **TypeScript**, **JWT** y **PostgreSQL**, diseñada para gestionar usuarios, productos y compras en un sistema de inventario.  
Incluye autenticación basada en roles (**Administrador** y **Cliente**) y endpoints protegidos mediante tokens JWT.

---

## 🚀 Tecnologías utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **PostgreSQL**
- **JWT (JSON Web Token)** para autenticación
- **TypeORM** como ORM
- **bcrypt** para encriptar contraseñas

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/Florez264/inventario-mngr.git
cd inventario-mngr

npm install


# Puerto del servidor
PORT=3000

# Configuración de la base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=inventario_db

# JWT
JWT_SECRET=clave_secreta_segura
JWT_EXPIRES_IN=1d


npm run dev

