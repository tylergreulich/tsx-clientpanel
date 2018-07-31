import { Request, Response, Router } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import User from '../../models/User';
import Client from '../../models/Client';

import { validateRegister } from '../../validation/register';
import { validateLogin } from '../../validation/login';

import { validateClient } from '../../validation/client';

const router = Router();

router.get(
  '/test',
  async (req: Request, res: Response): Promise<object> => {
    return await res.status(200).json({ message: 'Auth Works' });
  }
);

router.get(
  '/',
  async (req: Request, res: Response): Promise<object> => {
    const users = await User.find();
    return res.status(200).json(users);
  }
);

router.get(
  '/:id',
  async (req: Request, res: Response): Promise<object> => {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).json({ user: 'No user found with that ID' });
    return res.status(200).json(user);
  }
);

router.post(
  '/register',
  async (req: Request, res: Response): Promise<object> => {
    const { errors, isValid } = await validateRegister(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
      console.log(errors);
    }

    const { email, username, password, confirmPassword } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username,
        email,
        password,
        confirmPassword
      });

      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        newUser.save();
      } catch (error) {
        throw error;
      }

      res.status(200).json(newUser);
    }
  }
);

router.post(
  '/login',
  async (req: Request, res: Response): Promise<object> => {
    const { errors, isValid } = await validateLogin(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
      console.log(errors);
    }

    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      errors.email = 'Email not found';
      return res.status(400).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { id, username, email } = user;
      const payload = { id, username, email };
      user.generateAuthToken(payload, res);
    } else {
      errors.password = 'Password is incorrect';
      return res.status(400).json(errors);
    }
  }
);

// Add Client
router.put(
  '/:id/clients',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClient(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { firstName, lastName, email, phone, balance } = req.body;

    User.findById(req.params.id)
      .then(user => {
        Client.findOne({ email }).then(client => {
          if (client) {
            return res.status(400).json({ client: 'Client already exists' });
          } else {
            const client = new Client({
              firstName,
              lastName,
              email,
              phone,
              balance
            });

            client.save();
            user.clients.unshift({ client });
            user.save().then(user => res.json(user));
          }
        });
      })
      .catch(err => res.status(404).json({ user: 'No user found' }));
  }
);

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    const { id, name, email } = req.user;
    res.status(400).json({ id, name, email });
  }
);

export { router };
