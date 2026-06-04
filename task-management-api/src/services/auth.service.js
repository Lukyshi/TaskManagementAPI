import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/jwt.js';

// register user
const register = async (data) => {
  const { email, password, name} = data;

  //check if user exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // hash pass
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  });

  // return user withour pass
  return {
    id: user.id,
    email: user.email,
    name: user.name
  };
};

const login = async (data) => {
  const { email, password} = data;

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    const error = new Error('Invalid credentials');
    error.status = 401
    throw error;
  }

  // compare pass
  const isValid = await bcrypt.compare(password, user.password);

  if(!isValid) {
    const error = new Error('Invalid credentials');
    error.status = 401
    throw error;
  }

  // generate jwt Token
  const token = generateToken(user.id, user.email);

// return token and user info
return {
  token,
  user: {
    id: user.id,
    email: user.email,
    name: user.name
  }
};
};

 const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId)
    },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
  });

  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export default {
  register,
  login,
  getProfile
}
