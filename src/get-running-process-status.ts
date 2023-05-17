import { readFileSync, writeFileSync } from 'fs'
import createFolderAndFile from './utils/create-folder-and-file'

const delay = (millis: number) => new Promise(r => setTimeout(r, millis))

const getRunningProcessStatus = async (id: string, timeInterval = 5000, retryCount = 6) => {
  const result = {
    running: false,
    e: null
  }

  try {
    const fileResult = createFolderAndFile(id)
    let startingContent = readFileSync(fileResult.filePath, 'utf-8') || ''
    for (let i = 0; i < retryCount; i++) {
      await delay(timeInterval)
      let content = readFileSync(fileResult.filePath, 'utf-8') || ''
      if (startingContent !== content) {
        result.running = true
        break
      }
    }
  } catch (error) {
    result.e = error as any
    console.log(`error`, error)
  }

  return result
}

export default getRunningProcessStatus