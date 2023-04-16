import { Request, Response } from 'express'

import { UsersRepository } from '@src/repositories'
import { GoogleAuthService } from '@src/services'
import { helpers } from '@src/utils'
import { renderUnuathorized, serverError } from '@src/utils/serverErrors'

export const googleAuthRedirect = (req: Request, res: Response): void => {
  const service = new GoogleAuthService(req)
  const url = service.generateAuthUrl(req.query)
  res.redirect(url)
}

export const openAiCodeAuth = async (req: Request, res: Response) => {
  const { code } = req.body
  try {
    const user = await UsersRepository.findByToken(code as string)
    console.log(user, '=======user======')
    if (user) {
      console.log('=======here======')
      res.status(200).json({ access_token: user.jwtToken(), token_type: 'Bearer' })
    } else {
      console.log('=======here1======')
      return renderUnuathorized({ res })
    }
  } catch (err) {
    console.log('=======here2======', err)
    return renderUnuathorized({ res })
  }
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
