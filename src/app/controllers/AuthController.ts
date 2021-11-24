import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

import { User } from '../models/User';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const { email, password} = req.body

    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.sendStatus(401);
    }
    
    // const token = jwt.sign({id: user.id}, `${process.env.AUTH_SECRET_KEY}`, {expiresIn: '1d'});
    // obrigatorio utilizar .env para guardar a chave secreta do token: 'secret' como exemplo   
    const token = jwt.sign({id: user.id}, 'secret', {expiresIn: '1d'});
    
   // @ts-expect-error proteção para o usuário, sem expor a senha para o client-side
    delete user.password;
    
    return res.json({
      user,
      token
    })
    
  }
}

export default new AuthController(); 