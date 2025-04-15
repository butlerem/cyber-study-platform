import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';
import { Challenge } from '../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const challenges = await Challenge.find({});
        res.status(200).json(challenges);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch challenges' });
      }
      break;

    case 'POST':
      try {
        const challenge = await Challenge.create(req.body);
        res.status(201).json(challenge);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create challenge' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 