import { initApp } from "./main";
import { loadEnvVars } from "./core/infrastructure/load-env-vars";

const port = process.env.PORT || 3000;

async function bootstrap() {
  loadEnvVars();

  const app = await initApp(); 

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

bootstrap();
