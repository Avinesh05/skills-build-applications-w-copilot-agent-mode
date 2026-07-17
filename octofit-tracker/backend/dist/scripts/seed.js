"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
dotenv_1.default.config();
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await (0, models_1.connectDatabase)();
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        const users = await models_1.User.insertMany([
            { name: 'Asha Patel', email: 'asha@example.com', role: 'Captain', fitnessGoal: 'Build endurance' },
            { name: 'Mina Chen', email: 'mina@example.com', role: 'Member', fitnessGoal: 'Increase strength' },
            { name: 'Theo Brooks', email: 'theo@example.com', role: 'Member', fitnessGoal: 'Improve mobility' },
        ]);
        await models_1.Team.insertMany([
            { name: 'North Stars', focus: 'Endurance', members: 8 },
            { name: 'River Runners', focus: 'Speed', members: 6 },
        ]);
        await models_1.Activity.insertMany([
            { type: 'Run', durationMinutes: 32, calories: 420, userName: users[0].name },
            { type: 'Cycling', durationMinutes: 45, calories: 500, userName: users[1].name },
            { type: 'Yoga', durationMinutes: 28, calories: 180, userName: users[2].name },
        ]);
        await models_1.LeaderboardEntry.insertMany([
            { name: users[0].name, points: 980, streak: 12 },
            { name: users[1].name, points: 910, streak: 9 },
            { name: users[2].name, points: 875, streak: 7 },
        ]);
        await models_1.Workout.insertMany([
            { title: 'HIIT Circuit', difficulty: 'Intermediate', durationMinutes: 35, focus: 'Cardio' },
            { title: 'Recovery Flow', difficulty: 'Beginner', durationMinutes: 20, focus: 'Mobility' },
            { title: 'Strength Builder', difficulty: 'Advanced', durationMinutes: 50, focus: 'Power' },
        ]);
        console.log('Database seeding complete');
        await (0, models_1.disconnectDatabase)();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
