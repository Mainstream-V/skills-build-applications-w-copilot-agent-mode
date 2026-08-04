import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId;
  username: string;
  totalPoints: number;
  rank: number;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    username: { type: String, required: true, trim: true },
    totalPoints: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
