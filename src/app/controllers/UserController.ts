import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const allUsers = await userRepository.find();

    return res.json(allUsers)
  }

  async store(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { username, email, password, address, neighborhood, city, uf, phone_number, latitude, longitude } = req.body

    const userExists = await userRepository.findOne({ where: { email } })

    if (!userExists) {
      const user = userRepository.create({
        username,
        email,
        password,
        address,
        neighborhood,
        city,
        uf,
        phone_number,
        latitude,
        longitude
      });

      await userRepository.save(user)

      return res.json(user);
    } else {
      return res.sendStatus(409);
    }

  }
}

export default new UserController();