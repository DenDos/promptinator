import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { renderUnuathorized } from '@src/utils/serverErrors'

import UsersRepository from '../repositories/users.repository'

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) return renderUnuathorized({ res })

  jwt.verify(token, process.env.JWT_SECRET as string, async (err, payload) => {
    if (err) return renderUnuathorized({ res })
    if (typeof payload !== 'string' && payload) {
      const id = payload['id'] as number
      req.user = await UsersRepository.find(id)
      next()
    } else {
      return renderUnuathorized({ res })
    }
  })
}
