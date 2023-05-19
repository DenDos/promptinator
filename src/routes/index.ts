import express, { Request, Response, Router } from 'express'
import path from 'path'

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
  res.render('index', {
    title: 'View Engine Demo',
  })
  res.sendFile(path.join(process.cwd(), 'src/landing/index.html'))
})

router.get('/index.css', (req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), 'src/landing/index.css'))
})

export default router
