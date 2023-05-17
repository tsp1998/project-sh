import createFolderAndFile from './utils/create-folder-and-file'

const registerProcess = (id: string) => {
  return createFolderAndFile(id, true)
}

export default registerProcess