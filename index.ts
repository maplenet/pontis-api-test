import { config } from "./src/config/env";
import "reflect-metadata";
import app from "./src/app";
import { AppDataSource } from "./src/config/database";

process.env.TZ = "America/New_York";

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
