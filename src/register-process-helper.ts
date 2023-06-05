import getRunningProcessStatus from './get-running-process-status'
import { homedir } from 'os'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

const homeDir = homedir()

const registerProcessHelper = (processId: string, cb: Function, $do: Partial<{
  getRunningProcessStatusParams: any[],
  registerProcessParams: any[]
}> = {}) => {
  console.log('checking running process for id', processId)
  const { getRunningProcessStatusParams = [], registerProcessParams = [] } = $do
  getRunningProcessStatus(processId, ...getRunningProcessStatusParams)
    .then(async result => {
      if (result.running) {
        console.log('process with id already running', processId)
      } else {
        console.log('process with id not running', processId)
        console.log('registering process')
        const { default: registerProcess } = await import('./register-process')
        registerProcess(processId, ...registerProcessParams)
        console.log('process registerd')
        console.log('calling callback')
        cb()

        const timeInterval = registerProcessParams[0]
        const interval = setInterval(() => {
          const filePath = join(homeDir, '.project-sh', processId)
          let content = readFileSync(filePath, 'utf-8') || ''
          content = parseInt(content) || 0
          if (content < 0) {
            writeFileSync(filePath, '0', 'utf-8')
            clearInterval(interval)
            // @ts-ignore
            process.exit()
          }
        }, timeInterval)
      }
    })
    .catch(error => console.log(`error`, error))
}

export default registerProcessHelper