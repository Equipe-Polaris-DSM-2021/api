import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iad: number;
  exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    // obrigatorio utilizar .env para guardar a chave secreta do token: 'secret' como exemplo   
    const data = jwt.verify(token, 'secret');

    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}