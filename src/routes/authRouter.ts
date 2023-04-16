import express, { Router } from 'express'

import { authController } from '@src/controllers/index'

const authRouter: Router = express.Router()

authRouter.get('/google', authController.googleAuthRedirect)
authRouter.get('/google/callback', authController.googleAuthCallback)
authRouter.get('/token', authController.openAiCodeAuth)

export default authRouter
