import express, { Router } from 'express'

import { promptsController } from '@src/controllers/index'

const apiRouter: Router = express.Router()

apiRouter.get('/prompts', promptsController.all)
apiRouter.get('/prompts/:id', promptsController.show)
apiRouter.put('/prompts/:id', promptsController.update)
apiRouter.delete('/prompts/:id', promptsController.deletePrompt)
apiRouter.post('/prompts', promptsController.create)

export default apiRouter
