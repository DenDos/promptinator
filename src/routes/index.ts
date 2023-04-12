import express, { Request, Response, Router } from 'express'

import {
  openAiController,
  promptsController, //authController
} from '@src/controllers/index'

const router: Router = express.Router()

router.get('/.well-known/ai-plugin.json', openAiController.getAiPluginConfig)
router.get('/openapi.yaml', openAiController.getOpenAiYaml)

// router.get('/auth/custom', authController.customAuth)
// router.get('/logout', authController.logout)
// router.get('/profile', authController.profile)

router.get('/prompts', promptsController.all)
router.get('/prompts/:id', promptsController.show)
router.put('/prompts/:id', promptsController.update)
router.delete('/prompts/:id', promptsController.deletePrompt)
router.post('/prompts', promptsController.create)

// Define routes
router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the custom OAuth example!')
})

export default router
