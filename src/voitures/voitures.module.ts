import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoituresService } from './voitures.service';
import { VoituresController } from './voitures.controller';
import { Voiture } from 'src/entities/voiture.entity';
import { VoitureGateway } from './voiture.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Voiture])], // Register Voiture entity with TypeORM
  controllers: [VoituresController],
  providers: [VoituresService, VoitureGateway],
})
export class VoituresModule {}