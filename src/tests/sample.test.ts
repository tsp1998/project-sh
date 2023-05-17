import registerProcessHelper from '../register-process-helper'

const main = async () => {
  setInterval(() => {
    console.log('hey there this is test')
  }, 2000)
}

registerProcessHelper('sample_test', main, {
  getRunningProcessStatusParams: [2000, 5],
  registerProcessParams: [2000]
})
