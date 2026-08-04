import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  equipment?: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    equipment: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
