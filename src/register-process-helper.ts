import getRunningProcessStatus from './get-running-process-status'

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
      }
    })
    .catch(error => console.log(`error`, error))
}

export default registerProcessHelper