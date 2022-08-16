import { PrismaClient } from '@prisma/client';
import express, { Request } from 'express';
import bcrypt from 'bcryptjs';
import { jwtSign } from './utils/jwt';
import { authentication } from './middlewares/auth';
const prisma = new PrismaClient();

export const router = express.Router();
const apiRouter = express.Router();
const authRouter = express.Router();

// authrouter
authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = await jwtSign(user.id);

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/profile', authentication, async (req: Request, res, next) => {
  try {
    return res.json((req as any).user);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/signup', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(401).send('El correo ya registrado');
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: bcrypt.hashSync(password, 10),
      },
    });

    const token = await jwtSign(newUser.id);

    res.json({ user: newUser, token });
  } catch (error) {
    next(error);
  }
});

// apirouter
apiRouter.get('/', (req, res) => {
  res.json({
    message: 'welecome to the api',
  });
});

apiRouter.use('/auth', authRouter);

apiRouter.get('/*', (req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

// mainrouter
router.use('/api/v1', apiRouter);
