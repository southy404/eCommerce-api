import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/index.ts";
import { router } from "./routes/index.ts";
import { notFound } from "./middleware/notFound.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "eCommerce API is running",
  });
});

app.use("/", router);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
