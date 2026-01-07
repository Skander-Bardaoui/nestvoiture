import { IsString, IsNumber, IsBoolean, IsNotEmpty, Min } from 'class-validator';

export class CreateVoitureDto {
  @IsString()
  @IsNotEmpty()
  marque: string;

  @IsString()
  @IsNotEmpty()
  modele: string;

  @IsNumber()
  @Min(1900) // Assuming cars are not older than 1900
  annee: number;

  @IsNumber()
  @Min(0) // Kilometrage cannot be negative
  kilometrage: number;

  @IsNumber()
  @Min(0) // Price cannot be negative
  prix: number;

  @IsBoolean()
  parquee: boolean;
}