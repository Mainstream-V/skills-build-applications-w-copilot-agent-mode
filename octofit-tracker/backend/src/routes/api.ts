import express from 'express';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users', error });
  }
});

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create user', error });
  }
});

router.get('/teams', async (_req, res) => {
  try {
    const teams = await Team.find().lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch teams', error });
  }
});

router.post('/teams', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create team', error });
  }
});

router.get('/activities', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user').lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch activities', error });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create activity', error });
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ totalPoints: -1 }).lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch leaderboard', error });
  }
});

router.get('/workouts', async (_req, res) => {
  try {
    const workouts = await Workout.find().lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch workouts', error });
  }
});

router.post('/workouts', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create workout', error });
  }
});

export default router;
