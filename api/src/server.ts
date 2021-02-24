import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './routes';

const app = express();

// app.get("/", (request, response) => {
//   // return response.send("Hello World!");
//   return response.json({ message: "Hello Wolrd" });
// })

// app.post("/", (request, response) => {
//   return response.json({ message: "Os dados foram salvos com sucesso!" });
// })
app.use(express.json());
app.use(router);

app.listen(3333, () => console.log("Server is running"));
