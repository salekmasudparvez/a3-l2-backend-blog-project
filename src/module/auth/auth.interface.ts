import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ILogin {
  email: string;
  password: string;
}