import express from "express"
import userRoutes from "./routes/userRoutes.js"
import bodyParser from "body-parser"
import cors from 'cors'


const app = express();
const allowedOrigins = ['http://localhost:3000'];
app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}));

app.use('/api/user', userRoutes)


const PORT = 51;
const HOST = '0.0.0.0'
app.listen(PORT, HOST, () => {
    console.log(`App started in http://${HOST}:${PORT}`)
});