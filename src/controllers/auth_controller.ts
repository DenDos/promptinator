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
  console.log(req.query, '=======req.query======')
  console.log(req.params, '=======req.params======')
  console.log(req.body, '=======req.body======')
  const { code } = req.body
  try {
    const user = await UsersRepository.findByToken(code as string)
    if (user) {
      res.status(200).json({ access_token: user.jwtToken(), token_type: 'Bearer' })
    } else {
      return renderUnuathorized({ res })
    }
  } catch (err) {
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
