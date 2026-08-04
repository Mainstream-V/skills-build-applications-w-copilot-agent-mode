import express from 'express';
import './config/database';
import { User } from './models/user';
import { Workout } from './models/workout';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api/users', async (_req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users', error });
  }
});

app.get('/api/workouts', async (_req, res) => {
  try {
    const workouts = await Workout.find().lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch workouts', error });
  }
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
