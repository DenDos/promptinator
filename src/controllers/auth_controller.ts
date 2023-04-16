import { Request, Response } from 'express'

import { UsersRepository } from '@src/repositories'
import { GoogleAuthService } from '@src/services'
import { helpers } from '@src/utils'
import { serverError } from '@src/utils/serverErrors'

export const googleAuthRedirect = (req: Request, res: Response): void => {
  const service = new GoogleAuthService(req)
  const url = service.generateAuthUrl(req.query)
  res.redirect(url)
}

export const googleAuthCallback = async (req: Request, res: Response) => {
  const { code, state } = req.query
  const service = new GoogleAuthService(req)

  const parsedState = helpers.parseJSON(state as string)
  const redirectUrl = parsedState?.redirect_uri as string

  try {
    const userInfo = await service.fetchUserData(code as string)
    const user = await UsersRepository.handleGoogleLogin(userInfo)
    res.redirect(`${redirectUrl}?code=${user.jwtToken()}`)
  } catch (error) {
    serverError({ res, exception: error as Error })
  }
}
