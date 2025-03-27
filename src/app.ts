import express from "express";
import cors from "cors";
import router from "./routes/auth.routes";
import routerLine from "./routes/authLine.routes";
import customerRoutes from "./routes/customer.routes";
import lineRoutes from "./routes/line.routes";
import statusRouter from "./routes/status.routes";
import morgan from "morgan";

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.use("/api/status", statusRouter);
app.use("/api/auth", router);
app.use("/api/customers", customerRoutes);
app.use("/api/v2/auth", routerLine);
app.use("/api/v2/customers", lineRoutes);

export default app;
