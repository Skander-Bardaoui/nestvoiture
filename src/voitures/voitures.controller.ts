import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { VoituresService } from './voitures.service';
import { CreateVoitureDto } from './dto/create-voiture.dto';
import { UpdateVoitureDto } from './dto/update-voiture.dto';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe'; // Import our custom pipe
import { ObjectId } from 'mongodb'; // For type hinting in params

@Controller('voitures') // Base route for this controller
export class VoituresController {
  constructor(private readonly voituresService: VoituresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Return 201 Created on successful creation
  create(@Body() createVoitureDto: CreateVoitureDto) {
    return this.voituresService.create(createVoitureDto);
  }

  @Get()
  findAll() {
    return this.voituresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) { // Use ParseObjectIdPipe
    return this.voituresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() updateVoitureDto: UpdateVoitureDto) {
    return this.voituresService.update(id, updateVoitureDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Return 204 No Content on successful deletion
  remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.voituresService.remove(id);
  }
}