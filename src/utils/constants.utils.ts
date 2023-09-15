import cors from "cors";

const allowedOrigins = ['http://localhost:3000', "https://resolutio.ai"];
export const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins
};

//Enums
export enum Roles { "System", "User" };
export enum ContentType { "Text", "Image" }
export enum Status { "Sent", "Received", "Pending" }