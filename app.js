import express from "express";
import cors from "cors";
import router from "./src/routes/auth.routes.js";
import customerRoutes from "./src/routes/customer.routes.js";
import statusRouter from "./src/routes/status.routes.js";
import { config } from "./src/config/env.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/status", statusRouter);
app.use("/api/auth", router);
app.use("/api/customers", customerRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;