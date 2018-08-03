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
    return res.json(client);
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response): Promise<object> => {
    const { errors, isValid } = await validateClient(req.body);

    if (!isValid) return res.status(400).json(errors);

    const { firstName, lastName, email, balance } = req.body;

    let user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(400).json({ err: 'No user found with that ID' });
    } else {
      const client = new Client({
        firstName,
        lastName,
        email,
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

    const { firstName, lastName, email, balance } = req.body;

    let updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName,
          lastName,
          email,
          balance
        }
      },
      { new: true }
    );

    return res.status(200).json(updatedClient);
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response): void => {
    User.findOne({ user: req.user.id }).then(user => {
      Client.findById(req.params.id)
        .then(client => {
          client.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ post: 'No post found' }));
    });

    User.findOne({ username: req.user.username }).then(user => {
      console.log(user);
      const removeIndex = user.clients
        .map(item => item.id.toString())
        .indexOf(req.user.id);
      user.clients.splice(removeIndex, 1);
      user.save();
    });
  }
);

export { router };
