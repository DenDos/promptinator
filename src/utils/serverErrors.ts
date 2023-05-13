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
    console.error(`==========ERROR: ${currentTime}==============`, exception?.message)
  }
  res.status(status).json({ error: message })
}

export const renderUnprocessable = ({ message = 'Unauthorized', res }: { res: Response; message?: string }): void => {
  renderError({ status: 422, message, res })
}

export const renderUnuathorized = ({ message = 'Unauthorized', res }: { res: Response; message?: string }): void => {
  renderError({ status: 401, message, res })
}

export const serverError = ({ res, exception }: { res: Response; exception: Error }): void => {
  renderError({ res, exception })
}

export const render200 = ({ res, message = 'Success' }: { res: Response; message: string }): void => {
  renderError({ status: 200, message, res })
}

export const render404 = ({ res, message = 'Not found' }: { message?: string; res: Response }): void => {
  renderError({ status: 404, message, res })
}
