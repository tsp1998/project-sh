import { readFileSync, writeFileSync } from 'fs'
import createFolderAndFile from './utils/create-folder-and-file'

const registerProcess = (id: string, timeInterval = 5000) => {
  try {
    const result = createFolderAndFile(id)
    setInterval(() => {
      let content = readFileSync(result.filePath, 'utf-8') || ''
      content = parseInt(content) || 0
      content++
      writeFileSync(result.filePath, content + '', 'utf-8')
    }, timeInterval)
    return true
  } catch (error) {
    console.log(`error`, error)
    return false
  }
}

export default registerProcess