import express, { Request, Response, Router } from 'express'

import { openAiController } from '@src/controllers/index'
import { authenticateJWT } from '@src/middlewares'
import apiRouter from '@src/routes/apiRouter'
import authRouter from '@src/routes/authRouter'

const router: Router = express.Router()

router.get('/.well-known/ai-plugin.json', openAiController.getAiPluginConfig)
router.get('/openapi.yaml', openAiController.getOpenAiYaml)

router.use('/api', authenticateJWT, apiRouter)
router.use('/auth', authRouter)

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the custom OAuth example')
})

export default router
