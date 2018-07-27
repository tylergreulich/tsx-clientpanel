import { Request, Response, Router } from 'express';
import * as passport from 'passport';
import Client from '../../models/Client';

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
  async (req: Request, res: Response): Promise<object> => {
    const { errors, isValid } = await validateClient(req.body);

    if (!isValid) return res.status(400).json(errors);

    const { firstName, lastName, email, phone, balance } = req.body;

    let client = await Client.findOne({ email });
    if (client) {
      errors.email = 'Client already exists';
      return res.status(400).json(errors);
    } else {
      const newClient = new Client({
        firstName,
        lastName,
        email,
        phone,
        balance
      });

      try {
        newClient.save();
      } catch (error) {
        throw error;
      }

      res.status(200).json(newClient);
    }
  }
);

router.put(
  '/:id',
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

    res.send(400).json(updatedClient);
  }
);

router.delete(
  '/:id',
  async (req: Request, res: Response): Promise<object> => {
    const client = await Client.findByIdAndRemove(req.params.id);

    if (!client)
      return res.status(400).json({ client: 'No client found with that ID' });

    res.send(200).json(client);
  }
);

export { router };
