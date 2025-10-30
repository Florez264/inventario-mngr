import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'default_secret';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Invalid token');
  }
};
