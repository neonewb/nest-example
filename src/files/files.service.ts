import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import { nanoid } from 'nanoid'

@Injectable()
export class FilesService {
  async createFile(file: { buffer: string | Uint8Array }): Promise<string> {
    const fileName = nanoid() + '.jpg'
    const filePath = path.resolve(__dirname, '..', 'static')

    const internalError = (err) => {
      if (err) {
        console.log('err', err)
        throw new HttpException(
          'Error while writing file',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }
    }

    fs.mkdir(filePath, { recursive: true }, internalError)

    const filePathName = path.join(filePath, fileName)

    fs.writeFile(filePathName, file.buffer, internalError)

    return fileName
  }
}
