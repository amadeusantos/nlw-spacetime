import 'dotenv/config';

import fastify from "fastify";
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import { resolve } from "node:path";
import fastifyStatic from '@fastify/static';
import { memeoriesRoutes } from "./routes/memories";
import { authRoutes } from './routes/auth';
import { uploadRoutes } from './routes/upload';

const app = fastify();

app.register(cors, {
    origin: true
});

app.register(jwt, {
    secret: "001d75a5-ecf3-4b98-aa32-2073a6cf1838"
});

app.register(multipart);

app.register(fastifyStatic, {
    root: resolve(__dirname, "../uploads"),
    prefix: "/uploads"
});

app.register(authRoutes);
app.register(memeoriesRoutes);
app.register(uploadRoutes);

app.listen({
    port: 3333,
    host: "0.0.0.0"
}).then(() => {
    console.log("Server running port 3333");
});