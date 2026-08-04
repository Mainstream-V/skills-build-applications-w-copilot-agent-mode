"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.get('/api/users', async (_req, res) => {
    try {
        const users = await user_1.User.find().lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch users', error });
    }
});
app.get('/api/workouts', async (_req, res) => {
    try {
        const workouts = await workout_1.Workout.find().lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch workouts', error });
    }
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
});
