"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
const router = express_1.default.Router();
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
router.get('/users', async (_req, res) => {
    try {
        const users = await user_1.User.find().lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch users', error });
    }
});
router.post('/users', async (req, res) => {
    try {
        const user = await user_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create user', error });
    }
});
router.get('/teams', async (_req, res) => {
    try {
        const teams = await team_1.Team.find().lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch teams', error });
    }
});
router.post('/teams', async (req, res) => {
    try {
        const team = await team_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create team', error });
    }
});
router.get('/activities', async (_req, res) => {
    try {
        const activities = await activity_1.Activity.find().populate('user').lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch activities', error });
    }
});
router.post('/activities', async (req, res) => {
    try {
        const activity = await activity_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create activity', error });
    }
});
router.get('/leaderboard', async (_req, res) => {
    try {
        const leaderboard = await leaderboard_1.LeaderboardEntry.find().sort({ totalPoints: -1 }).lean();
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch leaderboard', error });
    }
});
router.get('/workouts', async (_req, res) => {
    try {
        const workouts = await workout_1.Workout.find().lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch workouts', error });
    }
});
router.post('/workouts', async (req, res) => {
    try {
        const workout = await workout_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create workout', error });
    }
});
exports.default = router;
