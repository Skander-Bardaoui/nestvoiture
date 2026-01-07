import { PartialType } from '@nestjs/mapped-types';
import { CreateVoitureDto } from './create-voiture.dto';

export class UpdateVoitureDto extends PartialType(CreateVoitureDto) {} 