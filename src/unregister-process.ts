import createFolderAndFile from './utils/create-folder-and-file'

const unregisterProcess = (id: string) => {
  return createFolderAndFile(id, true)
}

export default unregisterProcess