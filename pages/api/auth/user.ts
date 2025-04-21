import { NextApiRequest, NextApiResponse } from 'next';
import { verifyAuth } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = await verifyAuth(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Remove sensitive data before sending
    const { password, ...userData } = user;
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Session verification error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}