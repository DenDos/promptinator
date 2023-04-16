import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { renderUnuathorized } from '@src/utils/serverErrors'

import UsersRepository from '../repositories/users.repository'

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query, '=======req.query======')
  console.log(req.params, '=======req.params======')
  console.log(req.body, '=======req.body======')
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) return renderUnuathorized({ res })
  try {
    const user = await UsersRepository.findByToken(token)
    if (user) {
      req.user = user
    } else {
      return renderUnuathorized({ res })
    }
  } catch (err) {
    return renderUnuathorized({ res })
  }
}
