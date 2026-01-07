import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb'; // Important: import ObjectId from 'mongodb'

@Entity()
export class Voiture {
  @ObjectIdColumn()
  _id: ObjectId; // MongoDB's primary key

  @Column()
  marque: string;

  @Column()
  modele: string;

  @Column({ type: 'int' }) // Specify type for clarity, though TypeORM often infers
  annee: number;

  @Column({ type: 'int' })
  kilometrage: number;

  @Column({ type: 'float' })
  prix: number;

  @Column({ default: false }) // Default value for 'parquee'
  parquee: boolean;
}