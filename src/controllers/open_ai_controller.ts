import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

const replaceHostName = (text: string, host: string | undefined): string => {
  return text.replace(new RegExp('PLUGIN_HOSTNAME', 'g'), `https://${host}`)
}

export const getOpenAiYaml = (req: Request, res: Response): void => {
  const filePath = path.join(process.cwd(), 'openapi.yaml')
  fs.readFile(filePath, 'utf8', (err, buf) => {
    let text = buf.toString()
    if (err) {
      res.status(404).send('Not found')
    } else {
      text = replaceHostName(text, req.headers.host)
      res.status(200).type('text/yaml').send(text)
    }
  })
}

export const getAiPluginConfig = (req: Request, res: Response): void => {
  console.log('Trying to load plugin.json')
  const filePath = path.join(process.cwd(), '.well-known/ai-plugin.json')
  fs.readFile(filePath, (err, buf) => {
    let text = buf.toString()
    if (err) {
      res.status(404).send('Not found')
    } else {
      text = replaceHostName(text, req.headers.host)
      res.status(200).type('text/json').send(text)
    }
  })
}
