"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("./models");
const router = (0, express_1.Router)();
router.get('/users/', async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(users);
});
router.get('/teams/', async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json(teams);
});
router.get('/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find({}).lean();
    res.json(activities);
});
router.get('/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).sort({ points: -1 }).lean();
    res.json(leaderboard);
});
router.get('/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(workouts);
});
exports.default = router;
