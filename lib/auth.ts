import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Use the exact same secret from .env.local
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secure-jwt-secret-key-change-this-in-production';

export interface TokenPayload {
  userId: string;
  email: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: TokenPayload): string => {
  console.log('Generating token with payload:', payload);
  console.log('JWT_SECRET available:', !!JWT_SECRET);
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    console.log('Token generated, length:', token.length);
    return token;
  } catch (error) {
    console.error('JWT generation error:', error);
    throw error;
  }
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    console.log('Verifying token with secret length:', JWT_SECRET.length);
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    console.log('Token verified successfully:', payload);
    return payload;
  } catch (error) {
    console.log('Token verification failed:', error);
    return null;
  }
};