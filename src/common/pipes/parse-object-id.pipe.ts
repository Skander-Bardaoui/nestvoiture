import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb'; // Import ObjectId

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
  transform(value: any): ObjectId {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException('Validation failed (Invalid ObjectId)');
    }
    return new ObjectId(value);
  }
}