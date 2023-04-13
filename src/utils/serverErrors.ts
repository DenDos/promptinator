import { Response } from 'express'

interface renderErrorInterface {
  status?: number
  exception?: Error
  message?: string
  res: Response
}

export const renderError = ({
  status = 500,
  message = 'Sorry something went wrong',
  res,
  exception,
}: renderErrorInterface): void => {
  if (status === 500 && exception) {
    const currentTime = new Date().toISOString().replace('T', ' ').split('.')[0]
    console.error(`==========${currentTime}==============`, exception?.message)
  }
  res.status(status).json({ error: message })
}

export const serverError = ({ res, exception }: { res: Response; exception: Error }): void => {
  renderError({ res, exception })
}

export const render200 = ({ res, message = 'Success' }: { res: Response; message: string }): void => {
  renderError({ status: 200, message, res })
}

export const render404 = ({ res }: { res: Response }): void => {
  renderError({ status: 404, message: 'Not found', res })
}
