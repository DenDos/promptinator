import express, { Request, Response, Router } from 'express'

import { openAiController } from '@src/controllers/index'
import apiRouter from '@src/routes/apiRouter'

const router: Router = express.Router()

router.get('/.well-known/ai-plugin.json', openAiController.getAiPluginConfig)
router.get('/openapi.yaml', openAiController.getOpenAiYaml)

router.use('/api', apiRouter)

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the custom OAuth example2')
})

export default router
