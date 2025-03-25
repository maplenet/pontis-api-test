import { config } from "./config/env";
import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/database";

async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
  }
}

main();
