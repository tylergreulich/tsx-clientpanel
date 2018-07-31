import { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import Client from '../../models/Client';
import User from '../../models/User';

import { validateClient } from '../../validation/client';

const router = Router();

router.get(
  '/',
  async (req: Request, res: Response): Promise<object> => {
    const client = await Client.find();
    return res.status(200).json(client);
  }
);

router.get(
  '/:id',
  async (req: Request, res: Response): Promise<object> => {
    const client = await Client.findById(req.params.id);
    if (!client)
      return res.status(400).json({ client: 'No client found with that ID' });
    await res.json(client);
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response): Promise<object> => {
    const { errors, isValid } = await validateClient(req.body);

    if (!isValid) return res.status(400).json(errors);

    const { firstName, lastName, email, phone, balance } = req.body;

    let user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(400).json({ err: 'No user found with that ID' });
    } else {
      const client = new Client({
        firstName,
        lastName,
        email,
        phone,
        balance
      });

      try {
        client.save();
        user.clients.unshift({ client });
        user.save();
      } catch (error) {
        throw error;
      }

      res.status(200).json(user);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response): Promise<object> => {
    const { errors, isValid } = await validateClient(req.body);

    if (!isValid) return res.status(400).json(errors);

    let client = await Client.findById(req.params.id);

    if (!client)
      return res.status(400).json({ client: 'No client found with that ID' });

    const { firstName, lastName, email, phone, balance } = req.body;

    let updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName,
          lastName,
          email,
          phone,
          balance
        }
      },
      { new: true }
    );

    await res.status(400).json(updatedClient);
  }
);

export { router };
