import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { DB, sequelize } from './config/db.js';
import apiRoutes from './routes/api.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4200',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],  
  credentials: true,  
}));

app.use('/api', apiRoutes);

(async () => {
  await DB();
  await sequelize.sync(); 
  console.log("✅ Base de datos sincronizada");
})();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});