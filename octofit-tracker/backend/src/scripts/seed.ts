import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout, connectDatabase, disconnectDatabase } from '../models';

dotenv.config();

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Asha Patel', email: 'asha@example.com', role: 'Captain', fitnessGoal: 'Build endurance' },
      { name: 'Mina Chen', email: 'mina@example.com', role: 'Member', fitnessGoal: 'Increase strength' },
      { name: 'Theo Brooks', email: 'theo@example.com', role: 'Member', fitnessGoal: 'Improve mobility' },
    ]);

    await Team.insertMany([
      { name: 'North Stars', focus: 'Endurance', members: 8 },
      { name: 'River Runners', focus: 'Speed', members: 6 },
    ]);

    await Activity.insertMany([
      { type: 'Run', durationMinutes: 32, calories: 420, userName: users[0].name },
      { type: 'Cycling', durationMinutes: 45, calories: 500, userName: users[1].name },
      { type: 'Yoga', durationMinutes: 28, calories: 180, userName: users[2].name },
    ]);

    await LeaderboardEntry.insertMany([
      { name: users[0].name, points: 980, streak: 12 },
      { name: users[1].name, points: 910, streak: 9 },
      { name: users[2].name, points: 875, streak: 7 },
    ]);

    await Workout.insertMany([
      { title: 'HIIT Circuit', difficulty: 'Intermediate', durationMinutes: 35, focus: 'Cardio' },
      { title: 'Recovery Flow', difficulty: 'Beginner', durationMinutes: 20, focus: 'Mobility' },
      { title: 'Strength Builder', difficulty: 'Advanced', durationMinutes: 50, focus: 'Power' },
    ]);

    console.log('Database seeding complete');
    await disconnectDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
