import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoituresModule } from './voitures/voitures.module';
import { Voiture } from './entities/voiture.entity'; // Correct path

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/voituresdb',
      database: 'voituresdb', // optional, but good to be explicit
      synchronize: true, // WARNING: only in dev
      entities: [Voiture],
    }),
    VoituresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
