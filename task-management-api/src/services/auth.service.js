const prisma = require('../prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register user
exports.register = async (data) => {
  const { email, password, name} = data;

  //vaidate
  if (!email || !password || !name) {
    throw new Error('Email, password and name are required');
  }

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

exports.login = async (data) => {
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
  const token = jwt.sign(
    {
    userId: user.id,
    email: user.email
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '1d'
  }
);

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

 exports.getProfile = async (userId) => {
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

