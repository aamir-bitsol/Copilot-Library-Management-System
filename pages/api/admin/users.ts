import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verify authentication and get user
    const user = await verifyAuth(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if user is admin
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    switch (req.method) {
      case 'GET':
        const users = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        });
        return res.status(200).json(users);

      case 'PUT':
        const { userId, role } = req.body;

        if (!userId || !role) {
          return res.status(400).json({ message: 'User ID and role are required' });
        }

        // Prevent self-role change
        if (userId === user.id) {
          return res.status(400).json({ message: 'Cannot change your own role' });
        }

        // Update user role
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { role },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        });

        return res.status(200).json(updatedUser);

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Admin Users API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 