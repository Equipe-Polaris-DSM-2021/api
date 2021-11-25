import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const allUsers = await userRepository.find();

    return res.json(allUsers)
  }

  async store(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { name, email, password } = req.body

    const userExists = await userRepository.findOne({ where: { email } })

    if (!userExists) {
      const user = userRepository.create({
        name,
        email,
        password,
      });

      await userRepository.save(user)

      return res.json(user);
    } else {
      return res.sendStatus(409);
    }

  }

  async update(req: Request, res: Response) {
    const { name, email, password } = req.body

    const { id } = req.params
    
    try {
      const userRepository = getRepository(User);
  
      const user = await userRepository.update(id, { name: name, email: email, password: password })
      
      const userUpdated = await userRepository.findOne({ where: { id } })

      return res.json({ "message":"Dados atualizados com sucesso." })

    } catch (err) {
      console.log("err:" + err)
      return res.json({"err": `${err}`})
    }
  }
}

export default new UserController(); 