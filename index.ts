import express, { NextFunction, Response, Request } from 'express';
import 'dotenv/config';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectToMongoDB from './db/connectDb'
import authRoutes from "./routes/auth.route";
import hotelRoutes from "./routes/hotel.route";
import { IHttpError } from './types/errorTypes'

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors({
  origin: '*',
  credentials: true,
}))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);

app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(
  (err: IHttpError, req: Request, res: Response, next: NextFunction): void => {
    res.status(err.status).json({ message: err.message });
  }
);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is listening on ${PORT}`)
  })