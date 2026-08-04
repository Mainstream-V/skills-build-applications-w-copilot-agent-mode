import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with sample data for the OctoFit app.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [sigmaTeam, deltaTeam] = await Team.create([
      {
        name: 'Sigma Striders',
        description: 'Fast-paced runners and walkers.',
        points: 320,
      },
      {
        name: 'Delta Dynamos',
        description: 'Strength and endurance specialists.',
        points: 280,
      },
    ]);

    const users = await User.create([
      {
        username: 'maya',
        email: 'maya@mergington.edu',
        age: 16,
        team: sigmaTeam._id,
        points: 220,
      },
      {
        username: 'liam',
        email: 'liam@mergington.edu',
        age: 15,
        team: sigmaTeam._id,
        points: 180,
      },
      {
        username: 'zoe',
        email: 'zoe@mergington.edu',
        age: 17,
        team: deltaTeam._id,
        points: 260,
      },
      {
        username: 'noah',
        email: 'noah@mergington.edu',
        age: 16,
        team: deltaTeam._id,
        points: 190,
      },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 35,
        distanceKm: 5.2,
        calories: 320,
        notes: 'Morning interval run',
        pointsEarned: 80,
      },
      {
        user: users[2]._id,
        type: 'Strength',
        durationMinutes: 45,
        calories: 410,
        notes: 'Upper body circuit',
        pointsEarned: 90,
      },
      {
        user: users[1]._id,
        type: 'Walk',
        durationMinutes: 30,
        distanceKm: 3.4,
        calories: 180,
        pointsEarned: 60,
      },
    ]);

    await LeaderboardEntry.create([
      { user: users[0]._id, username: users[0].username, totalPoints: users[0].points, rank: 1 },
      { user: users[2]._id, username: users[2].username, totalPoints: users[2].points, rank: 2 },
      { user: users[3]._id, username: users[3].username, totalPoints: users[3].points, rank: 3 },
      { user: users[1]._id, username: users[1].username, totalPoints: users[1].points, rank: 4 },
    ]);

    await Workout.create([
      {
        title: 'Sunrise Sprint Circuit',
        description: 'A fun cardio workout for building stamina.',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 25,
        equipment: ['Running shoes'],
      },
      {
        title: 'Core and Balance Flow',
        description: 'A low-impact session focused on posture and control.',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        equipment: ['Yoga mat'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
