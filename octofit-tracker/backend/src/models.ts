import mongoose, { Schema, model, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  fitnessGoal: string;
}

export interface ITeam {
  name: string;
  focus: string;
  members: number;
}

export interface IActivity {
  type: string;
  durationMinutes: number;
  calories: number;
  userName: string;
}

export interface ILeaderboardEntry {
  name: string;
  points: number;
  streak: number;
}

export interface IWorkout {
  title: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessGoal: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  focus: { type: String, required: true },
  members: { type: Number, required: true },
});

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  userName: { type: String, required: true },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  name: { type: String, required: true, unique: true },
  points: { type: Number, required: true },
  streak: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, unique: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);
export const Team = model<ITeam>('Team', teamSchema);
export const Activity = model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout = model<IWorkout>('Workout', workoutSchema);

export const connectDatabase = async () => {
  const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
  await mongoose.connect(connectionString);
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
};
