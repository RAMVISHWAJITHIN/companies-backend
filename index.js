import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import companyRoutes from "./src/routes/company.route.js"

import { connectDB } from "./src/lib/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173","https://companies-frontend-five.vercel.app/"],
    credentials: true,
  })
);

app.use("/api/companies", companyRoutes)



app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
  connectDB();
});

