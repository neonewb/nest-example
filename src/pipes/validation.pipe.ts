import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from 'src/exceptions/validation.exception'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)

    if (errors.length) {
      let errorMessage = errors.map((err) => ({
        property: err.property,
        errors: Object.values(err.constraints)
      }))

      throw new ValidationException(errorMessage)
    }

    return value
  }
}
