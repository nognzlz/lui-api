import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class OptionalParseBoolPipe
  implements PipeTransform<string | undefined, boolean | undefined>
{
  transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): boolean | undefined {
    if (value === undefined) {
      // Skip transformation if value is undefined
      return undefined;
    }
    if (value === 'true' || value === '1') {
      return true;
    } else if (value === 'false' || value === '0') {
      return false;
    } else {
      throw new BadRequestException(
        `Validation failed. "${value}" is not a boolean.`,
      );
    }
  }
}
