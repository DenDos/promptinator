import { Request, Response } from 'express'

import { PromptInterface, PromptModel, UserModel } from '@src/models'
import { PromptsPolicy } from '@src/policies'
import { DEVELOPER_EMAIL, FREE_USER_PROMPTS_LIMIT } from '@src/utils/constants'
import { render200, render404, renderUnprocessable, serverError } from '@src/utils/serverErrors'

import PromptsRepository from '../repositories/prompts.repository'

const findPrompt = ({ userId, promptId }: { userId: number; promptId: number }): Promise<PromptModel> => {
  return PromptsRepository.findBy({ user_id: userId, id: promptId })
}

export const show = async (req: Request, res: Response): Promise<void> => {
  const currentUser: UserModel = req.user as UserModel
  try {
    const prompt = await PromptsRepository.findBy({
      user_id: currentUser.id as number,
      id: req.params.id,
      name: req.query.name?.toString(),
    })
    if (prompt) {
      res.json(prompt)
    } else {
      render404({ res })
    }
  } catch (err) {
    serverError({ res, exception: err as Error })
  }
}

export const all = async (req: Request, res: Response): Promise<void> => {
  const currentUser: UserModel = req.user as UserModel
  try {
    const prompts = await PromptsRepository.all({ user_id: currentUser.id as number })
    res.json(prompts)
  } catch (err) {
    serverError({ res, exception: err as Error })
  }
}

export const create = async (req: Request, res: Response): Promise<void> => {
  const currentUser: UserModel = req.user as UserModel
  try {
    const canCreate = await new PromptsPolicy(currentUser).create()
    if (canCreate) {
      const params = {
        ...req.body,
        user_id: currentUser.id,
      } as PromptInterface
      const newPrompt = await PromptsRepository.create(params)
      res.status(200).json(newPrompt)
    } else {
      renderUnprocessable({
        res,
        message: `On a free account you can create only ${FREE_USER_PROMPTS_LIMIT} prompts. If you're excited about promptinator and would like to unlock more features contact us: ${DEVELOPER_EMAIL}`,
      })
    }
  } catch (err) {
    serverError({ res, exception: err as Error })
  }
}

export const update = async (req: Request, res: Response): Promise<void> => {
  const currentUser: UserModel = req.user as UserModel
  try {
    let prompt: PromptModel = await findPrompt({ userId: currentUser.id as number, promptId: Number(req.params.id) })
    if (await new PromptsPolicy(currentUser, prompt).create()) {
      const params = {
        ...req.body,
        user_id: currentUser.id,
      } as PromptInterface
      prompt = await PromptsRepository.update(req.params.id, params)
      res.status(200).json(prompt)
    } else {
      render404({ message: 'Prompt not found', res })
    }
  } catch (err) {
    serverError({ res, exception: err as Error })
  }
}

export const deletePrompt = async (req: Request, res: Response): Promise<void> => {
  const currentUser: UserModel = req.user as UserModel
  try {
    const prompt: PromptModel = await findPrompt({ userId: currentUser.id as number, promptId: Number(req.params.id) })
    if (await new PromptsPolicy(currentUser, prompt).delete()) {
      await PromptsRepository.delete(req.params.id)
      render200({ res, message: 'Prompt deleted' })
    } else {
      render404({ message: 'Prompt not found', res })
    }
  } catch (err) {
    serverError({ res, exception: err as Error })
  }
}
