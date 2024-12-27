import { model, Schema } from 'mongoose'
import { IUser } from './auth.interface'
import bcrypt from 'bcrypt'
import config from '../../config';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter a valid email address']
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'blogUsers'
  }
)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds),
  );

  next();
});

const User = model<IUser>('User', userSchema)
export default User



