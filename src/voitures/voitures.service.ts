import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MongoRepository } from 'typeorm'; // Use Repository for TypeORM abstraction
import { ObjectId } from 'mongodb'; // Import ObjectId for querying
import { CreateVoitureDto } from './dto/create-voiture.dto';
import { UpdateVoitureDto } from './dto/update-voiture.dto';
import { Voiture } from 'src/entities/voiture.entity';

@Injectable()
export class VoituresService {
  constructor(
    @InjectRepository(Voiture) // Inject the repository for Voiture entity
    private readonly voitureRepository: MongoRepository<Voiture>, // TypeORM automatically picks MongoRepository for MongoDB
  ) {}

  async create(createVoitureDto: CreateVoitureDto): Promise<Voiture> {
    const voiture = this.voitureRepository.create(createVoitureDto); // Creates a new Voiture instance
    return this.voitureRepository.save(voiture); // Saves it to the database
  }

  async findAll(): Promise<Voiture[]> {
    return this.voitureRepository.find(); // Retrieves all voitures
  }

  async findOne(id: ObjectId): Promise<Voiture> {
    const voiture = await this.voitureRepository.findOne({ where: { _id: id } }); // Find by ObjectId
    if (!voiture) {
      throw new NotFoundException(`Voiture with ID "${id.toHexString()}" not found`);
    }
    return voiture;
  }

  async update(id: ObjectId, updateVoitureDto: Partial<Voiture>): Promise<Voiture> {
    await this.voitureRepository.updateOne({ _id: id }, { $set: updateVoitureDto });
    // Retourner la voiture mise à jour
    return this.findOne(id);
  }
  
  

  async remove(id: ObjectId): Promise<{ deleted: boolean; message?: string }> {
    const deleteResult = await this.voitureRepository.deleteOne({ _id: id }); // Delete by ObjectId
    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException(`Voiture with ID "${id.toHexString()}" not found`);
    }
    return { deleted: true, message: `Voiture with ID "${id.toHexString()}" successfully deleted.` };
  }
}