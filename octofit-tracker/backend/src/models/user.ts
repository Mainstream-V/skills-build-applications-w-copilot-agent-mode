import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  age?: number;
  team?: Types.ObjectId | null;
  points: number;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, min: 0 },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
