import express, { Express } from 'express'
import request from 'supertest'

import { getAiPluginConfig, getOpenAiYaml } from './open_ai_controller'
import { replaceHostName } from './open_ai_controller'

describe('replaceHostName', () => {
  it('should replace PLUGIN_HOSTNAME with the provided host', () => {
    const text = 'PLUGIN_HOSTNAME/api/v1/data'
    const host = 'example.com'
    const expectedResult = 'https://example.com/api/v1/data'

    expect(replaceHostName(text, host)).toEqual(expectedResult)
  })

  it('should handle undefined host', () => {
    const text = 'PLUGIN_HOSTNAME/api/v1/data'
    const host = undefined
    const expectedResult = 'https://undefined/api/v1/data'

    expect(replaceHostName(text, host)).toEqual(expectedResult)
  })

  it('should not change the text if PLUGIN_HOSTNAME is not present', () => {
    const text = 'https://example.com/api/v1/data'
    const host = 'another-example.com'

    expect(replaceHostName(text, host)).toEqual(text)
  })
})

let app: Express

beforeEach(() => {
  app = express()
})

describe('GET /openapi.yaml', () => {
  it('should return the YAML file with the host replaced', async () => {
    app.get('/openapi.yaml', getOpenAiYaml)

    const res = await request(app).get('/openapi.yaml')
    expect(res.status).toBe(200)
    expect(res.type).toBe('text/yaml')
    expect(res.text).toContain('https://')
  })
})

describe('GET /.well-known/ai-plugin.json', () => {
  it('should return the JSON file with the host replaced', async () => {
    app.get('/.well-known/ai-plugin.json', getAiPluginConfig)

    const res = await request(app).get('/.well-known/ai-plugin.json')
    const config = JSON.parse(res.text)
    expect(res.status).toBe(200)
    expect(res.type).toBe('text/json')
    expect(config.schema_version).toBe('v1')
    expect(config.name_for_human).toBe('Promptinator')
    expect(config.name_for_model).toBe('Promptinator')
  })
})
