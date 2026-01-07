import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  import { VoituresService } from './voitures.service';
  import { ObjectId } from 'mongodb';
  
  @WebSocketGateway({ cors: true })
  export class VoitureGateway {
    @WebSocketServer()
    server: Server;
  
    constructor(private readonly voituresService: VoituresService) {}
    @SubscribeMessage('garer-voiture')
    async handleGarerVoiture(@MessageBody() data: { id: string }) {
      try {
        const voitureId = new ObjectId(data.id);
        // Mettre parquee à true
        const updatedVoiture = await this.voituresService.update(voitureId, { parquee: true });
        // Émettre à tous les clients
        this.server.emit('voiture-garee', updatedVoiture);   
        return { status: 'ok', data: updatedVoiture };
      } catch (error) {
        return { status: 'error', message: error.message };
      }
    }
    
    

  }
  
  
  