import { Request, Response } from 'express'

import { UsersRepository } from '@src/repositories'
import { GoogleAuthService } from '@src/services'
import { helpers } from '@src/utils'
import { serverError } from '@src/utils/serverErrors'

export const googleAuthRedirect = (req: Request, res: Response): void => {
  const state = {
    test: 1,
  }
  const service = new GoogleAuthService(req)
  const url = service.generateAuthUrl(state)
  res.redirect(url)
}

export const googleAuthCallback = async (req: Request, res: Response) => {
  const { code, state } = req.query
  const service = new GoogleAuthService(req)

  const parsedState = helpers.parseJSON(state as string)
  console.log(parsedState, '=======parsedState======')

  try {
    const userInfo = await service.fetchUserData(code as string)
    const user = await UsersRepository.handleGoogleLogin(userInfo)
    console.log(user, user.jwtToken(), '=======user======')
    res.redirect('/')
  } catch (error) {
    serverError({ res, exception: error as Error })
  }
}
