import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
const homeDir = homedir()

const createFolderAndFile = (id: string, unregister = false) => {
  let result = {
    e: null,
    processFolderPath: join(homeDir, '.project-sh'),
    filePath: ''
  }

  try {
    if (!existsSync(result.processFolderPath)) {
      mkdirSync(result.processFolderPath)
    }

    result.filePath = join(result.processFolderPath, id)
    if (!existsSync(result.filePath)) {
      if (unregister) {
        unlinkSync(result.filePath, '0', 'utf-8')
      } else {
        writeFileSync(result.filePath, '0', 'utf-8')
      }
    }
  } catch (error) {
    result.e = error as any
  }

  return result
}

export default createFolderAndFile