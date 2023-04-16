import { Request, Response } from 'express'

import { PromptInterface, UserModel } from '@src/models'
import { render200, render404, serverError } from '@src/utils/serverErrors'

import PromptsRepository from '../repositories/prompts.repository'

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
    const params = {
      ...req.body,
      user_id: currentUser.id,
    } as PromptInterface
    const newPrompt = await PromptsRepository.create(params)
    res.status(200).json(newPrompt)
  } catch (err) {
    serverError({ res, exception: err as Error })
  }
}

export const update = async (req: Request, res: Response): Promise<void> => {
  const currentUser: UserModel = req.user as UserModel
  try {
    const params = {
      ...req.body,
      user_id: currentUser.id,
    } as PromptInterface
    const prompt = await PromptsRepository.update(req.params.id, params)
    res.status(200).json(prompt)
  } catch (err) {
    serverError({ res, exception: err as Error })
  }
}

export const deletePrompt = async (req: Request, res: Response): Promise<void> => {
  try {
    await PromptsRepository.delete(req.params.id)
    render200({ res, message: 'Prompt deleted' })
  } catch (err) {
    serverError({ res, exception: err as Error })
  }
}
