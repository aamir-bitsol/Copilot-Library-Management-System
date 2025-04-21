import { NextApiRequest, NextApiResponse } from 'next';
import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';
import { User } from '../../../models/User';
import { db } from '../../../lib/db';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = req.body;

    try {
        await db.authenticate();

        const user = await User.findOne({ where: { username } });

        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}