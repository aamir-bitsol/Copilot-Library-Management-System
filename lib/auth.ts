import { NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function verifyAuth(req: NextApiRequest) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return null;
    }

    // Verify token
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: verified.payload.userId as number },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function createAuthToken(user: { id: number; email: string; role: string }): Promise<string> {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  return token;
}