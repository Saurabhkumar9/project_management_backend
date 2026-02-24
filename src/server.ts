import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected ");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed ", error);
  });